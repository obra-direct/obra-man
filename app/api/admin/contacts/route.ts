import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contacts = await prisma.siteContacts.findFirst();
  return NextResponse.json(contacts ?? {});
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  const existing = await prisma.siteContacts.findFirst();
  const contacts = existing
    ? await prisma.siteContacts.update({ where: { id: existing.id }, data })
    : await prisma.siteContacts.create({ data });

  return NextResponse.json(contacts);
}
