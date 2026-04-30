import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import LeadsTable from "@/components/admin/LeadsTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Leads" };

export default async function LeadsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Leads</h1>
            <p className="text-gray-500 text-sm">Gestiona todas las solicitudes de presupuesto.</p>
          </div>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-2">
            <span className="text-gold font-bold text-lg">{leads.length}</span>
            <span className="text-gray-600 text-sm ml-2">total</span>
          </div>
        </div>
        <LeadsTable initialLeads={leads} />
      </div>
    </AdminShell>
  );
}
