import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import LeadForm from "@/components/public/LeadForm";
import { getSeoForPage } from "@/lib/seo";
import { getContacts } from "@/lib/contacts";
import type { Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoForPage("contact", locale);
  if (!seo.title) {
    const titles: Record<string, string> = {
      es: "Contacto | ObraDirecta - Constructora en Barcelona",
      ca: "Contacte | ObraDirecta - Constructora a Barcelona",
      en: "Contact | ObraDirecta - Construction Company Barcelona",
    };
    seo.title = titles[locale] || titles.es;
  }
  return seo;
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [t, contacts] = await Promise.all([
    getTranslations({ locale, namespace: "contact" }),
    getContacts(),
  ]);

  const contactCards = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      labelEs: "Teléfono",
      labelCa: "Telèfon",
      labelEn: "Phone",
      valueNode: (
        <a href={`tel:${contacts.phone.replace(/\s/g, "")}`} className="text-gray-600 hover:text-gold transition-colors text-sm">
          {contacts.phone}
        </a>
      ),
      note: locale === "ca" ? "Dl–Dv 8:00–18:00" : locale === "en" ? "Mon–Fri 8:00–18:00" : "Lun–Vie 8:00–18:00",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      labelEs: "Email",
      labelCa: "Correu electrònic",
      labelEn: "Email",
      valueNode: (
        <a href={`mailto:${contacts.email}`} className="text-gray-600 hover:text-gold transition-colors text-sm">
          {contacts.email}
        </a>
      ),
      note: locale === "ca" ? "Resposta en 24h" : locale === "en" ? "Reply within 24h" : "Respuesta en 24h",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      labelEs: "Dirección",
      labelCa: "Adreça",
      labelEn: "Address",
      valueNode: <p className="text-gray-600 text-sm">{contacts.address}</p>,
      note: "Barcelona, Cataluña",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      labelEs: "Horario",
      labelCa: "Horari",
      labelEn: "Hours",
      valueNode: <p className="text-gray-600 text-sm">{t("hours")}</p>,
      note: locale === "ca" ? "Caps de setmana tancat" : locale === "en" ? "Weekends closed" : "Fines de semana cerrado",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-5">
            {locale === "ca" ? "Contacta'ns" : locale === "en" ? "Get in touch" : "Contáctanos"}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t("title")}</h1>
          <p className="text-gold text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                {locale === "es" ? "Información de contacto" : locale === "ca" ? "Informació de contacte" : "Contact information"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactCards.map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-200 group">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 text-gold mb-3 group-hover:bg-gold/20 transition-colors">
                      {card.icon}
                    </div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      {locale === "ca" ? card.labelCa : locale === "en" ? card.labelEn : card.labelEs}
                    </p>
                    {card.valueNode}
                    {card.note && <p className="text-xs text-gray-400 mt-1">{card.note}</p>}
                  </div>
                ))}
              </div>

              {/* Social links row */}
              {(contacts.facebook || contacts.instagram) && (
                <div className="flex items-center gap-3 mb-8">
                  {contacts.facebook && (
                    <a
                      href={contacts.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-400 text-gray-500 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </a>
                  )}
                  {contacts.instagram && (
                    <a
                      href={contacts.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex items-center gap-2 bg-white border border-gray-200 hover:border-pink-400 text-gray-500 hover:text-pink-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      Instagram
                    </a>
                  )}
                </div>
              )}

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-green-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">
                    {locale === "ca" ? "Escriu-nos per WhatsApp" : locale === "en" ? "Message us on WhatsApp" : "Escríbenos por WhatsApp"}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {locale === "ca" ? "Resposta ràpida garantida" : locale === "en" ? "Fast response guaranteed" : "Respuesta rápida garantizada"}
                  </p>
                </div>
                <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-green-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">
                {locale === "es" ? "Envíanos un mensaje" : locale === "ca" ? "Envia'ns un missatge" : "Send us a message"}
              </h2>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
                <LeadForm locale={locale as Locale} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
