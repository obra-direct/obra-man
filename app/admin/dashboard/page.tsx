import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Lead } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  const [totalLeads, newLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "new" } }),
  ]);
  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: "📋", color: "bg-blue-50 text-blue-700" },
    { label: "Leads Nuevos", value: newLeads, icon: "🔔", color: "bg-green-50 text-green-700" },
    { label: "Contactados", value: totalLeads - newLeads, icon: "✅", color: "bg-yellow-50 text-yellow-700" },
  ];

  return (
    <AdminShell>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 text-sm mb-8">Bienvenido al panel de administración de ObraDirecta.</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`text-3xl rounded-lg p-3 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Leads Recientes</h2>
            <Link href="/admin/leads" className="text-sm text-gold hover:text-gold-dark font-medium">
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Nombre</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Teléfono</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Servicio</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Fecha</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      No hay leads todavía
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead: Lead) => (
                    <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{lead.name}</td>
                      <td className="px-6 py-3 text-gray-600">{lead.phone}</td>
                      <td className="px-6 py-3 text-gray-600">{lead.service}</td>
                      <td className="px-6 py-3 text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString("es-ES")}
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          lead.status === "new"
                            ? "bg-green-100 text-green-700"
                            : lead.status === "contacted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {lead.status === "new" ? "Nuevo" : lead.status === "contacted" ? "Contactado" : lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
