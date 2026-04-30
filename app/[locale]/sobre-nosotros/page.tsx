import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoForPage("about", locale);
  if (!seo.title) {
    const titles: Record<string, string> = {
      es: "Sobre Nosotros | ObraDirecta - Constructora Barcelona",
      ca: "Sobre Nosaltres | ObraDirecta - Constructora Barcelona",
      en: "About Us | ObraDirecta - Construction Company Barcelona",
    };
    seo.title = titles[locale] || titles.es;
  }
  return seo;
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const contactPath =
    locale === "es" ? "/contacto" : locale === "ca" ? "/ca/contacte" : "/en/contact";

  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
        </svg>
      ),
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      titleEs: "Excelencia",
      titleCa: "Excel·lència",
      titleEn: "Excellence",
      descEs: "Nos comprometemos con los más altos estándares en cada proyecto.",
      descCa: "Ens comprometem amb els estàndards més alts en cada projecte.",
      descEn: "We commit to the highest standards on every project.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      titleEs: "Transparencia",
      titleCa: "Transparència",
      titleEn: "Transparency",
      descEs: "Presupuestos claros, sin costes ocultos y comunicación constante.",
      descCa: "Pressupostos clars, sense costos ocults i comunicació constant.",
      descEn: "Clear quotes, no hidden costs, and constant communication.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      titleEs: "Eficiencia",
      titleCa: "Eficiència",
      titleEn: "Efficiency",
      descEs: "Trabajamos sin subcontratas para garantizar el máximo control y velocidad.",
      descCa: "Treballem sense subcontractes per garantir el màxim control i velocitat.",
      descEn: "We work without subcontractors to guarantee maximum control and speed.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.249 2.249 0 0017.5 15.28l-.149-.11a2.25 2.25 0 00-1.879-.363l-.116.031a2.25 2.25 0 01-2.16-.483l-.215-.198a2.25 2.25 0 00-1.56-.623H9.75a2.25 2.25 0 00-2.25 2.25v.916m11.498-8.507l.011.004" />
        </svg>
      ),
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      titleEs: "Sostenibilidad",
      titleCa: "Sostenibilitat",
      titleEn: "Sustainability",
      descEs: "Comprometidos con prácticas de construcción sostenibles y respetuosas con el medio ambiente.",
      descCa: "Compromesos amb pràctiques de construcció sostenibles i respectuoses amb el medi ambient.",
      descEn: "Committed to sustainable and environmentally responsible construction practices.",
    },
  ];

  const stats = [
    { value: "+500", label: locale === "ca" ? "Projectes completats" : locale === "en" ? "Projects completed" : "Proyectos completados" },
    { value: "15+", label: locale === "ca" ? "Anys d'experiència" : locale === "en" ? "Years of experience" : "Años de experiencia" },
    { value: "50+", label: locale === "ca" ? "Professionals" : locale === "en" ? "Professionals" : "Profesionales" },
    { value: "100%", label: locale === "ca" ? "Satisfacció client" : locale === "en" ? "Client satisfaction" : "Satisfacción cliente" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container-custom text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-5">
            {locale === "ca" ? "La nostra empresa" : locale === "en" ? "Our Company" : "Nuestra Empresa"}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t("title")}</h1>
          <p className="text-gold text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-5">
                {locale === "ca" ? "La nostra història" : locale === "en" ? "Our Story" : "Nuestra Historia"}
              </span>
              <h2 className="text-3xl font-bold text-navy mb-6">
                {locale === "es" ? "Construyendo confianza desde hace 15 años" : locale === "ca" ? "Construint confiança des de fa 15 anys" : "Building trust for 15 years"}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{t("story")}</p>
              <p className="text-gray-600 leading-relaxed">{t("mission")}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all duration-200">
                  <div className="text-3xl font-extrabold text-gold mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full mb-4">
              {locale === "ca" ? "El nostre compromís" : locale === "en" ? "Our Commitment" : "Nuestro Compromiso"}
            </span>
            <h2 className="section-title">{t("values")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gold/30 transition-all duration-200 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${v.iconBg} ${v.iconColor} group-hover:scale-105 transition-transform duration-200`}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-navy mb-2 text-base">
                  {locale === "ca" ? v.titleCa : locale === "en" ? v.titleEn : v.titleEs}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {locale === "ca" ? v.descCa : locale === "en" ? v.descEn : v.descEs}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold rounded-full translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="container-custom text-center relative">
          <h2 className="text-3xl font-bold text-white mb-3">
            {locale === "es" ? "¿Tienes un proyecto en mente?" : locale === "ca" ? "Tens un projecte en ment?" : "Got a project in mind?"}
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            {locale === "es" ? "Contacta con nosotros y te responderemos en 24 horas." : locale === "ca" ? "Contacta amb nosaltres i et respondrem en 24 hores." : "Contact us and we'll reply within 24 hours."}
          </p>
          <Link href={contactPath} className="btn-gold text-base px-10 py-4">
            {locale === "es" ? "Solicitar presupuesto gratis" : locale === "ca" ? "Sol·licitar pressupost gratis" : "Get a free quote"}
          </Link>
        </div>
      </section>
    </>
  );
}
