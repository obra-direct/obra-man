# ObraDirecta - Construction Company Website

Professional multilingual construction company website for Barcelona, Catalonia. Built with Next.js 14, TypeScript, Tailwind CSS, Prisma + SQLite, and next-intl for i18n (ES/CA/EN).

---

## Features

- **Multilingual**: Spanish (default), Catalan, English with next-intl
- **60 construction services** grouped in 9 categories (including Demolición y Derribo)
- **Lead capture form** with Spanish phone validation, GDPR consent, and DB storage
- **SEO admin panel**: per-page title, description, OG tags, robots, H1, canonical, focus keyword
- **Global SEO**: GA4 injection, Schema.org LocalBusiness JSON-LD, sitemap toggle
- **Protected admin panel** with next-auth (bcrypt passwords)
- **Automatic sitemap.xml** and **robots.txt**
- **WhatsApp floating button**
- Mobile-first responsive design (navy + gold design tokens)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | Admin UI components |
| Prisma + SQLite | Database |
| next-intl | i18n (ES/CA/EN) |
| next-auth v4 | Admin authentication |
| React Hook Form + Zod | Form validation |
| bcryptjs | Password hashing |

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd obradirecta
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-random-secret-here"       # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="+34XXXXXXXXX"
NEXT_PUBLIC_SITE_URL="https://obradirecta.cat"        # for sitemap
```

### 3. Set up the database

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Seed the database (creates admin user + default SEO pages)
npx tsx prisma/seed.ts
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## Admin Panel

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Default credentials** (change immediately in production):
  - Username: `admin`
  - Password: `admin123`

### Change the admin password

```bash
npx tsx -e "
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const hash = await bcrypt.hash('YOUR_NEW_PASSWORD', 12);
await prisma.adminUser.update({ where: { username: 'admin' }, data: { passwordHash: hash } });
await prisma.\$disconnect();
console.log('Password updated');
"
```

---

## Admin Panel Routes

| Route | Purpose |
|---|---|
| `/admin` | Login page |
| `/admin/dashboard` | Lead overview and recent activity |
| `/admin/leads` | All lead submissions with status management |
| `/admin/services` | Toggle service visibility, edit descriptions |
| `/admin/seo` | Full SEO management per page + global settings |

---

## Public Routes

| Route | Language | Page |
|---|---|---|
| `/` | ES | Homepage |
| `/servicios` | ES | Services |
| `/servicios/demolicion-y-derribo` | ES | Demolition category |
| `/contacto` | ES | Contact |
| `/sobre-nosotros` | ES | About |
| `/ca` | CA | Homepage (Catalan) |
| `/ca/serveis` | CA | Services |
| `/ca/serveis/demolicio-i-enderroc` | CA | Demolition |
| `/ca/contacte` | CA | Contact |
| `/ca/sobre-nosaltres` | CA | About |
| `/en` | EN | Homepage |
| `/en/services` | EN | Services |
| `/en/services/demolition` | EN | Demolition |
| `/en/contact` | EN | Contact |
| `/en/about` | EN | About |
| `/sitemap.xml` | - | Auto-generated sitemap |
| `/robots.txt` | - | Robots rules |

---

## SEO Admin Usage

1. Go to `/admin/seo`
2. **Global tab**: Enter your GA4 Measurement ID (e.g. `G-XXXXXXXXXX`), fill in Schema.org business data, and enable/disable the sitemap
3. **Per-page tabs**: Edit title, meta description, OG fields, focus keyword, canonical URL, robots directive, and H1 heading for each page
4. All changes are saved to the database and applied on the next page render

---

## Database Schema

```prisma
Lead       - id, name, phone, service, message, language, status, createdAt
SeoPage    - id, slug, title, metaDescription, ogTitle, ogDescription, focusKeyword, canonical, robots, h1
SeoGlobal  - id, ga4Id, schemaName, schemaAddress, schemaPhone, schemaLat, schemaLng, schemaHours, schemaPriceRange, sitemapEnabled
AdminUser  - id, username, passwordHash
Service    - id, slug, category, nameEs, nameCa, nameEn, descEs, descCa, descEn, visible, sortOrder
```

---

## Production Deployment

### Switching to PostgreSQL

1. Update `prisma.config.ts`:
   ```ts
   datasource: { url: process.env.DATABASE_URL }
   ```
2. Update `prisma/schema.prisma` `provider` to `"postgresql"`
3. Set `DATABASE_URL` to your PostgreSQL connection string
4. Run `npx prisma migrate deploy`

### Environment variables (production)

```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXTAUTH_SECRET="strong-random-secret"
NEXTAUTH_URL="https://obradirecta.cat"
NEXT_PUBLIC_WHATSAPP_NUMBER="+34XXXXXXXXX"
NEXT_PUBLIC_SITE_URL="https://obradirecta.cat"
```

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
  [locale]/          ← All public pages (next-intl routing)
    page.tsx         ← Homepage
    servicios/       ← Services page
    contacto/        ← Contact page
    sobre-nosotros/  ← About page
  admin/             ← Admin panel (no i18n)
  api/               ← API routes
  sitemap.ts         ← Auto sitemap
  robots.ts          ← Robots.txt
components/
  public/            ← Navbar, Footer, LeadForm, ServiceCard, WhatsApp
  admin/             ← AdminShell, LeadsTable, ServicesManager, SeoManager
  ui/                ← shadcn/ui components
lib/
  db.ts              ← Prisma client singleton
  auth.ts            ← NextAuth options
  seo.ts             ← getSeoForPage() helper
  services-data.ts   ← All 60 services data
messages/
  es.json, ca.json, en.json
prisma/
  schema.prisma
  seed.ts
```
