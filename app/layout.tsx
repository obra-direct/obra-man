import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ObraDirecta - Constructora en Barcelona",
    template: "%s | ObraDirecta",
  },
  description:
    "Empresa constructora en Barcelona. Más de 500 proyectos en Cataluña. Mejor precio garantizado.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
