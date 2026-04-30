import type { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Admin | ObraDirecta",
    template: "%s | Admin — ObraDirecta",
  },
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
