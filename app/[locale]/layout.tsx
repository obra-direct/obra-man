import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { locales, type Locale } from "@/i18n";
import { getSeoGlobal } from "@/lib/seo";
import { getContacts } from "@/lib/contacts";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import WhatsAppButton from "@/components/public/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const [seoGlobal, contacts] = await Promise.all([getSeoGlobal(), getContacts()]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: seoGlobal?.schemaName || "ObraDirecta",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressRegion: "Cataluña",
      addressCountry: "ES",
      streetAddress: seoGlobal?.schemaAddress || contacts.address,
    },
    telephone: seoGlobal?.schemaPhone || contacts.phone,
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoGlobal?.schemaLat || "41.3851",
      longitude: seoGlobal?.schemaLng || "2.1734",
    },
    openingHours: seoGlobal?.schemaHours || "Mo-Fr 08:00-18:00",
    priceRange: seoGlobal?.schemaPriceRange || "€€",
    url: "https://obradirecta.cat",
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {seoGlobal?.ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${seoGlobal.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${seoGlobal.ga4Id}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale as Locale} />
          <main>{children}</main>
          <Footer locale={locale as Locale} contacts={contacts} />
          <WhatsAppButton number={contacts.whatsapp} />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
