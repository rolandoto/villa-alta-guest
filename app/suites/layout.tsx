import type { Metadata } from "next";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Suites en Cartagena | Villa Alta Casa de Huéspedes",
  description:
    "Explora nuestras suites en Cartagena: habitaciones dúplex y premium con diseño colonial contemporáneo en el Centro Histórico.",
  path: "/suites",
  keywords: ["suites cartagena", "habitaciones hotel cartagena", "villa alta suites"],
});

export default function SuitesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
