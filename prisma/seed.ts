import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const existing = await prisma.adminUser.findUnique({ where: { username: "admin" } });
  if (!existing) {
    const passwordHash = await bcrypt.hash("admin123", 12);
    await prisma.adminUser.create({
      data: { username: "admin", passwordHash },
    });
    console.log("✅ Admin user created: admin / admin123");
  } else {
    console.log("ℹ️  Admin user already exists");
  }

  // Default SeoGlobal
  const seoGlobal = await prisma.seoGlobal.findFirst();
  if (!seoGlobal) {
    await prisma.seoGlobal.create({
      data: {
        ga4Id: null,
        schemaName: "ObraDirecta",
        schemaAddress: "Barcelona, Cataluña, España",
        schemaPhone: "+34600000000",
        schemaLat: "41.3851",
        schemaLng: "2.1734",
        schemaHours: "Mo-Fr 08:00-18:00",
        schemaPriceRange: "€€",
        sitemapEnabled: true,
      },
    });
    console.log("✅ Default SeoGlobal created");
  }

  // Default SeoPages
  const defaultPages = [
    {
      slug: "home",
      title: "ObraDirecta — Constructora en Barcelona | Mejor Precio Garantizado",
      metaDescription:
        "Empresa constructora en Barcelona. +500 proyectos en Cataluña. Mejor precio garantizado, entrega rápida, calidad certificada. Presupuesto gratis en 24h.",
      h1: "Constructoras de Confianza en Barcelona",
      robots: "index, follow",
    },
    {
      slug: "services",
      title: "Servicios de Construcción en Barcelona | ObraDirecta",
      metaDescription:
        "Más de 60 servicios de construcción y reforma en Barcelona y Cataluña.",
      h1: "Nuestros Servicios",
      robots: "index, follow",
    },
    {
      slug: "contact",
      title: "Contacto | ObraDirecta — Constructora en Barcelona",
      metaDescription: "Contacta con ObraDirecta. Presupuesto gratis en 24 horas.",
      h1: "Contacto",
      robots: "index, follow",
    },
    {
      slug: "about",
      title: "Sobre Nosotros | ObraDirecta — Constructora Barcelona",
      metaDescription: "Más de 15 años de experiencia en construcción en Barcelona y Cataluña.",
      h1: "Sobre Nosotros",
      robots: "index, follow",
    },
  ];

  for (const page of defaultPages) {
    const locale = "es";
    await prisma.seoPage.upsert({
      where: { slug_locale: { slug: page.slug, locale } },
      update: {},
      create: { ...page, locale },
    });
  }
  console.log("✅ Default SEO pages seeded");
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
