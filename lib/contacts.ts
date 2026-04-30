import { prisma } from "./db";

export interface SiteContactsData {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string | null;
  instagram: string | null;
}

export const CONTACT_DEFAULTS: SiteContactsData = {
  phone: "+34 600 000 000",
  whatsapp: "34600000000",
  email: "info@obradirecta.cat",
  address: "Barcelona, Cataluña, España",
  facebook: null,
  instagram: null,
};

export async function getContacts(): Promise<SiteContactsData> {
  const row = await prisma.siteContacts.findFirst();
  if (!row) return CONTACT_DEFAULTS;
  return {
    phone: row.phone || CONTACT_DEFAULTS.phone,
    whatsapp: row.whatsapp || CONTACT_DEFAULTS.whatsapp,
    email: row.email || CONTACT_DEFAULTS.email,
    address: row.address || CONTACT_DEFAULTS.address,
    facebook: row.facebook || null,
    instagram: row.instagram || null,
  };
}
