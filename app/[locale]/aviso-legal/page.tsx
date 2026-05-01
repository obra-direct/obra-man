import type { Metadata } from "next";
import { getSeoForPage } from "@/lib/seo";
import { getContacts } from "@/lib/contacts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoForPage("legal-notice", locale);
  if (!seo.title) {
    const titles: Record<string, string> = {
      es: "Aviso Legal | ObraDirecta",
      ca: "Avís Legal | ObraDirecta",
      en: "Legal Notice | ObraDirecta",
    };
    seo.title = titles[locale] || titles.es;
  }
  if (!seo.description) {
    const descs: Record<string, string> = {
      es: "Información legal sobre el titular del sitio web ObraDirecta, conforme a la Ley de Servicios de la Sociedad de la Información (LSSI-CE).",
      ca: "Informació legal sobre el titular del lloc web ObraDirecta, d'acord amb la Llei de Serveis de la Societat de la Informació (LSSI-CE).",
      en: "Legal information about ObraDirecta's website in accordance with Spain's Information Society Services Act (LSSI-CE).",
    };
    seo.description = descs[locale] || descs.es;
  }
  return { ...seo, robots: "noindex, follow" };
}

const content = {
  es: {
    heroTitle: "Aviso Legal",
    heroSubtitle: "Información legal del titular del sitio web",
    intro:
      "En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilita la siguiente información sobre el titular del sitio web.",
    sections: [
      {
        title: "1. Datos identificativos del titular",
        body: `<ul>
  <li><strong>Denominación social:</strong> ObraDirecta</li>
  <li><strong>Domicilio social:</strong> Barcelona, Cataluña, España</li>
  <li><strong>Correo electrónico:</strong> info@obradirecta.cat</li>
  <li><strong>Teléfono:</strong> +34 600 000 000</li>
  <li><strong>Sitio web:</strong> https://obradirecta.cat</li>
</ul>`,
      },
      {
        title: "2. Objeto y ámbito de aplicación",
        body: `<p>El presente Aviso Legal regula el acceso, navegación y uso del sitio web <strong>obradirecta.cat</strong> (en adelante, "el Sitio"), del que es titular ObraDirecta.</p>
<p>El acceso al Sitio implica la aceptación plena y sin reservas de las presentes condiciones. Si no estás de acuerdo, te rogamos que abandones el Sitio.</p>`,
      },
      {
        title: "3. Condiciones de uso",
        body: `<p>El usuario se compromete a utilizar el Sitio de conformidad con la ley, la moral, las buenas costumbres y el orden público, y en particular a:</p>
<ul>
  <li>No utilizar el Sitio con fines ilícitos o contrarios a las presentes condiciones.</li>
  <li>No introducir, almacenar ni difundir contenidos que sean ilícitos, difamatorios, obscenos o que vulneren derechos de terceros.</li>
  <li>No transmitir virus informáticos o cualquier otro código diseñado para interrumpir, destruir o limitar la funcionalidad del Sitio.</li>
  <li>No realizar acciones que puedan dañar, inutilizar o deteriorar el Sitio o impedir su normal uso por parte de otros usuarios.</li>
</ul>
<p>ObraDirecta se reserva el derecho a denegar o retirar el acceso al Sitio a usuarios que incumplan estas condiciones, sin necesidad de previo aviso.</p>`,
      },
      {
        title: "4. Propiedad intelectual e industrial",
        body: `<p>Todos los contenidos del Sitio —incluyendo, sin carácter limitativo, textos, fotografías, ilustraciones, logotipos, iconos, imágenes, código fuente y diseño gráfico— son titularidad de ObraDirecta o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual e industrial vigentes.</p>
<p>Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de cualquier elemento del Sitio sin la autorización previa y por escrito de ObraDirecta, salvo que dicha utilización tenga carácter privado y no comercial.</p>
<p>Las marcas, nombres comerciales o signos distintivos son titularidad de ObraDirecta o de terceros, y no podrán ser utilizados sin su autorización expresa.</p>`,
      },
      {
        title: "5. Exclusión de garantías y limitación de responsabilidad",
        body: `<p>ObraDirecta no garantiza la disponibilidad y continuidad del Sitio ni que esté libre de errores. En la medida en que lo permita la legislación aplicable, ObraDirecta excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que puedan derivarse de:</p>
<ul>
  <li>La falta de disponibilidad o accesibilidad al Sitio.</li>
  <li>La presencia de virus u otros elementos en los contenidos que puedan producir alteraciones en el sistema informático del usuario.</li>
  <li>El uso ilícito, negligente o fraudulento del Sitio.</li>
  <li>La inexactitud de los contenidos informativos del Sitio.</li>
</ul>
<p>ObraDirecta no se hace responsable de los contenidos de terceros a los que pueda redirigir el Sitio mediante hipervínculos.</p>`,
      },
      {
        title: "6. Política de enlaces",
        body: `<p>El Sitio puede contener enlaces a páginas web de terceros. ObraDirecta no tiene control sobre dichas páginas, por lo que no asume ninguna responsabilidad por sus contenidos, ni por el uso que pudieran hacer de los datos personales del usuario.</p>
<p>Si deseas establecer un enlace desde tu sitio web hacia el Sitio, deberás hacerlo únicamente a la página de inicio y de manera que no induzca a error o confusión al usuario. Queda prohibido el uso de deep linking, framing o cualquier técnica que reproduzca el Sitio dentro de otra página web sin autorización expresa.</p>`,
      },
      {
        title: "7. Legislación aplicable y jurisdicción",
        body: `<p>Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso del Sitio, las partes se someten a los Juzgados y Tribunales de la ciudad de <strong>Barcelona</strong>, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, salvo que la normativa vigente establezca otro fuero imperativo.</p>`,
      },
      {
        title: "8. Modificaciones",
        body: `<p>ObraDirecta se reserva el derecho a modificar en cualquier momento el presente Aviso Legal. Cualquier cambio tendrá efecto desde el momento de su publicación en el Sitio. El uso continuado del Sitio tras dichos cambios implicará la aceptación de las nuevas condiciones.</p>`,
      },
    ],
  },
  ca: {
    heroTitle: "Avís Legal",
    heroSubtitle: "Informació legal del titular del lloc web",
    intro:
      "En compliment de l'article 10 de la Llei 34/2002, d'11 de juliol, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), es facilita la informació següent sobre el titular del lloc web.",
    sections: [
      {
        title: "1. Dades identificatives del titular",
        body: `<ul>
  <li><strong>Denominació social:</strong> ObraDirecta</li>
  <li><strong>Domicili social:</strong> Barcelona, Catalunya, Espanya</li>
  <li><strong>Correu electrònic:</strong> info@obradirecta.cat</li>
  <li><strong>Telèfon:</strong> +34 600 000 000</li>
  <li><strong>Lloc web:</strong> https://obradirecta.cat</li>
</ul>`,
      },
      {
        title: "2. Objecte i àmbit d'aplicació",
        body: `<p>El present Avís Legal regula l'accés, la navegació i l'ús del lloc web <strong>obradirecta.cat</strong> (d'ara en endavant, "el Lloc"), del qual és titular ObraDirecta.</p>
<p>L'accés al Lloc implica l'acceptació plena i sense reserves de les presents condicions.</p>`,
      },
      {
        title: "3. Condicions d'ús",
        body: `<p>L'usuari es compromet a utilitzar el Lloc de conformitat amb la llei, la moral i l'ordre públic, i en particular a no introduir, emmagatzemar ni difondre continguts il·lícits, ni transmetre virus informàtics ni realitzar accions que puguin danyar el Lloc.</p>
<p>ObraDirecta es reserva el dret de denegar l'accés als usuaris que incompleixin aquestes condicions.</p>`,
      },
      {
        title: "4. Propietat intel·lectual i industrial",
        body: `<p>Tots els continguts del Lloc —incloent textos, fotografies, logotips, codi font i disseny gràfic— són titularitat d'ObraDirecta o de tercers que n'han autoritzat l'ús, i estan protegits per la legislació de propietat intel·lectual i industrial vigent.</p>
<p>Queda expressament prohibida la reproducció, distribució o comunicació pública de qualsevol element del Lloc sense l'autorització prèvia i per escrit d'ObraDirecta.</p>`,
      },
      {
        title: "5. Exclusió de garanties i limitació de responsabilitat",
        body: `<p>ObraDirecta no garanteix la disponibilitat i continuïtat del Lloc ni que estigui lliure d'errors, i exclou qualsevol responsabilitat per danys derivats de la falta de disponibilitat, presència de virus o inexactitud dels continguts.</p>`,
      },
      {
        title: "6. Política d'enllaços",
        body: `<p>El Lloc pot contenir enllaços a pàgines de tercers. ObraDirecta no assumeix responsabilitat pels seus continguts. Per establir un enllaç al Lloc, cal fer-ho únicament a la pàgina d'inici i sense induir a confusió.</p>`,
      },
      {
        title: "7. Legislació aplicable i jurisdicció",
        body: `<p>Les presents condicions es regeixen per la legislació espanyola. Per a la resolució de qualsevol controvèrsia, les parts se sotmeten als Jutjats i Tribunals de la ciutat de <strong>Barcelona</strong>.</p>`,
      },
      {
        title: "8. Modificacions",
        body: `<p>ObraDirecta es reserva el dret de modificar en qualsevol moment el present Avís Legal. Qualsevol canvi tindrà efecte des del moment de la seva publicació al Lloc.</p>`,
      },
    ],
  },
  en: {
    heroTitle: "Legal Notice",
    heroSubtitle: "Legal information about the website owner",
    intro:
      "In compliance with Article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the following information is provided about the owner of this website.",
    sections: [
      {
        title: "1. Company Identification",
        body: `<ul>
  <li><strong>Company name:</strong> ObraDirecta</li>
  <li><strong>Registered address:</strong> Barcelona, Catalonia, Spain</li>
  <li><strong>Email:</strong> info@obradirecta.cat</li>
  <li><strong>Phone:</strong> +34 600 000 000</li>
  <li><strong>Website:</strong> https://obradirecta.cat</li>
</ul>`,
      },
      {
        title: "2. Purpose and Scope",
        body: `<p>This Legal Notice governs access to and use of the website <strong>obradirecta.cat</strong> (the "Site"), owned by ObraDirecta.</p>
<p>Accessing the Site implies full and unconditional acceptance of these terms. If you disagree, please leave the Site.</p>`,
      },
      {
        title: "3. Terms of Use",
        body: `<p>Users agree to use the Site in accordance with applicable law, good faith and public order, and in particular not to introduce illegal or harmful content, transmit viruses, or perform any action that could damage the Site or impair its normal use by other users.</p>
<p>ObraDirecta reserves the right to deny access to users who breach these terms without prior notice.</p>`,
      },
      {
        title: "4. Intellectual and Industrial Property",
        body: `<p>All Site content — including texts, photographs, logos, source code and graphic design — is owned by ObraDirecta or licensed from third parties, and is protected by intellectual and industrial property law.</p>
<p>Reproduction, distribution or public communication of any Site element without prior written authorisation from ObraDirecta is strictly prohibited.</p>`,
      },
      {
        title: "5. Disclaimer",
        body: `<p>ObraDirecta does not guarantee the availability or error-free operation of the Site, and to the extent permitted by law, excludes any liability for damages arising from unavailability, viruses, or inaccurate content on the Site.</p>
<p>ObraDirecta is not responsible for third-party content linked from the Site.</p>`,
      },
      {
        title: "6. Linking Policy",
        body: `<p>The Site may contain links to third-party websites. ObraDirecta accepts no responsibility for their content. Links to the Site must point only to the homepage and must not cause confusion or misrepresentation.</p>`,
      },
      {
        title: "7. Governing Law and Jurisdiction",
        body: `<p>These terms are governed by Spanish law. Any disputes arising from the use of the Site shall be submitted to the courts of <strong>Barcelona</strong>, unless mandatory law provides otherwise.</p>`,
      },
      {
        title: "8. Modifications",
        body: `<p>ObraDirecta reserves the right to modify this Legal Notice at any time. Changes take effect upon publication on the Site. Continued use of the Site after such changes constitutes acceptance of the updated terms.</p>`,
      },
    ],
  },
};

export default async function LegalNoticePage({
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
