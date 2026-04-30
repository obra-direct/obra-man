import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceCard from "@/components/public/ServiceCard";
import LeadForm from "@/components/public/LeadForm";
import { locales, type Locale } from "@/i18n";
import {
  CATEGORY_ROUTE_DEFS,
  categoryListingHref,
  getCategoryFromPathSlug,
  seoSlugForCategory,
  servicesIndexHref,
} from "@/lib/service-category-routes";
import { getCategoryName, SERVICE_CATEGORIES } from "@/lib/services-data";
import { getSeoForPage } from "@/lib/seo";

const DEMOL_PARAGRAPH: Record<string, string> = {
  es: "Especializados en trabajos de demolición y derribo en Barcelona y toda Cataluña. Contamos con maquinaria de última generación y un equipo certificado para garantizar la máxima seguridad en cada proyecto.",
  ca: "Especialitzats en treballs de demolició i enderroc a Barcelona i tota Catalunya. Comptem amb maquinària d'última generació i un equip certificat per garantir la màxima seguretat en cada projecte.",
  en: "Specialists in demolition and structural removal works in Barcelona and all of Catalonia. We have state-of-the-art machinery and a certified team to guarantee maximum safety on every project.",
};

function genericCategoryIntro(categoryName: string, count: number, locale: string): string {
  if (locale === "ca") {
    return `Professionals amb experiència en ${categoryName}: oferim ${count} serveis a Barcelona i tota Catalunya. Sol·licita pressupost sense compromís.`;
  }
  if (locale === "en") {
    return `Experienced team for ${categoryName}: we deliver ${count} services across Barcelona and Catalonia. Request a free, no‑obligation quote.`;
  }
  return `Profesionales con amplia trayectoria en ${categoryName}: ofrecemos ${count} servicios en Barcelona y toda Cataluña. Solicita presupuesto sin compromiso.`;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    CATEGORY_ROUTE_DEFS.map((r) => ({
      locale,
      categorySlug: r.slugEs,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { locale, categorySlug } = await params;
  const category = getCategoryFromPathSlug(categorySlug);
  if (!category) return {};

  const seoSlug = seoSlugForCategory(category.id);
  const seo = await getSeoForPage(seoSlug, locale);

  if (!seo.title) {
    const suffix =
      locale === "ca"
        ? "a Barcelona"
        : locale === "en"
          ? "in Barcelona"
          : "en Barcelona";
    const name =
      locale === "ca"
        ? category.nameCa
        : locale === "en"
          ? category.nameEn
          : category.nameEs;
    seo.title = `${name} ${suffix} | ObraDirecta`;
  }

  return seo;
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const { locale, categorySlug } = await params;
  const category = getCategoryFromPathSlug(categorySlug);
  if (!category) notFound();

  const categoryName = getCategoryName(category, locale as Locale);
  const servicesPath = servicesIndexHref(locale as Locale);

  const intro =
    category.id === "demolicion-derribo"
      ? DEMOL_PARAGRAPH[locale] ?? DEMOL_PARAGRAPH.es
      : genericCategoryIntro(categoryName, category.services.length, locale);

  const quoteTitle =
    locale === "ca"
      ? `Sol·licita pressupost · ${categoryName}`
      : locale === "en"
        ? `Request a quote · ${categoryName}`
        : `Solicita presupuesto · ${categoryName}`;

  return (
    <>
      <section className="bg-navy py-16">
        <div className="container-custom">
          <nav className="text-sm text-gray-400 mb-6">
            <Link href={servicesPath} className="hover:text-gold transition-colors">
              {locale === "ca" ? "Serveis" : locale === "en" ? "Services" : "Servicios"}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-300">{categoryName}</span>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                {categoryName}
              </h1>
              <p className="text-gold">
                {locale === "ca"
                  ? `${category.services.length} serveis professionals`
                  : locale === "en"
                    ? `${category.services.length} professional services`
                    : `${category.services.length} servicios profesionales`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-3xl space-y-4">
            <p className="text-gray-700 text-lg leading-relaxed">{intro}</p>
          </div>
        </div>
      </section>

      <section className="pb-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.services.map((svc) => (
              <ServiceCard key={svc.id} service={svc} locale={locale as Locale} />
            ))}
          </div>
        </div>
      </section>

      <RelatedCategories locale={locale as Locale} currentCategoryId={category.id} />

      <section className="py-20 bg-white">
        <div className="container-custom max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="section-title">{quoteTitle}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <LeadForm locale={locale as Locale} presetCategoryId={category.id} />
          </div>
        </div>
      </section>
    </>
  );
}

function RelatedCategories({
  locale,
  currentCategoryId,
}: {
  locale: Locale;
  currentCategoryId: string;
}) {
  return (
    <section className="bg-gray-100 border-y border-gray-200 py-10">
      <div className="container-custom">
        <p className="text-sm font-semibold text-gray-600 mb-4">
          {locale === "ca"
            ? "Altres categories"
            : locale === "en"
              ? "Other categories"
              : "Otras categorías"}
        </p>
        <ul className="flex flex-wrap gap-3 justify-center md:justify-start">
          {CATEGORY_ROUTE_DEFS.filter((d) => d.categoryId !== currentCategoryId).map((d) => {
            const cat = SERVICE_CATEGORIES.find((c) => c.id === d.categoryId);
            const label =
              cat != null ? getCategoryName(cat, locale) : (d.slugEs ?? d.categoryId);
            return (
              <li key={d.categoryId}>
                <Link
                  href={categoryListingHref(locale, d)}
                  className="inline-block whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:border-gold hover:text-gold transition-colors"
                >
                  {cat?.icon ? `${cat.icon} ` : null}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
