import Link from "next/link";
import type { ServiceItem } from "@/lib/services-data";
import type { Locale } from "@/i18n";
import { serviceHref } from "@/lib/service-category-routes";

interface ServiceCardProps {
  service: ServiceItem;
  locale: Locale;
  categoryId: string;
}

export default function ServiceCard({ service, locale, categoryId }: ServiceCardProps) {
  const name =
    locale === "ca" ? service.nameCa : locale === "en" ? service.nameEn : service.nameEs;
  const desc =
    locale === "ca" ? service.descCa : locale === "en" ? service.descEn : service.descEs;

  const href = serviceHref(locale, categoryId, service.id);

  return (
    <Link
      href={href}
      className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-gold/40 hover:shadow-lg transition-all duration-200 flex flex-col gap-3 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-navy text-sm leading-snug group-hover:text-gold transition-colors duration-200">
          {name}
        </h3>
        <svg
          className="w-4 h-4 text-gray-300 group-hover:text-gold shrink-0 mt-0.5 transition-colors duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
      {desc && <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>}
    </Link>
  );
}
