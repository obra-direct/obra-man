"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

type Service = {
  id: string;
  slug: string;
  category: string;
  nameEs: string;
  nameCa: string;
  nameEn: string;
  descEs: string | null;
  descCa: string | null;
  descEn: string | null;
  visible: boolean;
  sortOrder: number;
};

export default function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  async function toggleVisible(id: string, visible: boolean) {
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible }),
    });
    if (res.ok) {
      setServices((prev) => prev.map((s) => (s.id === id ? { ...s, visible } : s)));
    }
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const res = await fetch("/api/admin/services", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editData }),
    });
    if (res.ok) {
      const updated = await res.json();
      setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setEditing(null);
    }
    setSaving(false);
  }

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeCategory === "all" ? "bg-navy text-white border-navy" : "border-gray-300 text-gray-600"}`}
        >
          Todos ({services.length})
        </button>
        {SERVICE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeCategory === cat.id ? "bg-navy text-white border-navy" : "border-gray-300 text-gray-600"}`}
          >
            {cat.icon} {cat.nameEs}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Visible</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Categoría</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Nombre (ES)</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Descripción (ES)</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((svc) => (
              <tr key={svc.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleVisible(svc.id, !svc.visible)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${svc.visible ? "bg-gold" : "bg-gray-300"}`}
                    role="switch"
                    aria-checked={svc.visible}
                    aria-label="Toggle visibility"
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${svc.visible ? "translate-x-5" : "translate-x-1"}`} />
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {SERVICE_CATEGORIES.find((c) => c.id === svc.category)?.icon} {svc.category}
                </td>
                <td className="px-6 py-4">
                  {editing === svc.id ? (
                    <input
                      value={editData.nameEs ?? svc.nameEs}
                      onChange={(e) => setEditData((d) => ({ ...d, nameEs: e.target.value }))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    <span className={`font-medium ${svc.visible ? "text-gray-900" : "text-gray-400 line-through"}`}>
                      {svc.nameEs}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500 max-w-xs">
                  {editing === svc.id ? (
                    <textarea
                      value={editData.descEs ?? svc.descEs ?? ""}
                      onChange={(e) => setEditData((d) => ({ ...d, descEs: e.target.value }))}
                      rows={2}
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full resize-none"
                    />
                  ) : (
                    <span className="text-xs truncate block max-w-xs">{svc.descEs}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editing === svc.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(svc.id)}
                        disabled={saving}
                        className="text-xs bg-gold text-navy font-semibold px-3 py-1.5 rounded hover:bg-gold-dark transition-colors disabled:opacity-60"
                      >
                        {saving ? "..." : "Guardar"}
                      </button>
                      <button
                        onClick={() => { setEditing(null); setEditData({}); }}
                        className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditing(svc.id); setEditData({}); }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
