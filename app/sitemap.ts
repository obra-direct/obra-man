import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { CATEGORY_PATH_ROWS } from "@/lib/category-path-config";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://obradirecta.cat";

/** Queries DB at request time so builds do not require a live Postgres socket. */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seoGlobal = await prisma.seoGlobal.findFirst();

  if (seoGlobal && !seoGlobal.sitemapEnabled) {
    return [];
  }

  const now = new Date();

  const categoryPathsEs = CATEGORY_PATH_ROWS.map((row) => ({
    url: `${BASE_URL}/servicios/${row.slugEs}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const categoryPathsCa = CATEGORY_PATH_ROWS.map((row) => ({
    url: `${BASE_URL}/ca/serveis/${row.slugCa}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const categoryPathsEn = CATEGORY_PATH_ROWS.map((row) => ({
    url: `${BASE_URL}/en/services/${row.slugEn}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const servicePathsEs = CATEGORY_PATH_ROWS.flatMap((row) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.id === row.categoryId);
    if (!cat) return [];
    return cat.services.map((svc) => ({
      url: `${BASE_URL}/servicios/${row.slugEs}/${svc.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  });

  const servicePathsCa = CATEGORY_PATH_ROWS.flatMap((row) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.id === row.categoryId);
    if (!cat) return [];
    return cat.services.map((svc) => ({
      url: `${BASE_URL}/ca/serveis/${row.slugCa}/${svc.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.68,
    }));
  });

  const servicePathsEn = CATEGORY_PATH_ROWS.flatMap((row) => {
    const cat = SERVICE_CATEGORIES.find((c) => c.id === row.categoryId);
    if (!cat) return [];
    return cat.services.map((svc) => ({
      url: `${BASE_URL}/en/services/${row.slugEn}/${svc.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.68,
    }));
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    // Spanish (default, no prefix)
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/servicios`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...categoryPathsEs,
    ...servicePathsEs,
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/sobre-nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // Catalan
    { url: `${BASE_URL}/ca`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/ca/serveis`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...categoryPathsCa,
    ...servicePathsCa,
    { url: `${BASE_URL}/ca/contacte`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ca/sobre-nosaltres`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // English
    { url: `${BASE_URL}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/en/services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...categoryPathsEn,
    ...servicePathsEn,
    { url: `${BASE_URL}/en/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/en/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  return staticRoutes;
}
