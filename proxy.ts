import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { CATEGORY_PATH_ROWS } from "./lib/category-path-config";
import { SERVICE_CATEGORIES } from "./lib/services-data";
import { locales, defaultLocale } from "./i18n";

const serviceCategoryPathnames = Object.fromEntries(
  CATEGORY_PATH_ROWS.map((row) => [
    `/servicios/${row.slugEs}`,
    {
      es: `/servicios/${row.slugEs}`,
      ca: `/serveis/${row.slugCa}`,
      en: `/services/${row.slugEn}`,
    },
  ])
);

const serviceDetailPathnames = Object.fromEntries(
  CATEGORY_PATH_ROWS.flatMap((row) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.id === row.categoryId);
    if (!cat) return [];
    return cat.services.map((svc) => [
      `/servicios/${row.slugEs}/${svc.id}`,
      {
        es: `/servicios/${row.slugEs}/${svc.id}`,
        ca: `/serveis/${row.slugCa}/${svc.id}`,
        en: `/services/${row.slugEn}/${svc.id}`,
      },
    ]);
  })
);

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/servicios": {
      es: "/servicios",
      ca: "/serveis",
      en: "/services",
    },
    ...serviceCategoryPathnames,
    ...serviceDetailPathnames,
    "/contacto": {
      es: "/contacto",
      ca: "/contacte",
      en: "/contact",
    },
    "/sobre-nosotros": {
      es: "/sobre-nosotros",
      ca: "/sobre-nosaltres",
      en: "/about",
    },
  },
});

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
