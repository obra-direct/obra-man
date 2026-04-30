"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const NAV_ITEMS_ES = [
  { href: "/admin/dashboard", label: "Dashboard",   icon: "📊" },
  { href: "/admin/leads",     label: "Leads",        icon: "📋" },
  { href: "/admin/services",  label: "Servicios",    icon: "🔨" },
  { href: "/admin/contacts",  label: "Contactos",    icon: "📞" },
  { href: "/admin/appearance",label: "Apariencia",   icon: "🖼️" },
  { href: "/admin/seo",       label: "SEO",          icon: "🔍" },
];

const NAV_ITEMS_EN = [
  { href: "/admin/dashboard", label: "Dashboard",   icon: "📊" },
  { href: "/admin/leads",     label: "Leads",        icon: "📋" },
  { href: "/admin/services",  label: "Services",     icon: "🔨" },
  { href: "/admin/contacts",  label: "Contacts",     icon: "📞" },
  { href: "/admin/appearance",label: "Appearance",   icon: "🖼️" },
  { href: "/admin/seo",       label: "SEO",          icon: "🔍" },
];

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    const saved = getCookie("admin_lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  function toggleLang() {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    setCookie("admin_lang", next);
    router.refresh();
  }

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.push("/admin");
  }

  const NAV_ITEMS = lang === "en" ? NAV_ITEMS_EN : NAV_ITEMS_ES;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-navy-light">
          <Link href="/admin/dashboard" className="flex items-center gap-1">
            <span className="text-gold font-bold text-xl">OBRA</span>
            <span className="text-white font-bold text-xl">DIRECTA</span>
          </Link>
          <p className="text-gray-400 text-xs mt-1">
            {lang === "en" ? "Administration Panel" : "Panel de Administración"}
          </p>
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
        <div className="p-4 border-t border-navy-light space-y-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="w-full flex items-center gap-2 px-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            title={lang === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
          >
            <span className="text-base">{lang === "en" ? "🇬🇧" : "🇪🇸"}</span>
            <span className="text-gray-300 text-xs font-medium flex-1 text-left">
              {lang === "en" ? "EN - Switch to ES" : "ES - Cambiar a EN"}
            </span>
            <span className="text-gray-500 text-xs">⇄</span>
          </button>
          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="w-full text-left text-gray-400 hover:text-white text-sm px-2 py-2 flex items-center gap-2 transition-colors"
          >
            <span>🚪</span>
            <span>{lang === "en" ? "Sign out" : "Cerrar sesión"}</span>
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
