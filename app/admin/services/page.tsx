import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import ServicesManager from "@/components/admin/ServicesManager";
import { SERVICE_CATEGORIES } from "@/lib/services-data";
import { seoSlugForService } from "@/lib/service-category-routes";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Servicios" };

export default async function AdminServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  // Seed services if empty
  const count = await prisma.service.count();
  if (count === 0) {
    let sortOrder = 0;
    for (const cat of SERVICE_CATEGORIES) {
      for (const svc of cat.services) {
        await prisma.service.upsert({
          where: { slug: svc.id },
          update: {},
          create: {
            slug: svc.id,
            category: cat.id,
            nameEs: svc.nameEs,
            nameCa: svc.nameCa,
            nameEn: svc.nameEn,
            descEs: svc.descEs,
            descCa: svc.descCa,
            descEn: svc.descEn,
            visible: true,
            sortOrder: sortOrder++,
          },
        });
      }
    }
  }

  const serviceSeoSlugs = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((svc) => seoSlugForService(svc.id))
  );

  const [services, seoPages] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.seoPage.findMany({
      where: { slug: { in: serviceSeoSlugs } },
    }),
  ]);

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Servicios</h1>
          <p className="text-gray-500 text-sm">Gestiona la visibilidad, descripción y SEO de los servicios.</p>
        </div>
        <ServicesManager initialServices={services} initialSeoPages={seoPages} />
      </div>
    </AdminShell>
  );
}
