"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { SERVICE_CATEGORIES, getServiceName } from "@/lib/services-data";
import type { Locale } from "@/i18n";

const SPANISH_PHONE_REGEX = /^(\+34|0034|34)?[6789]\d{8}$/;

function buildSchema(t: ReturnType<typeof useTranslations>) {
  return z.object({
    name: z.string().min(1, t("form.validation.nameRequired")),
    phone: z
      .string()
      .min(1, t("form.validation.phoneRequired"))
      .regex(SPANISH_PHONE_REGEX, t("form.validation.phoneInvalid")),
    service: z.string().optional(),
    message: z.string().optional(),
    language: z.string(),
    gdpr: z.boolean().refine((v) => v === true, { message: t("form.validation.gdprRequired") }),
  });
}

type FormValues = {
  name: string;
  phone: string;
  service?: string;
  message?: string;
  language: string;
  gdpr: boolean;
};

export default function LeadForm({
  locale,
  presetCategoryId,
}: {
  locale: Locale;
  /** Pre-selects first service within this category in the dropdown. */
  presetCategoryId?: string;
}) {
  const t = useTranslations();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const presetServiceId = useMemo(() => {
    if (!presetCategoryId) return "";
    const cat = SERVICE_CATEGORIES.find((c) => c.id === presetCategoryId);
    return cat?.services[0]?.id ?? "";
  }, [presetCategoryId]);

  const schema = buildSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      service: presetServiceId,
      message: "",
      language: locale,
      gdpr: false,
    },
  });

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-green-800 font-semibold text-lg">{t("form.success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 sm:space-y-4"
      aria-label={t("form.title")}
      noValidate
    >
      <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 sm:gap-4">
      {/* Name */}
      <div>
        <label htmlFor="lead-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t("form.name")} <span className="text-red-400">*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          autoComplete="name"
          placeholder={t("form.namePlaceholder")}
          {...register("name")}
          className="form-input"
          aria-describedby={errors.name ? "lead-name-error" : undefined}
        />
        {errors.name && (
          <p id="lead-name-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="lead-phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t("form.phone")} <span className="text-red-400">*</span>
        </label>
        <input
          id="lead-phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("form.phonePlaceholder")}
          {...register("phone")}
          className="form-input"
          aria-describedby={errors.phone ? "lead-phone-error" : undefined}
        />
        {errors.phone && (
          <p id="lead-phone-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {errors.phone.message}
          </p>
        )}
      </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="lead-service" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t("form.service")}
        </label>
        <select
          id="lead-service"
          {...register("service")}
          className="form-input"
          aria-describedby={errors.service ? "lead-service-error" : undefined}
        >
          <option value="">{t("form.servicePlaceholder")}</option>
          {SERVICE_CATEGORIES.map((cat) => (
            <optgroup key={cat.id} label={
              locale === "ca" ? cat.nameCa : locale === "en" ? cat.nameEn : cat.nameEs
            }>
              {cat.services.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {getServiceName(svc, locale)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.service && (
          <p id="lead-service-error" className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="lead-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t("form.message")}
        </label>
        <textarea
          id="lead-message"
          rows={2}
          placeholder={t("form.messagePlaceholder")}
          {...register("message")}
          className="form-input resize-none"
        />
      </div>

      {/* Language preference */}
      <div>
        <label htmlFor="lead-language" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          {t("form.language")}
        </label>
        <select
          id="lead-language"
          {...register("language")}
          className="form-input"
        >
          <option value="es">Español</option>
          <option value="ca">Català</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* GDPR */}
      <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
        <input
          id="lead-gdpr"
          type="checkbox"
          {...register("gdpr")}
          className="mt-0.5 w-4 h-4 accent-gold shrink-0"
          aria-describedby={errors.gdpr ? "lead-gdpr-error" : undefined}
        />
        <label htmlFor="lead-gdpr" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
          {t("form.gdpr")}
        </label>
      </div>
      {errors.gdpr && (
        <p id="lead-gdpr-error" className="text-red-500 text-xs -mt-2 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {errors.gdpr.message}
        </p>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {t("form.error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full btn-gold justify-center py-3 sm:py-4 text-sm sm:text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t("form.submitting")}
          </>
        ) : t("form.submit")}
      </button>
    </form>
  );
}
