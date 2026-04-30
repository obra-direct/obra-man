"use client";

import { useState } from "react";

type SeoPage = {
  id: string;
  slug: string;
  locale: string;
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

type PageSlugConfig = { slug: string; labelEs: string; labelEn: string };
type DefaultSeoEntry = { title?: string; metaDescription?: string; h1?: string };
type DefaultSeoMap = Record<string, Record<string, DefaultSeoEntry>>;

const LOCALES = [
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "ca", flag: "🏴", label: "Català" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

function SeoPageLocaleForm({
  slug,
  locale,
  initialData,
  defaultEntry,
  adminLang,
}: {
  slug: string;
  locale: string;
  initialData: SeoPage | undefined;
  defaultEntry?: DefaultSeoEntry;
  adminLang: "es" | "en";
}) {
  const isNew = !initialData;
  const [data, setData] = useState<Partial<SeoPage>>(
    initialData || { slug, locale, ...defaultEntry }
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
      body: JSON.stringify({ type: "page", data: { slug, locale, ...data } }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent";

  const t = {
    titleTag: adminLang === "en" ? "Title Tag" : "Title Tag",
    h1Heading: adminLang === "en" ? "H1 Heading" : "Encabezado H1",
    metaDesc: adminLang === "en" ? "Meta Description" : "Meta Descripción",
    ogTitle: adminLang === "en" ? "OG Title" : "OG Título",
    ogDesc: adminLang === "en" ? "OG Description" : "OG Descripción",
    focusKw: adminLang === "en" ? "Focus Keyword" : "Palabra Clave",
    canonical: adminLang === "en" ? "Canonical URL" : "URL Canónica",
    robots: adminLang === "en" ? "Robots" : "Robots",
    titleHint: adminLang === "en" ? "recommended characters" : "caracteres recomendados",
    descHint: adminLang === "en" ? "recommended characters" : "caracteres recomendados",
    save: adminLang === "en" ? "Save changes" : "Guardar cambios",
    saving: adminLang === "en" ? "Saving..." : "Guardando...",
    savedOk: adminLang === "en" ? "✓ Saved successfully" : "✓ Guardado correctamente",
    titlePlaceholder: adminLang === "en" ? "Page title | ObraDirecta" : "Título de la página | ObraDirecta",
    h1Placeholder: adminLang === "en" ? "Main heading" : "Encabezado principal",
    metaPlaceholder: adminLang === "en" ? "Description for search engines..." : "Descripción para los buscadores...",
    ogTitlePlaceholder: adminLang === "en" ? "Title for social networks" : "Título para redes sociales",
    ogDescPlaceholder: adminLang === "en" ? "Description for social networks" : "Descripción para redes sociales",
  };

  return (
    <div className="space-y-4">
      {isNew && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          <span>⚠️</span>
          <span>
            {adminLang === "en"
              ? "These are the current default values that Google sees. Edit and save to store them in the database."
              : "Estos son los valores por defecto actuales que ve Google. Edita y guarda para almacenarlos en la base de datos."}
          </span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            {t.titleTag}
          </label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => set("title", e.target.value)}
            placeholder={t.titlePlaceholder}
            className={inputClass}
          />
          <p className="text-xs text-gray-400 mt-1">{(data.title || "").length}/60 {t.titleHint}</p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            {t.h1Heading}
          </label>
          <input
            type="text"
            value={data.h1 || ""}
            onChange={(e) => set("h1", e.target.value)}
            placeholder={t.h1Placeholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
          {t.metaDesc}
        </label>
        <textarea
          value={data.metaDescription || ""}
          onChange={(e) => set("metaDescription", e.target.value)}
          placeholder={t.metaPlaceholder}
          rows={2}
          className={`${inputClass} resize-none`}
        />
        <p className="text-xs text-gray-400 mt-1">{(data.metaDescription || "").length}/160 {t.descHint}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            {t.ogTitle}
          </label>
          <input
            type="text"
            value={data.ogTitle || ""}
            onChange={(e) => set("ogTitle", e.target.value)}
            placeholder={t.ogTitlePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            {t.ogDesc}
          </label>
          <input
            type="text"
            value={data.ogDescription || ""}
            onChange={(e) => set("ogDescription", e.target.value)}
            placeholder={t.ogDescPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
            {t.focusKw}
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
            {t.canonical}
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
            {t.robots}
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
          {saving ? t.saving : t.save}
        </button>
        {saved && (
          <span className="text-green-600 text-sm font-medium">{t.savedOk}</span>
        )}
      </div>
    </div>
  );
}

function SeoPageForm({
  slugConfig,
  pagesMap,
  defaultSeo,
  adminLang,
}: {
  slugConfig: PageSlugConfig;
  pagesMap: Record<string, SeoPage>;
  defaultSeo?: DefaultSeoMap;
  adminLang: "es" | "en";
}) {
  const [activeLocale, setActiveLocale] = useState("es");

  return (
    <div className="space-y-4">
      {/* Locale sub-tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
        {LOCALES.map((loc) => (
          <button
            key={loc.code}
            onClick={() => setActiveLocale(loc.code)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeLocale === loc.code
                ? "bg-white text-navy shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{loc.flag}</span>
            <span>{loc.label}</span>
          </button>
        ))}
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
        <span>ℹ️</span>
        <span>
          {adminLang === "en"
            ? "Each language version is a separate URL for Google. Changes here only affect the selected language."
            : "Cada versión de idioma es una URL separada para Google. Los cambios aquí solo afectan al idioma seleccionado."}
        </span>
      </div>

      <SeoPageLocaleForm
        key={`${slugConfig.slug}-${activeLocale}`}
        slug={slugConfig.slug}
        locale={activeLocale}
        initialData={pagesMap[`${slugConfig.slug}__${activeLocale}`]}
        defaultEntry={defaultSeo?.[slugConfig.slug]?.[activeLocale]}
        adminLang={adminLang}
      />
    </div>
  );
}

function GlobalSeoForm({
  initialGlobal,
  adminLang,
}: {
  initialGlobal: SeoGlobal;
  adminLang: "es" | "en";
}) {
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

  const en = adminLang === "en";

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
            {en
              ? "Get your ID in Google Analytics → Admin → Data Streams"
              : "Obtén tu ID en Google Analytics → Admin → Data Streams"}
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
              {en ? "Business Name" : "Nombre del negocio"}
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
              {en ? "Phone" : "Teléfono"}
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
              {en ? "Address" : "Dirección"}
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
              {en ? "Latitude" : "Latitud"}
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
              {en ? "Longitude" : "Longitud"}
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
              {en ? "Hours (schema format)" : "Horario (formato schema)"}
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
              {en ? "Price Range" : "Rango de precios"}
            </label>
            <select
              value={data.schemaPriceRange || "€€"}
              onChange={(e) => set("schemaPriceRange", e.target.value)}
              className={`${inputClass} bg-white`}
            >
              <option value="€">€ ({en ? "Budget" : "Económico"})</option>
              <option value="€€">€€ ({en ? "Moderate" : "Moderado"})</option>
              <option value="€€€">€€€ ({en ? "High" : "Alto"})</option>
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
            {en
              ? `Automatic sitemap ${data.sitemapEnabled ? "enabled" : "disabled"}`
              : `Sitemap automático ${data.sitemapEnabled ? "activado" : "desactivado"}`}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {en
            ? "When enabled, /sitemap.xml is generated automatically. Available at "
            : "Si está activado, /sitemap.xml se genera automáticamente. Accesible en "}
          <a href="/sitemap.xml" target="_blank" className="text-blue-500 hover:underline">/sitemap.xml</a>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {saving
            ? (en ? "Saving..." : "Guardando...")
            : (en ? "Save global settings" : "Guardar configuración global")}
        </button>
        {saved && (
          <span className="text-green-600 text-sm font-medium">
            {en ? "✓ Saved successfully" : "✓ Guardado correctamente"}
          </span>
        )}
      </div>
    </div>
  );
}

export default function SeoManager({
  pageSlugs,
  initialPages,
  initialGlobal,
  defaultSeo,
  adminLang,
}: {
  pageSlugs: PageSlugConfig[];
  initialPages: SeoPage[];
  initialGlobal: SeoGlobal;
  defaultSeo?: DefaultSeoMap;
  adminLang?: "es" | "en";
}) {
  const lang = adminLang || "es";
  const [activeTab, setActiveTab] = useState<string>("global");

  // Build a map keyed by "slug__locale" for easy lookup
  const pagesMap: Record<string, SeoPage> = {};
  initialPages.forEach((p) => {
    pagesMap[`${p.slug}__${p.locale}`] = p;
  });

  const tabs = [
    { id: "global", label: `🌐 ${lang === "en" ? "Global" : "Global"}` },
    ...pageSlugs.map((p) => ({ id: p.slug, label: `📄 ${lang === "en" ? p.labelEn : p.labelEs}` })),
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
          <GlobalSeoForm initialGlobal={initialGlobal} adminLang={lang} />
        ) : (
          <SeoPageForm
            key={activeTab}
            slugConfig={pageSlugs.find((p) => p.slug === activeTab)!}
            pagesMap={pagesMap}
            defaultSeo={defaultSeo}
            adminLang={lang}
          />
        )}
      </div>
    </div>
  );
}
