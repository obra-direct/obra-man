import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import SeoManager from "@/components/admin/SeoManager";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "SEO" };

const PAGE_SLUGS = [
  { slug: "home",                labelEs: "Inicio",               labelEn: "Home" },
  { slug: "services",            labelEs: "Servicios",            labelEn: "Services" },
  { slug: "services-demolition", labelEs: "Demolición y Derribo", labelEn: "Demolition" },
  { slug: "contact",             labelEs: "Contacto",             labelEn: "Contact" },
  { slug: "about",               labelEs: "Sobre Nosotros",       labelEn: "About Us" },
];

/** Hardcoded fallback values that the public pages show when no DB record exists.
 *  Populated here so the admin form always shows something meaningful to edit. */
const DEFAULT_SEO: Record<string, Record<string, { title: string; metaDescription?: string; h1?: string }>> = {
  home: {
    es: {
      title: "ObraDirecta — Constructora en Barcelona | Mejor Precio Garantizado",
      metaDescription:
        "Empresa constructora en Barcelona. +500 proyectos en Cataluña. Mejor precio garantizado, entrega rápida, calidad certificada. Presupuesto gratis en 24h.",
      h1: "Constructoras de Confianza en Barcelona",
    },
    ca: {
      title: "ObraDirecta — Constructora a Barcelona | Millor Preu Garantit",
      metaDescription:
        "Empresa constructora a Barcelona. +500 projectes a Catalunya. Millor preu garantit, entrega ràpida, qualitat certificada. Pressupost gratis en 24h.",
      h1: "Constructores de Confiança a Barcelona",
    },
    en: {
      title: "ObraDirecta — Construction Company Barcelona | Best Price Guaranteed",
      metaDescription:
        "Construction company in Barcelona. +500 projects in Catalonia. Best price guaranteed, fast delivery, certified quality. Free quote in 24h.",
      h1: "Trusted Construction Company in Barcelona",
    },
  },
  services: {
    es: {
      title: "Servicios de Construcción en Barcelona | ObraDirecta",
      metaDescription: "Más de 60 servicios de construcción y reforma en Barcelona y Cataluña.",
      h1: "Nuestros Servicios",
    },
    ca: {
      title: "Serveis de Construcció a Barcelona | ObraDirecta",
      metaDescription: "Més de 60 serveis de construcció i reforma a Barcelona i Catalunya.",
      h1: "Els Nostres Serveis",
    },
    en: {
      title: "Construction Services in Barcelona | ObraDirecta",
      metaDescription: "More than 60 construction and renovation services in Barcelona and Catalonia.",
      h1: "Our Services",
    },
  },
  "services-demolition": {
    es: { title: "Demolición y Derribo en Barcelona | ObraDirecta", h1: "Demolición y Derribo" },
    ca: { title: "Demolició i Enderroc a Barcelona | ObraDirecta", h1: "Demolició i Enderroc" },
    en: { title: "Demolition Services in Barcelona | ObraDirecta", h1: "Demolition Services" },
  },
  contact: {
    es: {
      title: "Contacto | ObraDirecta — Constructora en Barcelona",
      metaDescription: "Contacta con ObraDirecta. Presupuesto gratis en 24 horas.",
      h1: "Contacto",
    },
    ca: {
      title: "Contacte | ObraDirecta — Constructora a Barcelona",
      metaDescription: "Contacta amb ObraDirecta. Pressupost gratuït en 24 hores.",
      h1: "Contacte",
    },
    en: {
      title: "Contact | ObraDirecta — Construction Company Barcelona",
      metaDescription: "Contact ObraDirecta. Free quote in 24 hours.",
      h1: "Contact",
    },
  },
  about: {
    es: {
      title: "Sobre Nosotros | ObraDirecta — Constructora Barcelona",
      metaDescription: "Más de 15 años de experiencia en construcción en Barcelona y Cataluña.",
      h1: "Sobre Nosotros",
    },
    ca: {
      title: "Sobre Nosaltres | ObraDirecta — Constructora Barcelona",
      metaDescription: "Més de 15 anys d'experiència en construcció a Barcelona i Catalunya.",
      h1: "Sobre Nosaltres",
    },
    en: {
      title: "About Us | ObraDirecta — Construction Company Barcelona",
      metaDescription: "Over 15 years of construction experience in Barcelona and Catalonia.",
      h1: "About Us",
    },
  },
};

export default async function SeoAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  const cookieStore = await cookies();
  const adminLang = (cookieStore.get("admin_lang")?.value === "en" ? "en" : "es") as "es" | "en";

  const [seoPages, seoGlobal] = await Promise.all([
    prisma.seoPage.findMany(),
    prisma.seoGlobal.findFirst(),
  ]);

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">SEO</h1>
          <p className="text-gray-500 text-sm">
            {adminLang === "en"
              ? "Manage SEO metadata for each page and language. Each language is a separate URL for Google."
              : "Gestiona los metadatos SEO de cada página e idioma. Cada idioma es una URL separada para Google."}
          </p>
        </div>
        <SeoManager
          pageSlugs={PAGE_SLUGS}
          initialPages={seoPages}
          initialGlobal={seoGlobal}
          defaultSeo={DEFAULT_SEO}
          adminLang={adminLang}
        />
      </div>
    </AdminShell>
  );
}
