import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // DATABASE_URL must be set at runtime; passing empty string here lets the
  // build succeed — any actual query against a missing URL will fail at runtime.
  const connectionString =
    process.env.DATABASE_URL ??
    process.env.OBRA_DATABASE_URL ??
    process.env.OBRA_POSTGRES_URL ??
    "";
  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
