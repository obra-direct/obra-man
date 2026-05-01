import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/seo";
import { getContacts } from "@/lib/contacts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoForPage("privacy-policy", locale);
  if (!seo.title) {
    const titles: Record<string, string> = {
      es: "Política de Privacidad | ObraDirecta",
      ca: "Política de Privacitat | ObraDirecta",
      en: "Privacy Policy | ObraDirecta",
    };
    seo.title = titles[locale] || titles.es;
  }
  if (!seo.description) {
    const descs: Record<string, string> = {
      es: "Conoce cómo ObraDirecta trata y protege tus datos personales conforme al RGPD y la LOPD-GDD.",
      ca: "Coneix com ObraDirecta tracta i protegeix les teves dades personals d'acord amb el RGPD i la LOPDGDD.",
      en: "Learn how ObraDirecta processes and protects your personal data in accordance with the GDPR.",
    };
    seo.description = descs[locale] || descs.es;
  }
  return { ...seo, robots: "noindex, follow" };
}

const content = {
  es: {
    heroTitle: "Política de Privacidad",
    heroSubtitle: "Última actualización: enero de 2025",
    intro:
      "En ObraDirecta nos comprometemos a proteger tu privacidad y tratar tus datos personales con total transparencia, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPD-GDD).",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        body: `<p>El responsable del tratamiento de sus datos personales es:</p>
<ul>
  <li><strong>Denominación social:</strong> ObraDirecta</li>
  <li><strong>Domicilio:</strong> Barcelona, Cataluña, España</li>
  <li><strong>Correo electrónico:</strong> info@obradirecta.cat</li>
  <li><strong>Teléfono:</strong> +34 600 000 000</li>
</ul>`,
      },
      {
        title: "2. Datos que recopilamos",
        body: `<p>Recopilamos los siguientes datos personales:</p>
<ul>
  <li><strong>Formulario de contacto / solicitud de presupuesto:</strong> nombre completo, número de teléfono, correo electrónico, tipo de servicio solicitado y mensaje.</li>
  <li><strong>Datos de navegación:</strong> dirección IP, páginas visitadas, tiempo de permanencia y datos del dispositivo (a través de Google Analytics 4, si está habilitado).</li>
  <li><strong>Cookies:</strong> según se detalla en nuestra Política de Cookies.</li>
</ul>
<p>No recopilamos categorías especiales de datos (salud, ideología, origen racial, etc.) ni datos de menores de 14 años. Si eres menor de edad, no debes facilitarnos tus datos sin el consentimiento de tu tutor legal.</p>`,
      },
      {
        title: "3. Finalidades y bases jurídicas del tratamiento",
        body: `<table>
  <thead><tr><th>Finalidad</th><th>Base jurídica</th></tr></thead>
  <tbody>
    <tr><td>Responder a tu consulta y enviarte un presupuesto</td><td>Ejecución de un precontrato / tu consentimiento (art. 6.1.b y 6.1.a RGPD)</td></tr>
    <tr><td>Seguimiento comercial de tu solicitud</td><td>Interés legítimo del responsable (art. 6.1.f RGPD)</td></tr>
    <tr><td>Análisis estadístico del tráfico web</td><td>Consentimiento prestado mediante la aceptación de cookies (art. 6.1.a RGPD)</td></tr>
    <tr><td>Cumplimiento de obligaciones legales (contabilidad, fiscalidad)</td><td>Obligación legal (art. 6.1.c RGPD)</td></tr>
  </tbody>
</table>`,
      },
      {
        title: "4. Conservación de los datos",
        body: `<ul>
  <li><strong>Datos del formulario de contacto:</strong> se conservarán durante el tiempo necesario para atender tu solicitud y, en su caso, durante el período de prescripción de las acciones legales derivadas (5 años).</li>
  <li><strong>Datos de analítica web:</strong> según la configuración de Google Analytics (máximo 26 meses).</li>
  <li><strong>Datos de facturación y contratos:</strong> mínimo 5 años conforme a la Ley General Tributaria.</li>
</ul>
<p>Transcurridos estos plazos, los datos serán suprimidos o anonimizados.</p>`,
      },
      {
        title: "5. Destinatarios y transferencias internacionales",
        body: `<p>Tus datos no se ceden ni venden a terceros, salvo en los siguientes supuestos:</p>
<ul>
  <li><strong>Proveedores de servicios tecnológicos</strong> que tratan datos por cuenta nuestra (hosting, Google Analytics, plataforma de correo electrónico), vinculados mediante contrato de encargado del tratamiento.</li>
  <li><strong>Administraciones públicas</strong> cuando la ley lo exija.</li>
</ul>
<p>Google LLC (Google Analytics) puede realizar transferencias internacionales de datos a EE.UU., bajo las garantías adecuadas del art. 46 RGPD (cláusulas contractuales tipo). Puedes consultar la política de privacidad de Google en <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</p>`,
      },
      {
        title: "6. Tus derechos",
        body: `<p>Puedes ejercer en cualquier momento los siguientes derechos enviando un correo a <strong>info@obradirecta.cat</strong> con asunto "Protección de datos" y acreditando tu identidad (copia del DNI):</p>
<ul>
  <li><strong>Acceso:</strong> conocer qué datos tuyos tratamos.</li>
  <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
  <li><strong>Supresión:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios.</li>
  <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
  <li><strong>Limitación:</strong> solicitar la restricción del tratamiento en determinadas circunstancias.</li>
  <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y de uso común.</li>
  <li><strong>Retirada del consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
</ul>
<p>Si consideras que tus derechos no han sido atendidos, puedes presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a> — C/ Jorge Juan, 6, 28001 Madrid.</p>`,
      },
      {
        title: "7. Seguridad",
        body: `<p>Adoptamos las medidas técnicas y organizativas necesarias para garantizar la seguridad de tus datos y evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos y los riesgos a que estén expuestos.</p>`,
      },
      {
        title: "8. Cookies",
        body: `<p>Nuestra web utiliza cookies propias (necesarias para el funcionamiento) y cookies de terceros (Google Analytics para análisis estadístico). Puedes gestionar tus preferencias de cookies en cualquier momento a través del banner de cookies o de la configuración de tu navegador.</p>`,
      },
      {
        title: "9. Cambios en esta política",
        body: `<p>Nos reservamos el derecho a actualizar esta Política de Privacidad para adaptarla a novedades legislativas o jurisprudenciales. Te recomendamos revisarla periódicamente. La fecha de última actualización aparece al inicio de este documento.</p>`,
      },
    ],
  },
  ca: {
    heroTitle: "Política de Privacitat",
    heroSubtitle: "Darrera actualització: gener de 2025",
    intro:
      "A ObraDirecta ens comprometem a protegir la teva privacitat i tractar les teves dades personals amb total transparència, d'acord amb el Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018 de Protecció de Dades Personals i Garantia dels Drets Digitals (LOPDGDD).",
    sections: [
      {
        title: "1. Responsable del tractament",
        body: `<p>El responsable del tractament de les teves dades personals és:</p>
<ul>
  <li><strong>Denominació social:</strong> ObraDirecta</li>
  <li><strong>Domicili:</strong> Barcelona, Catalunya, Espanya</li>
  <li><strong>Correu electrònic:</strong> info@obradirecta.cat</li>
  <li><strong>Telèfon:</strong> +34 600 000 000</li>
</ul>`,
      },
      {
        title: "2. Dades que recopilem",
        body: `<p>Recopilem les següents dades personals:</p>
<ul>
  <li><strong>Formulari de contacte / sol·licitud de pressupost:</strong> nom complet, número de telèfon, correu electrònic, tipus de servei sol·licitat i missatge.</li>
  <li><strong>Dades de navegació:</strong> adreça IP, pàgines visitades, temps de permanència i dades del dispositiu (mitjançant Google Analytics 4, si està habilitat).</li>
  <li><strong>Cookies:</strong> tal com es detalla a la nostra Política de Cookies.</li>
</ul>
<p>No recopilem categories especials de dades ni dades de menors de 14 anys.</p>`,
      },
      {
        title: "3. Finalitats i bases jurídiques del tractament",
        body: `<table>
  <thead><tr><th>Finalitat</th><th>Base jurídica</th></tr></thead>
  <tbody>
    <tr><td>Respondre a la teva consulta i enviar-te un pressupost</td><td>Execució d'un precontracte / el teu consentiment (art. 6.1.b i 6.1.a RGPD)</td></tr>
    <tr><td>Seguiment comercial de la teva sol·licitud</td><td>Interès legítim del responsable (art. 6.1.f RGPD)</td></tr>
    <tr><td>Anàlisi estadística del trànsit web</td><td>Consentiment prestat mitjançant l'acceptació de cookies (art. 6.1.a RGPD)</td></tr>
    <tr><td>Compliment d'obligacions legals</td><td>Obligació legal (art. 6.1.c RGPD)</td></tr>
  </tbody>
</table>`,
      },
      {
        title: "4. Conservació de les dades",
        body: `<ul>
  <li><strong>Dades del formulari de contacte:</strong> es conservaran durant el temps necessari per atendre la teva sol·licitud i, si escau, durant el període de prescripció de les accions legals (5 anys).</li>
  <li><strong>Dades d'analítica web:</strong> segons la configuració de Google Analytics (màxim 26 mesos).</li>
  <li><strong>Dades de facturació:</strong> mínim 5 anys conforme a la normativa tributària.</li>
</ul>`,
      },
      {
        title: "5. Destinataris i transferències internacionals",
        body: `<p>Les teves dades no es cedeixen ni es venen a tercers, excepte als proveïdors tecnològics vinculats per contracte d'encarregat del tractament i a les administracions públiques quan la llei ho exigeixi.</p>
<p>Google LLC (Google Analytics) pot realitzar transferències internacionals de dades als EUA sota garanties adequades (clàusules contractuals tipus).</p>`,
      },
      {
        title: "6. Els teus drets",
        body: `<p>Pots exercir en qualsevol moment els drets d'accés, rectificació, supressió, oposició, limitació i portabilitat enviant un correu a <strong>info@obradirecta.cat</strong> amb l'assumpte "Protecció de dades".</p>
<p>Si consideres que els teus drets no han estat atesos, pots presentar una reclamació davant l'<strong>Agència Espanyola de Protecció de Dades (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.</p>`,
      },
      {
        title: "7. Seguretat",
        body: `<p>Adoptem les mesures tècniques i organitzatives necessàries per garantir la seguretat de les teves dades i evitar-ne l'alteració, pèrdua o accés no autoritzat.</p>`,
      },
      {
        title: "8. Cookies",
        body: `<p>El nostre lloc web utilitza cookies pròpies (necessàries per al funcionament) i cookies de tercers (Google Analytics). Pots gestionar les teves preferències de cookies en qualsevol moment a través del bàner de cookies o de la configuració del teu navegador.</p>`,
      },
      {
        title: "9. Canvis en aquesta política",
        body: `<p>Ens reservem el dret d'actualitzar aquesta Política de Privacitat per adaptar-la a les novetats legislatives. Et recomanem revisar-la periòdicament.</p>`,
      },
    ],
  },
  en: {
    heroTitle: "Privacy Policy",
    heroSubtitle: "Last updated: January 2025",
    intro:
      "At ObraDirecta we are committed to protecting your privacy and processing your personal data with full transparency, in accordance with Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 on Personal Data Protection (LOPD-GDD).",
    sections: [
      {
        title: "1. Data Controller",
        body: `<p>The data controller for your personal data is:</p>
<ul>
  <li><strong>Company name:</strong> ObraDirecta</li>
  <li><strong>Address:</strong> Barcelona, Catalonia, Spain</li>
  <li><strong>Email:</strong> info@obradirecta.cat</li>
  <li><strong>Phone:</strong> +34 600 000 000</li>
</ul>`,
      },
      {
        title: "2. Data We Collect",
        body: `<p>We collect the following personal data:</p>
<ul>
  <li><strong>Contact / quote request form:</strong> full name, phone number, email address, type of service requested, and message.</li>
  <li><strong>Browsing data:</strong> IP address, pages visited, time spent, and device data (via Google Analytics 4, if enabled).</li>
  <li><strong>Cookies:</strong> as described in our Cookie Policy.</li>
</ul>
<p>We do not collect special categories of data or data from persons under 14 years of age.</p>`,
      },
      {
        title: "3. Purposes and Legal Bases",
        body: `<table>
  <thead><tr><th>Purpose</th><th>Legal basis</th></tr></thead>
  <tbody>
    <tr><td>Responding to your inquiry and sending a quote</td><td>Pre-contractual performance / your consent (Art. 6.1.b and 6.1.a GDPR)</td></tr>
    <tr><td>Commercial follow-up of your request</td><td>Legitimate interests of the controller (Art. 6.1.f GDPR)</td></tr>
    <tr><td>Statistical analysis of web traffic</td><td>Consent given through cookie acceptance (Art. 6.1.a GDPR)</td></tr>
    <tr><td>Compliance with legal obligations</td><td>Legal obligation (Art. 6.1.c GDPR)</td></tr>
  </tbody>
</table>`,
      },
      {
        title: "4. Data Retention",
        body: `<ul>
  <li><strong>Contact form data:</strong> retained as long as needed to handle your request and for the applicable limitation period (5 years).</li>
  <li><strong>Web analytics data:</strong> per Google Analytics settings (maximum 26 months).</li>
  <li><strong>Invoicing / contract data:</strong> minimum 5 years under Spanish tax law.</li>
</ul>`,
      },
      {
        title: "5. Recipients and International Transfers",
        body: `<p>Your data is not sold or shared with third parties, except with technology service providers bound by a data processing agreement and public authorities when required by law.</p>
<p>Google LLC (Google Analytics) may transfer data to the USA under appropriate safeguards (standard contractual clauses).</p>`,
      },
      {
        title: "6. Your Rights",
        body: `<p>You may exercise the following rights at any time by emailing <strong>info@obradirecta.cat</strong> with the subject "Data Protection" and a copy of your ID:</p>
<ul>
  <li><strong>Access</strong> — know what data we hold about you.</li>
  <li><strong>Rectification</strong> — correct inaccurate or incomplete data.</li>
  <li><strong>Erasure</strong> — request deletion when data is no longer necessary.</li>
  <li><strong>Objection</strong> — object to processing based on legitimate interests.</li>
  <li><strong>Restriction</strong> — restrict processing in certain circumstances.</li>
  <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
  <li><strong>Withdraw consent</strong> — at any time, without affecting prior processing.</li>
</ul>
<p>You also have the right to lodge a complaint with the <strong>Spanish Data Protection Agency (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.</p>`,
      },
      {
        title: "7. Security",
        body: `<p>We implement appropriate technical and organisational measures to ensure the security of your personal data and prevent unauthorised access, loss, or alteration.</p>`,
      },
      {
        title: "8. Cookies",
        body: `<p>Our website uses first-party cookies (necessary for operation) and third-party cookies (Google Analytics for statistical analysis). You can manage your cookie preferences at any time through the cookie banner or your browser settings.</p>`,
      },
      {
        title: "9. Changes to This Policy",
        body: `<p>We reserve the right to update this Privacy Policy to reflect legislative changes. We recommend reviewing it periodically. The date of the last update appears at the top of this document.</p>`,
      },
    ],
  },
};

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === "ca" || locale === "en" ? locale : "es") as keyof typeof content;
  const c = content[lang];
  const contacts = await getContacts();

  const filledContent = {
    ...c,
    sections: c.sections.map((s) => ({
      ...s,
      body: s.body
        .replace(/info@obradirecta\.cat/g, contacts.email)
        .replace(/\+34 600 000 000/g, contacts.phone),
    })),
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {filledContent.heroTitle}
          </h1>
          <p className="text-gray-400 text-sm">{filledContent.heroSubtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
              <p className="text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
                {filledContent.intro}
              </p>

              <div className="space-y-10">
                {filledContent.sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div
                      className="prose-legal text-gray-600 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
