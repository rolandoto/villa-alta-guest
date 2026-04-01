import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./components/ui/Cursor";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/navbar/page";
import { SITE_URL } from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Villa Alta Casa de Huéspedes | Cartagena de Indias",
    template: "%s | Villa Alta Casa de Huéspedes",
  },
  description:
    "Hotel boutique de lujo en el Centro Histórico de Cartagena. Patrimonio arquitectónico del siglo XVIII con 7 suites únicas.",
  keywords: ["hotel cartagena", "villa alta", "casa de huéspedes", "boutique", "centro histórico"],
  category: "travel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <Cursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
