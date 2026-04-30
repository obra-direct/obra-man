import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n";
import type { SiteContactsData } from "@/lib/contacts";

interface FooterProps {
  locale: Locale;
  contacts: SiteContactsData;
}

export default function Footer({ locale, contacts }: FooterProps) {
  const t = useTranslations("footer");
  const nt = useTranslations("nav");

  const servicePath = locale === "es" ? "/servicios" : `/${locale}${locale === "ca" ? "/serveis" : "/services"}`;
  const contactPath = locale === "es" ? "/contacto" : `/${locale}${locale === "ca" ? "/contacte" : "/contact"}`;
  const aboutPath = locale === "es" ? "/sobre-nosotros" : `/${locale}${locale === "ca" ? "/sobre-nosaltres" : "/about"}`;

  const trustBadges = [
    {
      label: locale === "ca" ? "+500 Projectes" : locale === "en" ? "+500 Projects" : "+500 Proyectos",
      sub: locale === "ca" ? "completats" : locale === "en" ? "completed" : "completados",
    },
    {
      label: locale === "ca" ? "15+ Anys" : locale === "en" ? "15+ Years" : "15+ Años",
      sub: locale === "ca" ? "d'experiència" : locale === "en" ? "of experience" : "de experiencia",
    },
    {
      label: locale === "ca" ? "Qualitat" : locale === "en" ? "Certified" : "Calidad",
      sub: locale === "ca" ? "certificada" : locale === "en" ? "quality" : "certificada",
    },
  ];

  return (
    <footer className="bg-navy text-gray-300">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

      <div className="container-custom pt-8 sm:pt-10 pb-6 sm:pb-8">
        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-white/10">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="text-center px-0.5">
              <div className="text-sm sm:text-xl font-bold text-gold leading-tight">{badge.label}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight line-clamp-2">{badge.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-14 h-9 bg-gold rounded-md flex items-center justify-center p-1.5 shrink-0">
                <Image
                  src="/logo.png"
                  alt="ObraDirecta logo"
                  width={30}
                  height={30}
                  className="brightness-0"
                />
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-gold font-bold text-xl">OBRA</span>
                <span className="text-white font-bold text-xl">DIRECTA</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-5">
              {locale === "es" && "Empresa constructora de confianza en Barcelona. Más de 500 proyectos completados en Cataluña con la mejor calidad y precio del mercado."}
              {locale === "ca" && "Empresa constructora de confiança a Barcelona. Més de 500 projectes completats a Catalunya amb la millor qualitat i preu del mercat."}
              {locale === "en" && "Trusted construction company in Barcelona. Over 500 projects completed in Catalonia with the best quality and price on the market."}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 hover:text-green-300 hover:bg-green-500/20 transition-all duration-200 rounded-xl px-4 py-2 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>

              {contacts.facebook && (
                <a
                  href={contacts.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/30 text-gray-400 hover:text-blue-400 rounded-xl transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}

              {contacts.instagram && (
                <a
                  href={contacts.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center w-9 h-9 bg-white/5 hover:bg-pink-600/20 border border-white/10 hover:border-pink-500/30 text-gray-400 hover:text-pink-400 rounded-xl transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("links")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: servicePath, label: nt("services") },
                { href: aboutPath, label: nt("about") },
                { href: contactPath, label: nt("contact") },
                { href: "#", label: t("privacy") },
                { href: "#", label: t("legal") },
              ].map((item) => (
                <li key={item.href + item.label}>
                  <Link href={item.href} className="hover:text-gold transition-colors duration-200 flex items-center gap-1.5 group">
                    <svg className="w-3 h-3 text-gold/40 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-4">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {locale === "es" ? "Contacto" : locale === "ca" ? "Contacte" : "Contact"}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${contacts.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 hover:text-gold transition-colors duration-200 group">
                  <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-gold/10 flex items-center justify-center shrink-0 transition-colors">
                    <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="flex items-start gap-3 hover:text-gold transition-colors duration-200 group">
                  <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-gold/10 flex items-center justify-center shrink-0 transition-colors">
                    <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {contacts.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-400">{contacts.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-400">
                  {locale === "ca" ? "Dl–Dv: 8:00 – 18:00" : locale === "en" ? "Mon–Fri: 8:00 – 18:00" : "Lun–Vie: 8:00 – 18:00"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} ObraDirecta. {t("rights")}.</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gold/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Barcelona, Cataluña
          </span>
        </div>
      </div>
    </footer>
  );
}
