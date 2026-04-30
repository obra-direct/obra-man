import type { Locale } from "@/i18n";
import { CATEGORY_PATH_ROWS } from "@/lib/category-path-config";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/services-data";

export type CategoryRouteDef = {
  categoryId: string;
  slugEs: string;
  slugCa: string;
  slugEn: string;
};

export const CATEGORY_ROUTE_DEFS: CategoryRouteDef[] = CATEGORY_PATH_ROWS;

export function getCategoryRouteDefByCategoryId(
  categoryId: string
): CategoryRouteDef | undefined {
  return CATEGORY_ROUTE_DEFS.find((d) => d.categoryId === categoryId);
}

/** After middleware rewrite `params.categorySlug` is canonical (`slugEs`). */
export function getCategoryRouteDefBySlug(segment: string): CategoryRouteDef | undefined {
  return CATEGORY_ROUTE_DEFS.find(
    (d) => d.slugEs === segment || d.slugCa === segment || d.slugEn === segment
  );
}

export function getCategoryFromPathSlug(segment: string): ServiceCategory | undefined {
  const def = getCategoryRouteDefBySlug(segment);
  if (!def) return undefined;
  return SERVICE_CATEGORIES.find((c) => c.id === def.categoryId);
}

export function seoSlugForCategory(categoryId: string): string {
  if (categoryId === "demolicion-derribo") return "services-demolition";
  return `services-${categoryId}`;
}

export function categoryListingHref(locale: Locale, route: CategoryRouteDef): string {
  const seg = locale === "es" ? route.slugEs : locale === "ca" ? route.slugCa : route.slugEn;
  if (locale === "es") return `/servicios/${seg}`;
  if (locale === "ca") return `/ca/serveis/${seg}`;
  return `/en/services/${seg}`;
}

export function servicesIndexHref(locale: Locale): string {
  if (locale === "es") return "/servicios";
  if (locale === "ca") return "/ca/serveis";
  return "/en/services";
}

export function serviceHref(
  locale: Locale,
  categoryId: string,
  serviceId: string
): string {
  const route = getCategoryRouteDefByCategoryId(categoryId);
  if (!route) return servicesIndexHref(locale);
  const catSlug =
    locale === "ca" ? route.slugCa : locale === "en" ? route.slugEn : route.slugEs;
  if (locale === "es") return `/servicios/${catSlug}/${serviceId}`;
  if (locale === "ca") return `/ca/serveis/${catSlug}/${serviceId}`;
  return `/en/services/${catSlug}/${serviceId}`;
}

export function seoSlugForService(serviceId: string): string {
  return `service-${serviceId}`;
}
