import type { Metadata } from "next";
import "./globals.css";
import Cursor from "./components/ui/Cursor";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/navbar/page";
import { SITE_URL } from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Villa Alta Guest Houses | Cartagena de Indias",
    template: "%s | Villa Alta Guest Houses",
  },
  verification: {
    google: 'k6IGz3NXc6RdlDaKRMWVKxM4vKOb1mSEe2Up8laYegI', // Pega solo el código alfanumérico que viene dentro del content="..."
  },
  description:
    "Hotel boutique de lujo en el Centro Histórico de Cartagena. Patrimonio arquitectónico del siglo XVIII con 7 suites únicas.",
  keywords: ["hotel cartagena", "villa alta", "Guest House", "boutique", "centro histórico"],
  category: "travel",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
      
        <Cursor />
        <a 
          href="https://villa-alta.vercel.app/"
          target="_blank"
          rel="noreferrer"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 40px",
            borderRadius: 2,
            border: "1px solid #c96e85",
            background: "#3a1c20",
            color: "#e0899e",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 9,
            letterSpacing: ".32em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 8px 32px rgba(44,20,24,.6)",
          }}
          className="va-fixed-btn"
        >
          Reservar ahora →
        </a>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
