-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "message" TEXT,
    "language" TEXT NOT NULL DEFAULT 'es',
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SeoPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT,
    "metaDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "focusKeyword" TEXT,
    "canonical" TEXT,
    "robots" TEXT DEFAULT 'index, follow',
    "h1" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SeoGlobal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ga4Id" TEXT,
    "schemaName" TEXT DEFAULT 'Obra Man',
    "schemaAddress" TEXT DEFAULT 'Barcelona, Cataluña, España',
    "schemaPhone" TEXT,
    "schemaLat" TEXT DEFAULT '41.3851',
    "schemaLng" TEXT DEFAULT '2.1734',
    "schemaHours" TEXT DEFAULT 'Mo-Fr 08:00-18:00',
    "schemaPriceRange" TEXT DEFAULT '€€',
    "sitemapEnabled" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "nameEs" TEXT NOT NULL,
    "nameCa" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descEs" TEXT,
    "descCa" TEXT,
    "descEn" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "SeoPage_slug_key" ON "SeoPage"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
