import { prisma } from "./db";
import type { Metadata } from "next";

export async function getSeoForPage(
  slug: string,
  locale: string = "es"
): Promise<Metadata> {
  const seoPage = await prisma.seoPage.findUnique({
    where: { slug_locale: { slug, locale } },
  });

  const title = seoPage?.title || undefined;
  const description = seoPage?.metaDescription || undefined;
  const robots = seoPage?.robots || "index, follow";
  const canonical = seoPage?.canonical || undefined;

  return {
    title,
    description,
    robots,
    openGraph: {
      title: seoPage?.ogTitle || title,
      description: seoPage?.ogDescription || description,
      locale,
      type: "website",
    },
    alternates: canonical ? { canonical } : undefined,
    other: seoPage?.focusKeyword
      ? { "focus-keyword": seoPage.focusKeyword }
      : undefined,
  };
}

export async function getSeoGlobal() {
  return prisma.seoGlobal.findFirst();
}

export async function getPageH1(slug: string, locale: string = "es"): Promise<string | null> {
  const page = await prisma.seoPage.findUnique({
    where: { slug_locale: { slug, locale } },
  });
  return page?.h1 || null;
}
