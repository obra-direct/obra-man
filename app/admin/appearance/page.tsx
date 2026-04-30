import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import AdminShell from "@/components/admin/AdminShell";
import AppearanceManager from "@/components/admin/AppearanceManager";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Apariencia" };

export default async function AppearancePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  const settings = await getSettings();

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Apariencia</h1>
          <p className="text-gray-500 text-sm">
            Personaliza la imagen de fondo del hero principal de la página de inicio.
          </p>
        </div>
        <AppearanceManager
          initialHeroImageUrl={settings.heroImageUrl}
          initialHeroImagePosition={settings.heroImagePosition}
        />
      </div>
    </AdminShell>
  );
}
