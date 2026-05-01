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

type SeoPageData = {
  id?: string;
  slug: string;
  locale: string;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
};

const LOCALES = [
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "ca", flag: "🏴", label: "CA" },
  { code: "en", flag: "🇬🇧", label: "EN" },
];

function ServiceSeoPanel({
  seoSlug,
  initialPages,
  serviceName,
}: {
  seoSlug: string;
  initialPages: SeoPageData[];
  serviceName: string;
}) {
  const buildInitial = (locale: string): Partial<SeoPageData> => {
    const found = initialPages.find((p) => p.slug === seoSlug && p.locale === locale);
    return found ?? { slug: seoSlug, locale };
  };

  const [activeLocale, setActiveLocale] = useState("es");
  const [fields, setFields] = useState<Record<string, Partial<SeoPageData>>>({
    es: buildInitial("es"),
    ca: buildInitial("ca"),
    en: buildInitial("en"),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function setField(locale: string, key: keyof SeoPageData, value: string) {
    setFields((prev) => ({ ...prev, [locale]: { ...prev[locale], [key]: value } }));
    setSaved(false);
  }

  async function save(locale: string) {
    setSaving(true);
    setSaved(false);
    const data = { ...fields[locale], slug: seoSlug, locale };
    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page", data }),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json();
      setFields((prev) => ({ ...prev, [locale]: updated }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-white";

  const d = fields[activeLocale] ?? {};

  return (
    <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide flex items-center gap-1.5">
          <span>🔍</span> SEO — {serviceName}
        </p>
        <div className="flex gap-1 p-0.5 bg-white border border-gray-200 rounded-lg">
          {LOCALES.map((loc) => (
            <button
              key={loc.code}
              onClick={() => { setActiveLocale(loc.code); setSaved(false); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                activeLocale === loc.code
                  ? "bg-navy text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {loc.flag} {loc.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Page Title
          </label>
          <input
            type="text"
            value={d.title ?? ""}
            onChange={(e) => setField(activeLocale, "title", e.target.value)}
            placeholder="Título de la página | ObraDirecta"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-0.5">{(d.title ?? "").length}/60 caracteres recomendados</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            H1 Heading
          </label>
          <input
            type="text"
            value={d.h1 ?? ""}
            onChange={(e) => setField(activeLocale, "h1", e.target.value)}
            placeholder="Encabezado principal"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          Meta Description
        </label>
        <textarea
          value={d.metaDescription ?? ""}
          onChange={(e) => setField(activeLocale, "metaDescription", e.target.value)}
          placeholder="Descripción para los buscadores..."
          rows={2}
          className={`${inputClass} resize-none`}
        />
        <p className="text-xs text-gray-400 mt-0.5">{(d.metaDescription ?? "").length}/160 caracteres recomendados</p>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={() => save(activeLocale)}
          disabled={saving}
          className="text-xs bg-gold hover:bg-gold-dark text-navy font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar SEO"}
        </button>
        {saved && (
          <span className="text-green-600 text-xs font-medium">✓ Guardado correctamente</span>
        )}
      </div>
    </div>
  );
}

export default function ServicesManager({
  initialServices,
  initialSeoPages = [],
}: {
  initialServices: Service[];
  initialSeoPages?: SeoPageData[];
}) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [seoOpen, setSeoOpen] = useState<string | null>(null);

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
              <>
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditing(svc.id); setEditData({}); setSeoOpen(null); }}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setSeoOpen(seoOpen === svc.id ? null : svc.id)}
                          className={`text-xs font-medium transition-colors ${
                            seoOpen === svc.id
                              ? "text-gold"
                              : "text-gray-400 hover:text-gray-700"
                          }`}
                        >
                          SEO
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
                {seoOpen === svc.id && (
                  <tr key={`${svc.id}-seo`} className="border-b border-blue-100 bg-blue-50/30">
                    <td colSpan={5} className="px-6 py-4">
                      <ServiceSeoPanel
                        seoSlug={`service-${svc.slug}`}
                        initialPages={initialSeoPages}
                        serviceName={svc.nameEs}
                      />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
