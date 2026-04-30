import Image from "next/image";
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
import {
  CATEGORY_HERO_IMAGE,
  CATEGORY_GALLERY_IMAGES,
  DEFAULT_HERO,
  DEFAULT_GALLERY,
} from "@/lib/service-images";

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
    seo.title = `${getServiceName(service, locale)} ${suffix} | ObraDirecta`;
  }
  if (!seo.description) {
    const desc =
      locale === "ca" ? service.descCa : locale === "en" ? service.descEn : service.descEs;
    seo.description = desc || undefined;
  }
  return seo;
}

// ─── static data ─────────────────────────────────────────────────────────────

const STATS = (loc: Locale) =>
  loc === "ca"
    ? [
        { value: "+500", label: "Projectes completats" },
        { value: "15+", label: "Anys d'experiència" },
        { value: "24h", label: "Resposta garantida" },
        { value: "100%", label: "Preu tancat" },
      ]
    : loc === "en"
      ? [
          { value: "+500", label: "Completed projects" },
          { value: "15+", label: "Years of experience" },
          { value: "24h", label: "Guaranteed response" },
          { value: "100%", label: "Fixed price" },
        ]
      : [
          { value: "+500", label: "Proyectos completados" },
          { value: "15+", label: "Años de experiencia" },
          { value: "24h", label: "Respuesta garantizada" },
          { value: "100%", label: "Precio cerrado" },
        ];

const PROCESS_STEPS = (loc: Locale) =>
  loc === "ca"
    ? [
        { n: "1", title: "Contacte", desc: "Truca'ns o omple el formulari en 2 minuts." },
        { n: "2", title: "Visita gratuïta", desc: "Anem a veure la teva obra sense compromís." },
        { n: "3", title: "Pressupost clar", desc: "Preu tancat, detallat i sense lletra petita." },
        { n: "4", title: "Executem", desc: "El nostre equip propi treballa net i puntual." },
      ]
    : loc === "en"
      ? [
          { n: "1", title: "Contact", desc: "Call us or fill in the form in 2 minutes." },
          { n: "2", title: "Free site visit", desc: "We visit your project with no commitment." },
          { n: "3", title: "Clear quote", desc: "Fixed price, detailed, with no small print." },
          { n: "4", title: "We deliver", desc: "Our own team works cleanly and on time." },
        ]
      : [
          { n: "1", title: "Contacto", desc: "Llámanos o rellena el formulario en 2 minutos." },
          { n: "2", title: "Visita gratuita", desc: "Vamos a ver tu obra sin ningún compromiso." },
          { n: "3", title: "Presupuesto claro", desc: "Precio cerrado, detallado y sin letra pequeña." },
          { n: "4", title: "Lo ejecutamos", desc: "Nuestro equipo propio trabaja limpio y puntual." },
        ];

const TESTIMONIALS = (loc: Locale) =>
  loc === "ca"
    ? [
        {
          name: "María García",
          location: "Barcelona",
          text: "Molt professionals i puntuals. Ens van reformar el pis sencer en menys temps del que esperàvem i el resultat és immillorable.",
          rating: 5,
        },
        {
          name: "Carlos Martínez",
          location: "Sabadell",
          text: "Van construir la nostra casa unifamiliar amb un seguiment personalitzat en cada etapa. Preu tancat i sense sorpreses. El recomanem al 100%.",
          rating: 5,
        },
        {
          name: "Anna Puig",
          location: "L'Hospitalet",
          text: "Van rehabilitar la façana del nostre edifici en el termini acordat. Tracte excel·lent i resultat fantàstic. Tornaria a contractar-los sense dubtar.",
          rating: 5,
        },
      ]
    : loc === "en"
      ? [
          {
            name: "María García",
            location: "Barcelona",
            text: "Very professional and punctual. They renovated our entire flat in less time than expected and the result is outstanding.",
            rating: 5,
          },
          {
            name: "Carlos Martínez",
            location: "Sabadell",
            text: "They built our single-family home with personalised follow-up at every stage. Fixed price, no surprises. 100% recommended.",
            rating: 5,
          },
          {
            name: "Anna Puig",
            location: "L'Hospitalet",
            text: "They rehabilitated our building's façade within the agreed timeframe. Excellent service and fantastic result. I would hire them again without hesitation.",
            rating: 5,
          },
        ]
      : [
          {
            name: "María García",
            location: "Barcelona",
            text: "Muy profesionales y puntuales. Nos reformaron el piso entero en menos tiempo del esperado y el resultado es inmejorable.",
            rating: 5,
          },
          {
            name: "Carlos Martínez",
            location: "Sabadell",
            text: "Construyeron nuestra vivienda unifamiliar con seguimiento personalizado en cada etapa. Precio cerrado y sin sorpresas. Lo recomendamos al 100%.",
            rating: 5,
          },
          {
            name: "Anna Puig",
            location: "L'Hospitalet",
            text: "Rehabilitaron la fachada de nuestro edificio en el plazo acordado. Trato excelente y resultado fantástico. Los volvería a contratar sin dudarlo.",
            rating: 5,
          },
        ];

// ─── page ─────────────────────────────────────────────────────────────────────

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

  const heroImage = CATEGORY_HERO_IMAGE[category.id] ?? DEFAULT_HERO;
  const galleryImages = CATEGORY_GALLERY_IMAGES[category.id] ?? DEFAULT_GALLERY;

  const longDesc =
    content
      ? loc === "ca" ? content.longDescCa : loc === "en" ? content.longDescEn : content.longDescEs
      : null;

  const features =
    content
      ? loc === "ca" ? content.featuresCa : loc === "en" ? content.featuresEn : content.featuresEs
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
    loc === "ca" ? "Per què triar ObraDirecta?" : loc === "en" ? "Why choose ObraDirecta?" : "¿Por qué elegir ObraDirecta?";

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

  const relatedServices = category.services.filter((s) => s.id !== serviceSlug).slice(0, 4);
  const stats = STATS(loc);
  const steps = PROCESS_STEPS(loc);
  const testimonials = TESTIMONIALS(loc);

  return (
    <>
      {/* ── Hero with background image ── */}
      <section className="relative bg-navy min-h-[340px] md:min-h-[420px] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={serviceName}
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40" />
        <div className="relative container-custom py-12 md:py-16 z-10 w-full">
          <nav className="text-sm text-gray-400 mb-5 flex flex-wrap items-center gap-1">
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
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{category.icon}</span>
              <span className="text-gold text-xs font-semibold uppercase tracking-widest">{categoryName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {serviceName}
            </h1>
            {shortDesc && (
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">{shortDesc}</p>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="bg-gold">
        <div className="container-custom">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gold-dark/20">
            {stats.map((s) => (
              <div key={s.label} className="py-4 px-5 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-navy">{s.value}</p>
                <p className="text-navy/70 text-xs sm:text-sm font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              {longDesc && (
                <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                  <h2 className="text-xl font-bold text-navy mb-4">
                    {loc === "ca" ? `${serviceName} a Barcelona` : loc === "en" ? `${serviceName} in Barcelona` : `${serviceName} en Barcelona`}
                  </h2>
                  <div className="space-y-4">
                    {longDesc.split("\n\n").map((para, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo gallery */}
              <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
                {galleryImages.map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${serviceName} — ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 33vw, 250px"
                    />
                  </div>
                ))}
              </div>

              {/* Features checklist */}
              {features && features.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                  <h2 className="text-xl font-bold text-navy mb-5">
                    {loc === "ca" ? "Què inclou el nostre servei" : loc === "en" ? "What our service includes" : "Qué incluye nuestro servicio"}
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

              {/* How we work */}
              <div className="bg-white rounded-2xl border border-gray-100 p-7 shadow-sm">
                <h2 className="text-xl font-bold text-navy mb-6">
                  {loc === "ca" ? "Com treballem" : loc === "en" ? "How we work" : "Cómo trabajamos"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {steps.map((step) => (
                    <div key={step.n} className="flex gap-4 items-start">
                      <div className="shrink-0 w-9 h-9 rounded-full bg-navy flex items-center justify-center text-gold font-extrabold text-sm">
                        {step.n}
                      </div>
                      <div>
                        <p className="font-bold text-navy text-sm">{step.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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

              {/* Testimonials */}
              <div>
                <h2 className="text-xl font-bold text-navy mb-5">
                  {loc === "ca" ? "El que diuen els nostres clients" : loc === "en" ? "What our clients say" : "Lo que dicen nuestros clientes"}
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {testimonials.map((t) => (
                    <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col gap-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-gold fill-gold" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t.text}"</p>
                      <div>
                        <p className="font-semibold text-navy text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      ),
                      label: loc === "ca" ? "Qualitat certificada" : loc === "en" ? "Certified quality" : "Calidad certificada",
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                        </svg>
                      ),
                      label: loc === "ca" ? "Millor preu garantit" : loc === "en" ? "Best price guaranteed" : "Mejor precio garantizado",
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                      ),
                      label: loc === "ca" ? "Equip propi, sense subcontractes" : loc === "en" ? "Own team, no subcontractors" : "Equipo propio, sin subcontratas",
                    },
                    {
                      icon: (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      label: loc === "ca" ? "Lliurament en termini" : loc === "en" ? "On-time delivery" : "Entrega en plazo",
                    },
                  ].map((badge) => (
                    <div key={badge.label} className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                        {badge.icon}
                      </div>
                      <p className="text-navy text-xs font-semibold leading-snug">{badge.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related services */}
              {relatedServices.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-navy mb-4">
                    {loc === "ca" ? "Altres serveis relacionats" : loc === "en" ? "Other related services" : "Otros servicios relacionados"}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {relatedServices.map((svc) => {
                      const svcName = getServiceName(svc, locale);
                      const svcDesc = loc === "ca" ? svc.descCa : loc === "en" ? svc.descEn : svc.descEs;
                      const svcHref = categoryRoute ? `${categoryListingHref(loc, categoryRoute)}/${svc.id}` : "#";
                      return (
                        <Link
                          key={svc.id}
                          href={svcHref}
                          className="group bg-white border border-gray-100 rounded-xl p-4 hover:border-gold/40 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-semibold text-navy text-sm group-hover:text-gold transition-colors">{svcName}</span>
                            <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gold shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                            </svg>
                          </div>
                          {svcDesc && <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{svcDesc}</p>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky quote form */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-500 font-medium">+500 {loc === "ca" ? "projectes realitzats" : loc === "en" ? "completed projects" : "proyectos realizados"}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-1">{quoteTitle}</h3>
                  <p className="text-gray-500 text-xs mb-5">
                    {loc === "ca" ? "Respostem en menys de 24 hores, sense compromís." : loc === "en" ? "We respond in under 24 hours, no commitment." : "Respondemos en menos de 24 horas, sin compromiso."}
                  </p>
                  <LeadForm locale={loc} presetCategoryId={category.id} presetServiceId={serviceSlug} />
                </div>

                {/* Contact alternative */}
                <div className="bg-navy rounded-2xl p-5 text-center">
                  <p className="text-gray-300 text-xs mb-3">
                    {loc === "ca" ? "Prefereixes trucar directament?" : loc === "en" ? "Prefer to call directly?" : "¿Prefieres llamar directamente?"}
                  </p>
                  <a
                    href="tel:+34600000000"
                    className="flex items-center justify-center gap-2 text-gold font-bold text-lg hover:text-gold/80 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    +34 600 000 000
                  </a>
                  <p className="text-gray-500 text-xs mt-1">
                    {loc === "ca" ? "Dl–Dv · 8:00–18:00" : loc === "en" ? "Mon–Fri · 8:00–18:00" : "Lun–Vie · 8:00–18:00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
