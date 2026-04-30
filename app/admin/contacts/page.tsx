import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import ContactsManager from "@/components/admin/ContactsManager";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contactos" };

export default async function ContactsAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  const raw = await prisma.siteContacts.findFirst();

  const contacts = {
    phone: raw?.phone ?? "",
    whatsapp: raw?.whatsapp ?? "",
    email: raw?.email ?? "",
    address: raw?.address ?? "",
    facebook: raw?.facebook ?? "",
    instagram: raw?.instagram ?? "",
  };

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Contactos del sitio</h1>
          <p className="text-gray-500 text-sm">
            Edita el teléfono, WhatsApp, email, dirección y redes sociales. Los cambios se reflejan en toda la web al instante.
          </p>
        </div>
        <ContactsManager initial={contacts} />
      </div>
    </AdminShell>
  );
}
