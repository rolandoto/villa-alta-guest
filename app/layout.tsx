import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./components/ui/Cursor";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

export const metadata: Metadata = {
  title: "Villa Alta Guest House | Cartagena de Indias",
  description: "Hotel boutique de lujo en el Centro Histórico de Cartagena. Patrimonio arquitectónico del siglo XVIII con 7 suites únicas. Calificación 9.4 Fabuloso.",
  keywords: ["hotel cartagena", "villa alta", "guest house", "boutique", "centro historico"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Cursor />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
