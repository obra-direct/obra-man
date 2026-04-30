import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LeadForm from "@/components/public/LeadForm";
import { locales, type Locale } from "@/i18n";
import {
  CATEGORY_ROUTE_DEFS,
  categoryListingHref,
  getCategoryFromPathSlug,
  seoSlugForService,
  servicesIndexHref,
} from "@/lib/service-category-routes";
import { getCategoryName, getServiceName, SERVICE_CATEGORIES } from "@/lib/services-data";
import { getServiceContent } from "@/lib/services-content";
import { getSeoForPage } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CATEGORY_ROUTE_DEFS.flatMap((r) => {
      const cat = SERVICE_CATEGORIES.find((c) => c.id === r.categoryId);
      if (!cat) return [];
      return cat.services.map((svc) => ({
        locale,
        categorySlug: r.slugEs,
        serviceSlug: svc.id,
      }));
    })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { locale, categorySlug, serviceSlug } = await params;
  const category = getCategoryFromPathSlug(categorySlug);
  if (!category) return {};

  const service = category.services.find((s) => s.id === serviceSlug);
  if (!service) return {};

  const seoSlug = seoSlugForService(serviceSlug);
  const seo = await getSeoForPage(seoSlug, locale);

  if (!seo.title) {
    const suffix =
      locale === "ca" ? "a Barcelona" : locale === "en" ? "in Barcelona" : "en Barcelona";
    const name = getServiceName(service, locale);
    seo.title = `${name} ${suffix} | ObraDirecta`;
  }
  if (!seo.description) {
    const desc =
      locale === "ca"
        ? service.descCa
        : locale === "en"
          ? service.descEn
          : service.descEs;
    seo.description = desc || undefined;
  }

  return seo;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string; serviceSlug: string }>;
}) {
  const { locale, categorySlug, serviceSlug } = await params;

  const category = getCategoryFromPathSlug(categorySlug);
  if (!category) notFound();

  const service = category.services.find((s) => s.id === serviceSlug);
  if (!service) notFound();

  const loc = locale as Locale;
  const content = getServiceContent(serviceSlug);

  const serviceName = getServiceName(service, locale);
  const categoryName = getCategoryName(category, locale);
  const servicesPath = servicesIndexHref(loc);
  const categoryRoute = CATEGORY_ROUTE_DEFS.find((r) => r.categoryId === category.id);
  const categoryPath = categoryRoute ? categoryListingHref(loc, categoryRoute) : servicesPath;

  const longDesc =
    content
      ? loc === "ca"
        ? content.longDescCa
        : loc === "en"
          ? content.longDescEn
          : content.longDescEs
      : null;

  const features =
    content
      ? loc === "ca"
        ? content.featuresCa
        : loc === "en"
          ? content.featuresEn
          : content.featuresEs
      : null;

  const shortDesc =
    loc === "ca" ? service.descCa : loc === "en" ? service.descEn : service.descEs;

  const quoteTitle =
    loc === "ca"
      ? `Sol·licita pressupost · ${serviceName}`
      : loc === "en"
        ? `Request a quote · ${serviceName}`
        : `Solicita presupuesto · ${serviceName}`;

  const whyTitle =
    loc === "ca"
      ? "Per què triar ObraDirecta?"
      : loc === "en"
        ? "Why choose ObraDirecta?"
        : "¿Por qué elegir ObraDirecta?";

  const whyPoints =
    loc === "ca"
      ? [
          "+15 anys d'experiència en obres a Barcelona i Catalunya",
          "Pressupost gratuït i detallat en 24 hores",
          "Preu tancat sense costos ocults ni sorpreses",
          "Equip propi certificat i assegurat",
          "Garantia d'obra i servei postvenda inclosos",
        ]
      : loc === "en"
        ? [
            "Over 15 years' experience in construction across Barcelona and Catalonia",
            "Free, detailed quote in 24 hours",
            "Fixed price with no hidden costs or surprises",
            "Own certified and insured team",
            "Construction warranty and after-sales service included",
          ]
        : [
            "+15 años de experiencia en obras en Barcelona y Cataluña",
            "Presupuesto gratuito y detallado en 24 horas",
            "Precio cerrado sin costes ocultos ni sorpresas",
            "Equipo propio certificado y asegurado",
            "Garantía de obra y servicio postventa incluidos",
          ];

  const relatedServices = category.services
    .filter((s) => s.id !== serviceSlug)
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="container-custom">
          <nav className="text-sm text-gray-400 mb-6 flex flex-wrap items-center gap-1">
            <Link href={servicesPath} className="hover:text-gold transition-colors">
              {loc === "ca" ? "Serveis" : loc === "en" ? "Services" : "Servicios"}
            </Link>
            <span>›</span>
            <Link href={categoryPath} className="hover:text-gold transition-colors">
              {categoryName}
            </Link>
            <span>›</span>
            <span className="text-gray-300">{serviceName}</span>
          </nav>
          <div className="flex items-start gap-4">
            <span className="text-4xl mt-1">{category.icon}</span>
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
                {categoryName}
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
                {serviceName}
              </h1>
              {shortDesc && (
                <p className="text-gray-300 text-lg max-w-2xl">{shortDesc}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: description + features */}
            <div className="lg:col-span-2 space-y-8">
              {longDesc && (
                <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                  <h2 className="text-xl font-bold text-navy mb-4">
                    {loc === "ca"
                      ? `${serviceName} a Barcelona`
                      : loc === "en"
                        ? `${serviceName} in Barcelona`
                        : `${serviceName} en Barcelona`}
                  </h2>
                  <div className="space-y-4">
                    {longDesc.split("\n\n").map((para, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {features && features.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                  <h2 className="text-xl font-bold text-navy mb-5">
                    {loc === "ca"
                      ? "Què inclou el nostre servei"
                      : loc === "en"
                        ? "What our service includes"
                        : "Qué incluye nuestro servicio"}
                  </h2>
                  <ul className="space-y-3">
                    {features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                          <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-sm leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why ObraDirecta */}
              <div className="bg-navy rounded-2xl p-7">
                <h2 className="text-xl font-bold text-white mb-5">{whyTitle}</h2>
                <ul className="space-y-3">
                  {whyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-gray-300 text-sm leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related services in same category */}
              {relatedServices.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-navy mb-4">
                    {loc === "ca"
                      ? "Altres serveis relacionats"
                      : loc === "en"
                        ? "Other related services"
                        : "Otros servicios relacionados"}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {relatedServices.map((svc) => {
                      const svcName = getServiceName(svc, locale);
                      const svcDesc =
                        loc === "ca" ? svc.descCa : loc === "en" ? svc.descEn : svc.descEs;
                      const svcHref = categoryRoute
                        ? `${categoryListingHref(loc, categoryRoute)}/${svc.id}`
                        : "#";
                      return (
                        <Link
                          key={svc.id}
                          href={svcHref}
                          className="group bg-white border border-gray-100 rounded-xl p-4 hover:border-gold/40 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-semibold text-navy text-sm group-hover:text-gold transition-colors">
                              {svcName}
                            </span>
                            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gold shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </div>
                          {svcDesc && (
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{svcDesc}</p>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky quote form */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                  <h3 className="text-lg font-bold text-navy mb-1">{quoteTitle}</h3>
                  <p className="text-gray-500 text-xs mb-5">
                    {loc === "ca"
                      ? "Respostem en menys de 24 hores, sense compromís."
                      : loc === "en"
                        ? "We respond in under 24 hours, no commitment."
                        : "Respondemos en menos de 24 horas, sin compromiso."}
                  </p>
                  <LeadForm locale={loc} presetCategoryId={category.id} presetServiceId={serviceSlug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
