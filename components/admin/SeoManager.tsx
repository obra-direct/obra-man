"use client";

import { useState } from "react";

type SeoPage = {
  id: string;
  slug: string;
  title: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  focusKeyword: string | null;
  canonical: string | null;
  robots: string | null;
  h1: string | null;
};

type SeoGlobal = {
  id: string;
  ga4Id: string | null;
  schemaName: string | null;
  schemaAddress: string | null;
  schemaPhone: string | null;
  schemaLat: string | null;
  schemaLng: string | null;
  schemaHours: string | null;
  schemaPriceRange: string | null;
  sitemapEnabled: boolean;
} | null;

type PageSlugConfig = { slug: string; labelEs: string };

function SeoPageForm({
  slugConfig,
  initialData,
}: {
  slugConfig: PageSlugConfig;
  initialData: SeoPage | undefined;
}) {
  const [data, setData] = useState<Partial<SeoPage>>(
    initialData || { slug: slugConfig.slug }
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key: keyof SeoPage, value: string | boolean) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page", data: { slug: slugConfig.slug, ...data } }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            Title Tag
          </label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Título de la página | ObraDirecta"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">{(data.title || "").length}/60 caracteres recomendados</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            H1 Heading
          </label>
          <input
            type="text"
            value={data.h1 || ""}
            onChange={(e) => set("h1", e.target.value)}
            placeholder="Encabezado principal"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
          Meta Description
        </label>
        <textarea
          value={data.metaDescription || ""}
          onChange={(e) => set("metaDescription", e.target.value)}
          placeholder="Descripción para los buscadores..."
          rows={2}
          className={`${inputClass} resize-none`}
        />
        <p className="text-xs text-gray-400 mt-1">{(data.metaDescription || "").length}/160 caracteres recomendados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            OG Title
          </label>
          <input
            type="text"
            value={data.ogTitle || ""}
            onChange={(e) => set("ogTitle", e.target.value)}
            placeholder="Título para redes sociales"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            OG Description
          </label>
          <input
            type="text"
            value={data.ogDescription || ""}
            onChange={(e) => set("ogDescription", e.target.value)}
            placeholder="Descripción para redes sociales"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            Focus Keyword
          </label>
          <input
            type="text"
            value={data.focusKeyword || ""}
            onChange={(e) => set("focusKeyword", e.target.value)}
            placeholder="constructora barcelona"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            Canonical URL
          </label>
          <input
            type="url"
            value={data.canonical || ""}
            onChange={(e) => set("canonical", e.target.value)}
            placeholder="https://obradirecta.cat/"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            Robots
          </label>
          <select
            value={data.robots || "index, follow"}
            onChange={(e) => set("robots", e.target.value)}
            className={`${inputClass} bg-white`}
          >
            <option value="index, follow">index, follow</option>
            <option value="noindex, follow">noindex, follow</option>
            <option value="index, nofollow">index, nofollow</option>
            <option value="noindex, nofollow">noindex, nofollow</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
        {saved && (
          <span className="text-green-600 text-sm font-medium">✓ Guardado correctamente</span>
        )}
      </div>
    </div>
  );
}

function GlobalSeoForm({ initialGlobal }: { initialGlobal: SeoGlobal }) {
  const [data, setData] = useState(
    initialGlobal || {
      ga4Id: "",
      schemaName: "ObraDirecta",
      schemaAddress: "Barcelona, Cataluña, España",
      schemaPhone: "+34600000000",
      schemaLat: "41.3851",
      schemaLng: "2.1734",
      schemaHours: "Mo-Fr 08:00-18:00",
      schemaPriceRange: "€€",
      sitemapEnabled: true,
    }
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key: string, value: string | boolean) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "global", data }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent";

  return (
    <div className="space-y-6">
      {/* Google Analytics */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>📊</span> Google Analytics 4
        </h3>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            GA4 Measurement ID
          </label>
          <input
            type="text"
            value={data.ga4Id || ""}
            onChange={(e) => set("ga4Id", e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">
            Obtén tu ID en Google Analytics → Admin → Data Streams
          </p>
        </div>
      </div>

      {/* Schema.org LocalBusiness */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🏢</span> Schema.org LocalBusiness
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Nombre del negocio
            </label>
            <input
              type="text"
              value={data.schemaName || ""}
              onChange={(e) => set("schemaName", e.target.value)}
              placeholder="ObraDirecta"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Teléfono
            </label>
            <input
              type="tel"
              value={data.schemaPhone || ""}
              onChange={(e) => set("schemaPhone", e.target.value)}
              placeholder="+34600000000"
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Dirección
            </label>
            <input
              type="text"
              value={data.schemaAddress || ""}
              onChange={(e) => set("schemaAddress", e.target.value)}
              placeholder="Calle Ejemplo 1, Barcelona, Cataluña"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Latitud
            </label>
            <input
              type="text"
              value={data.schemaLat || ""}
              onChange={(e) => set("schemaLat", e.target.value)}
              placeholder="41.3851"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Longitud
            </label>
            <input
              type="text"
              value={data.schemaLng || ""}
              onChange={(e) => set("schemaLng", e.target.value)}
              placeholder="2.1734"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Horario (formato schema)
            </label>
            <input
              type="text"
              value={data.schemaHours || ""}
              onChange={(e) => set("schemaHours", e.target.value)}
              placeholder="Mo-Fr 08:00-18:00"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              Rango de precios
            </label>
            <select
              value={data.schemaPriceRange || "€€"}
              onChange={(e) => set("schemaPriceRange", e.target.value)}
              className={`${inputClass} bg-white`}
            >
              <option value="€">€ (Económico)</option>
              <option value="€€">€€ (Moderado)</option>
              <option value="€€€">€€€ (Alto)</option>
              <option value="€€€€">€€€€ (Premium)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sitemap */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🗺️</span> Sitemap.xml
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => set("sitemapEnabled", !data.sitemapEnabled)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${data.sitemapEnabled ? "bg-gold" : "bg-gray-300"}`}
            role="switch"
            aria-checked={data.sitemapEnabled}
            aria-label="Toggle sitemap"
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.sitemapEnabled ? "translate-x-7" : "translate-x-1"}`} />
          </button>
          <span className="text-sm text-gray-700">
            Sitemap automático {data.sitemapEnabled ? "activado" : "desactivado"}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Si está activado, /sitemap.xml se genera automáticamente. Accesible en{" "}
          <a href="/sitemap.xml" target="_blank" className="text-blue-500 hover:underline">/sitemap.xml</a>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar configuración global"}
        </button>
        {saved && (
          <span className="text-green-600 text-sm font-medium">✓ Guardado correctamente</span>
        )}
      </div>
    </div>
  );
}

export default function SeoManager({
  pageSlugs,
  initialPages,
  initialGlobal,
}: {
  pageSlugs: PageSlugConfig[];
  initialPages: SeoPage[];
  initialGlobal: SeoGlobal;
}) {
  const [activeTab, setActiveTab] = useState<string>("global");

  const pagesMap: Record<string, SeoPage> = {};
  initialPages.forEach((p) => { pagesMap[p.slug] = p; });

  const tabs = [
    { id: "global", label: "🌐 Global" },
    ...pageSlugs.map((p) => ({ id: p.slug, label: `📄 ${p.labelEs}` })),
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Tab header */}
      <div className="border-b border-gray-100 overflow-x-auto">
        <div className="flex min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-gold text-gold"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "global" ? (
          <GlobalSeoForm initialGlobal={initialGlobal} />
        ) : (
          <SeoPageForm
            key={activeTab}
            slugConfig={pageSlugs.find((p) => p.slug === activeTab)!}
            initialData={pagesMap[activeTab]}
          />
        )}
      </div>
    </div>
  );
}
