import "dotenv/config";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const rawUrl = process.env.DATABASE_URL || "file:./dev.db";
  // Convert relative file:// URL to absolute for better-sqlite3
  let url = rawUrl;
  if (rawUrl.startsWith("file:./") || rawUrl.startsWith("file:../")) {
    const relPath = rawUrl.replace(/^file:/, "");
    const absPath = path.resolve(process.cwd(), relPath);
    url = `file:${absPath}`;
  }

  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
