"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/leads", label: "Leads", icon: "📋" },
  { href: "/admin/services", label: "Servicios", icon: "🔨" },
  { href: "/admin/contacts", label: "Contactos", icon: "📞" },
  { href: "/admin/appearance", label: "Apariencia", icon: "🖼️" },
  { href: "/admin/seo", label: "SEO", icon: "🔍" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-navy-light">
          <Link href="/admin/dashboard" className="flex items-center gap-1">
            <span className="text-gold font-bold text-xl">OBRA</span>
            <span className="text-white font-bold text-xl">DIRECTA</span>
          </Link>
          <p className="text-gray-400 text-xs mt-1">Panel de Administración</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-150 ${
                pathname === item.href
                  ? "bg-gold/20 text-gold border-r-2 border-gold"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-light">
          <button
            onClick={handleSignOut}
            className="w-full text-left text-gray-400 hover:text-white text-sm px-2 py-2 flex items-center gap-2 transition-colors"
          >
            <span>🚪</span>
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
