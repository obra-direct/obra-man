"use client";

import { useState } from "react";

type Lead = {
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string | null;
  language: string;
  status: string;
  createdAt: Date;
};

const STATUS_OPTIONS = [
  { value: "new", label: "Nuevo", className: "bg-green-100 text-green-700" },
  { value: "contacted", label: "Contactado", className: "bg-blue-100 text-blue-700" },
  { value: "quoted", label: "Presupuestado", className: "bg-yellow-100 text-yellow-700" },
  { value: "closed", label: "Cerrado", className: "bg-gray-100 text-gray-600" },
];

export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  async function updateStatus(id: string, status: string) {
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    }
  }

  const filtered = leads.filter((l) => {
    const matchesFilter = filter === "all" || l.status === filter;
    const matchesSearch =
      search === "" ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.service.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre, teléfono o servicio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold w-full md:w-72"
        />
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === "all" ? "bg-navy text-white border-navy" : "border-gray-300 text-gray-600 hover:border-navy"}`}
          >
            Todos ({leads.length})
          </button>
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === opt.value ? "bg-navy text-white border-navy" : "border-gray-300 text-gray-600 hover:border-navy"}`}
            >
              {opt.label} ({leads.filter((l) => l.status === opt.value).length})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Nombre</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Teléfono</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Servicio</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Mensaje</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Idioma</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Fecha</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No se encontraron leads
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4">
                    <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{lead.service}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {lead.message || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className="uppercase text-xs font-semibold text-gray-500">{lead.language}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold ${
                        STATUS_OPTIONS.find((s) => s.value === lead.status)?.className ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
