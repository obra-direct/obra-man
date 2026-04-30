import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const SPANISH_PHONE_REGEX = /^(\+34|0034|34)?[6789]\d{8}$/;

const LeadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(SPANISH_PHONE_REGEX),
  service: z.string().min(1),
  message: z.string().optional(),
  language: z.string().default("es"),
  gdpr: z.boolean().refine((v) => v === true, { message: "GDPR consent required" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = LeadSchema.parse(body);

    await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        service: data.service,
        message: data.message || null,
        language: data.language,
        status: "new",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: err.issues }, { status: 400 });
    }
    console.error("Lead creation error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
