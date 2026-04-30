import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [pages, global] = await Promise.all([
    prisma.seoPage.findMany({ orderBy: [{ slug: "asc" }, { locale: "asc" }] }),
    prisma.seoGlobal.findFirst(),
  ]);

  return NextResponse.json({ pages, global });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (body.type === "page") {
    const { slug, locale = "es", ...data } = body.data;
    const page = await prisma.seoPage.upsert({
      where: { slug_locale: { slug, locale } },
      update: data,
      create: { slug, locale, ...data },
    });
    return NextResponse.json(page);
  }

  if (body.type === "global") {
    const existing = await prisma.seoGlobal.findFirst();
    const global = existing
      ? await prisma.seoGlobal.update({ where: { id: existing.id }, data: body.data })
      : await prisma.seoGlobal.create({ data: body.data });
    return NextResponse.json(global);
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
