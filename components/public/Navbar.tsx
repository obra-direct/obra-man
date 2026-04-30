"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n";

const LOCALE_LABELS: Record<string, string> = {
  es: "ES",
  ca: "CA",
  en: "EN",
};

const SERVICE_PATH: Record<string, string> = {
  es: "/servicios",
  ca: "/serveis",
  en: "/services",
};

const CONTACT_PATH: Record<string, string> = {
  es: "/contacto",
  ca: "/contacte",
  en: "/contact",
};

const ABOUT_PATH: Record<string, string> = {
  es: "/sobre-nosotros",
  ca: "/sobre-nosaltres",
  en: "/about",
};

function getLocalizedPath(pathname: string, currentLocale: string, targetLocale: string): string {
  let strippedPath = pathname;
  if (currentLocale !== "es") {
    strippedPath = pathname.replace(`/${currentLocale}`, "") || "/";
  }

  const segments = [
    { es: "/servicios", ca: "/serveis", en: "/services" },
    { es: "/contacto", ca: "/contacte", en: "/contact" },
    { es: "/sobre-nosotros", ca: "/sobre-nosaltres", en: "/about" },
  ];

  let mapped = strippedPath;
  for (const seg of segments) {
    const values = Object.values(seg) as string[];
    for (const val of values) {
      if (strippedPath === val || strippedPath.startsWith(val + "/")) {
        mapped = (seg as Record<string, string>)[targetLocale];
        break;
      }
    }
  }

  if (targetLocale === "es") return mapped;
  return `/${targetLocale}${mapped}`;
}

export default function Navbar({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const servicePath = locale === "es" ? SERVICE_PATH.es : `/${locale}${SERVICE_PATH[locale]}`;
  const contactPath = locale === "es" ? CONTACT_PATH.es : `/${locale}${CONTACT_PATH[locale]}`;
  const aboutPath = locale === "es" ? ABOUT_PATH.es : `/${locale}${ABOUT_PATH[locale]}`;
  const homePath = locale === "es" ? "/" : `/${locale}`;

  const navLinks = [
    { href: homePath, label: t("home") },
    { href: servicePath, label: t("services") },
    { href: aboutPath, label: t("about") },
    { href: contactPath, label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href === homePath) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`bg-navy sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-2xl border-b border-white/10" : "shadow-lg"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href={homePath} className="flex items-center gap-2.5 shrink-0">
              <div className="w-12 h-7 md:w-14 md:h-8 bg-gold rounded-md flex items-center justify-center p-1 md:p-1.5 shrink-0">
                <Image
                  src="/logo.png"
                  alt="ObraDirecta logo"
                  width={28}
                  height={28}
                  className="brightness-0 scale-90 md:scale-100"
                  priority
                />
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-gold font-bold text-base md:text-xl tracking-tight">OBRA</span>
                <span className="text-white font-bold text-base md:text-xl tracking-tight">DIRECTA</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-gold bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side: locale switcher + CTA */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-1">
                {(["es", "ca", "en"] as Locale[]).map((loc) => (
                  <Link
                    key={loc}
                    href={getLocalizedPath(pathname, locale, loc)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-all duration-200 ${
                      locale === loc
                        ? "bg-gold text-navy shadow-sm"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {LOCALE_LABELS[loc]}
                  </Link>
                ))}
              </div>

              <Link href={contactPath} className="btn-gold text-sm py-2 px-5">
                {t("getQuote")}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-14 left-0 right-0 z-40 md:hidden bg-navy border-b border-white/10 shadow-2xl transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="container-custom py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-white/10 text-gold"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-white/10 mt-3 pt-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                {(["es", "ca", "en"] as Locale[]).map((loc) => (
                  <Link
                    key={loc}
                    href={getLocalizedPath(pathname, locale, loc)}
                    onClick={() => setMenuOpen(false)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                      locale === loc ? "bg-gold text-navy" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {LOCALE_LABELS[loc]}
                  </Link>
                ))}
              </div>

              <Link
                href={contactPath}
                onClick={() => setMenuOpen(false)}
                className="btn-gold flex-1 justify-center text-sm py-3"
              >
                {t("getQuote")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
