import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import SeoManager from "@/components/admin/SeoManager";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "SEO" };

const PAGE_SLUGS = [
  { slug: "home", labelEs: "Inicio" },
  { slug: "services", labelEs: "Servicios" },
  { slug: "services-demolition", labelEs: "Demolición y Derribo" },
  { slug: "contact", labelEs: "Contacto" },
  { slug: "about", labelEs: "Sobre Nosotros" },
];

export default async function SeoAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  const [seoPages, seoGlobal] = await Promise.all([
    prisma.seoPage.findMany(),
    prisma.seoGlobal.findFirst(),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pagesMap: Record<string, any> = {};
  seoPages.forEach((p) => {
    pagesMap[p.slug] = p;
  });

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">SEO</h1>
          <p className="text-gray-500 text-sm">
            Gestiona los metadatos SEO de cada página y la configuración global.
          </p>
        </div>
        <SeoManager
          pageSlugs={PAGE_SLUGS}
          initialPages={seoPages}
          initialGlobal={seoGlobal}
        />
      </div>
    </AdminShell>
  );
}
