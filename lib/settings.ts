import { prisma } from "./db";

export const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80";

export const DEFAULT_HERO_POSITION = "50% 50%";

export interface SiteSettingsData {
  heroImageUrl: string;
  heroImagePosition: string;
}

export async function getSettings(): Promise<SiteSettingsData> {
  const row = await prisma.siteSettings.findFirst();
  return {
    heroImageUrl: row?.heroImageUrl || DEFAULT_HERO_IMAGE,
    heroImagePosition: row?.heroImagePosition || DEFAULT_HERO_POSITION,
  };
}
