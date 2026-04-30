import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import LeadForm from "@/components/public/LeadForm";
import { SERVICE_CATEGORIES, getCategoryName } from "@/lib/services-data";
import { getSeoForPage } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import {
  categoryListingHref,
  getCategoryRouteDefByCategoryId,
} from "@/lib/service-category-routes";
import type { Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoForPage("home", locale);
  if (!seo.title) {
    const defaultTitles: Record<string, string> = {
      es: "ObraDirecta — Constructora en Barcelona | Mejor Precio Garantizado",
      ca: "ObraDirecta — Constructora a Barcelona | Millor Preu Garantit",
      en: "ObraDirecta — Construction Company Barcelona | Best Price Guaranteed",
    };
    seo.title = defaultTitles[locale] || defaultTitles.es;
  }
  if (!seo.description) {
    const defaultDescs: Record<string, string> = {
      es: "Empresa constructora en Barcelona. +500 proyectos en Cataluña. Mejor precio garantizado, entrega rápida, calidad certificada. Presupuesto gratis en 24h.",
      ca: "Empresa constructora a Barcelona. +500 projectes a Catalunya. Millor preu garantit, entrega ràpida, qualitat certificada. Pressupost gratis en 24h.",
      en: "Construction company in Barcelona. +500 projects in Catalonia. Best price guaranteed, fast delivery, certified quality. Free quote in 24h.",
    };
    seo.description = defaultDescs[locale] || defaultDescs.es;
  }
  return seo;
}

function TrustBar() {
  const t = useTranslations("trust");
  const items = [
    {
      text: t("price"),
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" />
        </svg>
      ),
    },
    {
      text: t("delivery"),
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      text: t("quality"),
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      text: t("projects"),
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-gold py-2 sm:py-3.5 border-b border-gold-dark/20">
      <div className="container-custom">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-x-2 gap-y-1 sm:gap-x-6 sm:gap-y-0">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-navy font-semibold text-[11px] leading-tight sm:text-sm">
              {item.icon}
              <span className="line-clamp-2 sm:line-clamp-none">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UspsSection() {
  const t = useTranslations("usps");

  const usps = [
    {
      key: "price" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
        </svg>
      ),
      iconBg: "bg-gold/10",
      iconColor: "text-gold",
    },
    {
      key: "delivery" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      iconBg: "bg-gold/10",
      iconColor: "text-gold",
    },
    {
      key: "quality" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      iconBg: "bg-gold/10",
      iconColor: "text-gold",
    },
    {
      key: "projects" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      ),
      iconBg: "bg-gold/10",
      iconColor: "text-gold",
    },
    {
      key: "quote" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      iconBg: "bg-gold/10",
      iconColor: "text-gold",
    },
    {
      key: "team" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      iconBg: "bg-gold/10",
      iconColor: "text-gold",
    },
  ];

  return (
    <section className="section-y bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-2 sm:mb-4">
          <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-4">
            {t("badge")}
          </span>
          <h2 className="section-title">{t("title")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 mt-4 sm:mt-8 md:mt-10">
          {usps.map((usp) => (
            <div
              key={usp.key}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gold/30 transition-all duration-200 group"
            >
              <div className={`inline-flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-4 ${usp.iconBg} ${usp.iconColor} group-hover:scale-105 transition-transform duration-200`}>
                <span className="scale-90 sm:scale-100 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">{usp.icon}</span>
              </div>
              <h3 className="font-bold text-navy text-xs sm:text-base mb-1 sm:mb-2 leading-snug line-clamp-3 sm:line-clamp-none">{t(`${usp.key}.title`)}</h3>
              <p className="text-gray-500 text-[11px] sm:text-sm leading-snug sm:leading-relaxed line-clamp-4 sm:line-clamp-none">{t(`${usp.key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const t = useTranslations("howWeWork");
  const steps = t.raw("steps") as Array<{ title: string; desc: string }>;

  return (
    <section className="section-y bg-white border-t border-gray-100" aria-labelledby="how-we-work-heading">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center px-1">
          <h2 id="how-we-work-heading" className="section-title">
            {t("title")}
          </h2>
          <p className="mt-2 text-base font-semibold text-navy/90 leading-snug sm:text-lg">{t("subtitle")}</p>
          <p className="section-subtitle text-gray-600 max-sm:text-sm mt-3 sm:mt-4">{t("intro")}</p>
        </div>

        {/* Timeline: dense on phones, breathable on md+ */}
        <div className="relative mx-auto mt-8 max-w-xl sm:mt-12 md:max-w-3xl lg:max-w-4xl px-2 sm:px-0">
          <div className="absolute left-[18px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-gold/50 via-gold/20 to-gold/50 sm:left-5 rounded-full md:left-7" aria-hidden />
          <ol className="relative list-none space-y-4 sm:space-y-5">
            {steps.map((step, i) => (
              <li key={`${step.title}-${i}`} className="relative flex gap-3 sm:gap-5 pl-7 sm:pl-9 md:pl-12">
                <div className="absolute left-0 top-2 flex h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] shrink-0 items-center justify-center rounded-full bg-navy text-[11px] sm:text-sm font-extrabold text-gold shadow-md ring-[3px] ring-white md:left-[3px] md:h-9 md:w-9 md:top-[6px]">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1 rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50/95 to-white px-3 py-3 sm:rounded-2xl sm:px-4 sm:py-4 shadow-sm md:py-4 md:px-5">
                  <h3 className="text-[15px] font-bold leading-snug text-navy sm:text-base">{step.title}</h3>
                  <p className="mt-0.5 text-xs leading-snug text-gray-600 sm:text-sm">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview({ locale }: { locale: Locale }) {
  const t = useTranslations("services");
  const servicePath = locale === "es" ? "/servicios" : `/${locale}${locale === "ca" ? "/serveis" : "/services"}`;
  /** Mobile: same “hero” categories but swap facade for concrete & structures (matches /servicios section style). */
  const mobileCategoryIds = ["obra-nueva", "reformas-integrales", "instalaciones", "hormigonado-estructuras"] as const;
  const mobileCategories = mobileCategoryIds
    .map((id) => SERVICE_CATEGORIES.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => c != null);
  const desktopCategories = SERVICE_CATEGORIES.slice(0, 8);

  const categoryHref = (categoryId: string) => {
    const route = getCategoryRouteDefByCategoryId(categoryId);
    if (route != null) return categoryListingHref(locale, route);
    return `${servicePath}#${categoryId}`;
  };

  const serviceCountLine = (n: number) => (
    <>
      {n}{" "}
      {locale === "ca" ? "serveis" : locale === "en" ? "services" : "servicios"}
    </>
  );

  return (
    <section className="section-y bg-white">
      <div className="container-custom">
        <div className="text-center mb-2 sm:mb-4">
          <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-4">
            {t("badge")}
          </span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </div>

        {/* Mobile: 4 categories — layout aligned with /servicios category headers */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:hidden">
          {mobileCategories.map((cat) => (
            <Link
              key={cat.id}
              href={categoryHref(cat.id)}
              className="group relative flex flex-col justify-center rounded-2xl border border-gray-200/90 bg-white p-3 shadow-sm ring-1 ring-inset ring-black/[0.03] transition-all duration-300 hover:border-gold/45 hover:shadow-md hover:ring-gold/15 active:scale-[0.98] min-h-[116px]"
            >
              <div className="flex items-center gap-2.5 pr-7">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white text-xl shadow-sm">
                  {cat.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold leading-snug text-navy line-clamp-2">{getCategoryName(cat, locale)}</h3>
                  <span className="mt-0.5 block text-xs text-gray-400">{serviceCountLine(cat.services.length)}</span>
                </div>
              </div>
              <span className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy/5 text-navy/35 transition-all duration-300 group-hover:bg-gold/15 group-hover:text-gold">
                <svg className="h-3 w-3 -translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* sm+: 8 categories in compact grid */}
        <div className="mt-4 sm:mt-8 md:mt-10 hidden sm:grid sm:grid-cols-4 sm:gap-3 lg:gap-4">
          {desktopCategories.map((cat) => (
            <Link
              key={cat.id}
              href={categoryHref(cat.id)}
              className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-2 sm:p-4 hover:border-gold/50 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center gap-1 sm:gap-2 min-h-0"
            >
              <div className="text-lg sm:text-3xl shrink-0 group-hover:scale-110 transition-transform duration-200">
                {cat.icon}
              </div>
              <span className="font-semibold text-navy text-[10px] sm:text-xs md:text-sm leading-tight line-clamp-3 sm:line-clamp-2">
                {getCategoryName(cat, locale)}
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-xs text-gray-400 bg-gray-50 px-1.5 py-px sm:px-2 sm:py-0.5 rounded-full max-w-full truncate">
                {cat.services.length} {locale === "ca" ? "srv." : locale === "en" ? "svc." : "srv."}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 sm:mt-10">
          <Link href={servicePath} className="btn-navy">
            {t("viewAll")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    name: string;
    location: string;
    text: string;
    service: string;
  }>;

  return (
    <section className="section-y bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="container-custom relative">
        <div className="text-center mb-5 sm:mb-8 md:mb-10">
          <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-4">
            {t("title")}
          </span>
          <div className="flex items-center justify-center gap-0.5 sm:gap-1 mt-1 sm:mt-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold fill-gold" viewBox="0 0 24 24">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
        </div>
        {/* Mobile: horizontal snap strip (3 cards in ~one viewport height); md+: grid */}
        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-5 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide md:overflow-visible">
          {items.map((item, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-[82vw] min-[400px]:w-[72vw] sm:w-[60vw] md:w-auto md:min-w-0 bg-white/8 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:bg-white/12 transition-colors duration-200 flex flex-col"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gold/60 mb-2 sm:mb-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-white/85 text-xs sm:text-sm leading-snug sm:leading-relaxed mb-3 sm:mb-6 line-clamp-5 sm:line-clamp-none flex-1">{item.text}</p>
              <div className="border-t border-white/10 pt-3 sm:pt-4 flex items-center gap-2 sm:gap-3 mt-auto">
                <div className="w-10 h-10 bg-gold/30 rounded-full flex items-center justify-center shrink-0 ring-1 ring-gold/40">
                  <span className="text-gold font-bold text-sm">{item.name[0]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-xs sm:text-sm truncate">{item.name}</p>
                  <p className="text-gold/80 text-[10px] sm:text-xs truncate">{item.location} · {item.service}</p>
                </div>
                <div className="ml-auto flex gap-0.5 shrink-0">
                  {[...Array(5)].map((_, star) => (
                    <svg key={star} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold fill-gold shrink-0" viewBox="0 0 24 24">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, tFooter, tContact, settings] = await Promise.all([
    getTranslations({ locale, namespace: "hero" }),
    getTranslations({ locale, namespace: "footer" }),
    getTranslations({ locale, namespace: "contact" }),
    getSettings(),
  ]);
  const contactPath = locale === "es" ? "/contacto" : `/${locale}${locale === "ca" ? "/contacte" : "/contact"}`;

  const checkItems = [
    locale === "es" ? "Presupuesto 100% gratuito y sin compromiso" : locale === "ca" ? "Pressupost 100% gratuït i sense compromís" : "100% free, no-obligation quote",
    locale === "es" ? "Respuesta en menos de 24 horas" : locale === "ca" ? "Resposta en menys de 24 hores" : "Response within 24 hours",
    locale === "es" ? "Equipo propio, sin subcontratas" : locale === "ca" ? "Equip propi, sense subcontractes" : "In-house team, no subcontractors",
    locale === "es" ? "Mejor precio garantizado del mercado" : locale === "ca" ? "Millor preu garantit del mercat" : "Best market price guaranteed",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[62vh] sm:min-h-[78vh] md:min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={settings.heroImageUrl}
            alt="Construcción en Barcelona"
            className="h-full w-full min-h-full min-w-full object-cover md:scale-105"
            style={{ objectPosition: settings.heroImagePosition }}
            fetchPriority="high"
          />
          {/*
            Mobile: classic left-heavy fade. Desktop: extend navy farther right so the strip
            does not read as empty / disconnected at the edges.
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/78 via-45% to-navy/45 md:from-navy/92 md:via-navy/84 md:via-[52%] md:to-navy/68 lg:via-[58%] lg:to-navy/62 xl:to-navy/58" />
        </div>
        <div className="container-custom relative z-10 w-full py-12 sm:py-16 md:py-24">
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-[40rem]">
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-3 sm:mb-6">
              <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse shrink-0" />
              <span className="text-gold text-xs sm:text-sm font-semibold">Barcelona · Cataluña</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-3 sm:mb-5 text-balance">
              {t("headline")}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-5 sm:mb-8 leading-relaxed max-w-xl">
              {t("subheadline")}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Link href={`#lead-form`} className="btn-gold flex-1 min-w-[140px] justify-center sm:flex-initial sm:px-8 sm:py-4">
                {t("cta")}
              </Link>
              <Link
                href={locale === "es" ? "/servicios" : `/${locale}${locale === "ca" ? "/serveis" : "/services"}`}
                className="btn-outline flex-1 min-w-[140px] justify-center sm:flex-initial sm:px-8 sm:py-4"
              >
                {t("ctaSecondary")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            {/* Stats — one row on mobile */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
              {[
                { value: "+500", label: locale === "ca" ? "Projectes" : locale === "en" ? "Projects" : "Proyectos" },
                { value: "15+", label: locale === "ca" ? "Anys exp." : locale === "en" ? "Years exp." : "Años exp." },
                { value: "100%", label: locale === "ca" ? "Satisfacció" : locale === "en" ? "Satisfaction" : "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-xl sm:text-3xl font-extrabold text-gold tabular-nums">{stat.value}</div>
                  <div className="text-gray-400 text-[10px] sm:text-sm mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Services preview — before "why choose us" */}
      <ServicesPreview locale={locale as Locale} />

      {/* USPs */}
      <UspsSection />

      <HowWeWorkSection />

      {/* Lead Form Section */}
      <section id="lead-form" className="section-y bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-start">
            <div className="lg:sticky lg:top-20">
              <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-4">
                {locale === "ca" ? "Pressupost gratuït" : locale === "en" ? "Free Quote" : "Presupuesto Gratuito"}
              </span>
              <h2 className="section-title">
                {locale === "es" ? t("cta") : locale === "ca" ? "Sol·licita el teu Pressupost Gratis" : "Get Your Free Quote"}
              </h2>
              <p className="section-subtitle">
                {locale === "es" ? "Respuesta garantizada en menos de 24 horas. Sin compromiso." : locale === "ca" ? "Resposta garantida en menys de 24 hores. Sense compromís." : "Response guaranteed in under 24 hours. No obligation."}
              </p>
              <ul className="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-3 lg:grid-cols-1 lg:gap-y-3">
                {checkItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3 text-gray-700 font-medium text-xs sm:text-sm leading-snug">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 sm:mt-10 p-3 sm:p-5 bg-navy/5 rounded-xl sm:rounded-2xl border border-navy/10">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span className="text-sm font-semibold text-navy">{tFooter("callUs")}</span>
                </div>
                <a
                  href={`tel:${tFooter("phone")}`}
                  className="text-base font-bold text-navy hover:text-gold transition-colors duration-150 tracking-wide"
                >
                  {tFooter("phone")}
                </a>
                <p className="text-xs text-gray-500 mt-1">{tContact("hours")}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-8">
              <LeadForm locale={locale as Locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <section className="py-10 sm:py-14 md:py-16 bg-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-64 h-64 bg-navy rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute left-0 bottom-0 w-48 h-48 bg-navy rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom text-center relative">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-navy mb-2 sm:mb-3 px-1">
            {locale === "es" ? "¿Listo para empezar tu proyecto?" : locale === "ca" ? "Preparat per començar el teu projecte?" : "Ready to start your project?"}
          </h2>
          <p className="text-navy/70 mb-5 sm:mb-8 text-sm sm:text-lg max-sm:line-clamp-2">
            {locale === "es" ? "Presupuesto gratuito en 24 horas · Sin compromiso" : locale === "ca" ? "Pressupost gratuït en 24 hores · Sense compromís" : "Free quote in 24 hours · No obligation"}
          </p>
          <Link href={contactPath} className="btn-navy text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-4">
            {locale === "es" ? "Contactar ahora" : locale === "ca" ? "Contactar ara" : "Contact us now"}
          </Link>
        </div>
      </section>
    </>
  );
}
