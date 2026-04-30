import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/**
 * Turbopack can wrongly resolve `next-intl/middleware` to `[project]/middleware.ts`.
 * Point the alias at the package implementation with a relative path (required by Turbopack).
 */
function nextIntlMiddlewareAliasTarget() {
  return process.env.NODE_ENV === "production"
    ? "./node_modules/next-intl/dist/esm/production/middleware.js"
    : "./node_modules/next-intl/dist/esm/development/middleware.js";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "next-intl/middleware": nextIntlMiddlewareAliasTarget(),
    },
  },
};

export default withNextIntl(nextConfig);
