import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import ServiceCard from "@/components/public/ServiceCard";
import LeadForm from "@/components/public/LeadForm";
import { SERVICE_CATEGORIES, getCategoryName } from "@/lib/services-data";
import { getSeoForPage } from "@/lib/seo";
import type { Locale } from "@/i18n";
import {
  categoryListingHref,
  getCategoryRouteDefByCategoryId,
} from "@/lib/service-category-routes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoForPage("services", locale);
  if (!seo.title) {
    const titles: Record<string, string> = {
      es: "Servicios de Construcción en Barcelona | ObraDirecta",
      ca: "Serveis de Construcció a Barcelona | ObraDirecta",
      en: "Construction Services in Barcelona | ObraDirecta",
    };
    seo.title = titles[locale] || titles.es;
  }
  return seo;
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  const totalServices = SERVICE_CATEGORIES.reduce(
    (sum, cat) => sum + cat.services.length,
    0
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-10 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-3 sm:mb-5">
            {locale === "ca" ? "Tots els serveis" : locale === "en" ? "All Services" : "Todos los Servicios"}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3 px-2">
            {t("title")}
          </h1>
          <p className="text-gold text-sm sm:text-lg mb-2 sm:mb-3">{t("subtitle")}</p>
          <p className="text-gray-500 text-xs sm:text-sm">
            <span className="text-white font-semibold">{totalServices}</span>{" "}
            {locale === "ca" ? "serveis" : locale === "en" ? "services" : "servicios"}{" "}
            ·{" "}
            <span className="text-white font-semibold">{SERVICE_CATEGORIES.length}</span>{" "}
            {locale === "ca" ? "categories" : locale === "en" ? "categories" : "categorías"}
          </p>
        </div>
      </section>

      {/* Category Navigation — mobile grid */}
      <div className="md:hidden bg-white border-b border-gray-100">
        <div className="container-custom py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3 px-0.5">
            {locale === "ca" ? "Categories" : locale === "en" ? "Categories" : "Categorías"}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_CATEGORIES.map((cat) => {
              const route = getCategoryRouteDefByCategoryId(cat.id);
              const href =
                route != null ? categoryListingHref(locale as Locale, route) : `#${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-100 bg-gray-50 active:scale-95 hover:border-gold hover:bg-gold/5 transition-all duration-150"
                >
                  <span className="text-xl leading-none shrink-0">{cat.icon}</span>
                  <span className="text-xs font-semibold text-gray-700 leading-tight">
                    {getCategoryName(cat, locale as Locale)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Navigation — desktop sticky scroll bar */}
      <div className="hidden md:block bg-white border-b border-gray-100 sticky top-16 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {SERVICE_CATEGORIES.map((cat) => {
              const route = getCategoryRouteDefByCategoryId(cat.id);
              const href =
                route != null ? categoryListingHref(locale as Locale, route) : `#${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={href}
                  className="whitespace-nowrap text-xs font-semibold px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-200 shrink-0"
                >
                  {cat.icon} {getCategoryName(cat, locale as Locale)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services by Category */}
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container-custom space-y-10 md:space-y-14">
          {SERVICE_CATEGORIES.map((cat) => {
            const route = getCategoryRouteDefByCategoryId(cat.id);
            return (
              <section key={cat.id} id={cat.id}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl w-10 h-10 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-navy">
                        {getCategoryName(cat, locale as Locale)}
                      </h2>
                      <span className="text-xs text-gray-400">
                        {cat.services.length}{" "}
                        {locale === "ca" ? "serveis" : locale === "en" ? "services" : "servicios"}
                      </span>
                    </div>
                  </div>
                  {route != null && (
                    <Link
                      href={categoryListingHref(locale as Locale, route)}
                      className="btn-gold text-xs py-2 px-4"
                    >
                      {locale === "ca" ? "Veure tot" : locale === "en" ? "View all" : "Ver todo"}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {cat.services.map((svc) => (
                    <ServiceCard key={svc.id} service={svc} locale={locale as Locale} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Lead form */}
      <section className="section-y bg-white">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-5 sm:mb-8">
            <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-4">
              {locale === "ca" ? "Pressupost gratuït" : locale === "en" ? "Free Quote" : "Presupuesto Gratuito"}
            </span>
            <h2 className="section-title">
              {locale === "es"
                ? "¿Necesitas alguno de estos servicios?"
                : locale === "ca"
                ? "Necessites algun d'aquests serveis?"
                : "Need any of these services?"}
            </h2>
            <p className="section-subtitle max-sm:line-clamp-2">
              {locale === "es"
                ? "Solicita tu presupuesto gratuito ahora."
                : locale === "ca"
                ? "Sol·licita el teu pressupost gratuït ara."
                : "Request your free quote now."}
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-8">
            <LeadForm locale={locale as Locale} />
          </div>
        </div>
      </section>
    </>
  );
}
