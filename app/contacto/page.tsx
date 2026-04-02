import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HOTEL } from "@/app/data/hotel";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto y reservas | Villa Alta Cartagena",
  description:
    "Contacta a Villa Alta para reservar tu estadía en Cartagena: teléfono, email y atención personalizada para tu viaje.",
  path: "/contacto",
  keywords: ["contacto hotel cartagena", "reservas villa alta", "telefono hotel cartagena"],
});

const FOTOS_CONTACTO = [
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/ENTRADAHOTEL.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOBBYHUESPEDES.jpg",
  "/FotosHotelVillaAlta/FOTOS/DSC06735.jpg",
];

const CONTACTO_ITEMS = [
  { label: "Teléfono", value: HOTEL.phone, href: `tel:${HOTEL.phone}` },
  { label: "Email", value: HOTEL.email, href: `mailto:${HOTEL.email}` },
  { label: "Dirección", value: `${HOTEL.location}, ${HOTEL.city}`, href: undefined },
];

export default function ContactoPage() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#3a1c20",
        padding: "140px 24px 96px",
        fontFamily: "'Barlow Condensed', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Textura ruido */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1160,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        {/* ── Columna izquierda ── */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 9,
              letterSpacing: ".32em",
              textTransform: "uppercase",
              color: "rgba(242,237,228,.5)",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 1,
                background: "linear-gradient(to right, #c9a96e, transparent)",
                flexShrink: 0,
              }}
            />
            Villa Alta · Contacto
          </div>

          {/* Título */}
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(36px, 6vw, 76px)",
              lineHeight: 0.86,
              textTransform: "uppercase",
              color: "#f2ede4",
              letterSpacing: "-.02em",
              margin: "0 0 8px",
            }}
          >
            Reservar en
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(24px, 3.5vw, 48px)",
              lineHeight: 0.9,
              color: "#c96e85",
              margin: "0 0 24px",
              letterSpacing: "0.02em",
            }}
          >
            Villa Alta
          </p>

          {/* Línea dorada */}
          <div
            style={{
              width: 40,
              height: 1,
              background: "linear-gradient(to right, #c9a96e, transparent)",
              margin: "0 0 24px",
            }}
          />

          {/* Descripción */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.85,
              color: "rgba(242,237,228,.72)",
              maxWidth: 480,
              margin: "0 0 40px",
            }}
          >
            Contáctanos para confirmar disponibilidad, tarifas y experiencias especiales en Cartagena.
          </p>

          {/* Datos de contacto */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: 44,
            }}
          >
            {CONTACTO_ITEMS.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  gap: "0 16px",
                  alignItems: "baseline",
                  paddingBottom: 14,
                  borderBottom: "1px solid rgba(242,237,228,.06)",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "#c96e85",
                    fontWeight: 700,
                    paddingTop: 2,
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(242,237,228,.72)",
                      textDecoration: "none",
                      transition: "color .2s",
                    }}
       
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "rgba(242,237,228,.72)",
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Botones CTA */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <a
              href={`https://wa.me/${HOTEL.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 36px",
                borderRadius: 2,
                border: "1px solid #c96e85",
                background: "transparent",
                color: "#e0899e",
                fontSize: 9,
                letterSpacing: ".32em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .25s, color .25s",
              }} 
            >
              WhatsApp →
            </a>

            <Link
              href="/galeria"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.72)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color .2s",
              }}
          
            >
              Ver galería →
            </Link>

            <Link
              href="/suites"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 9,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.72)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color .2s",
              }}
            
            >
              Ver suites →
            </Link>
          </div>
        </div>

        {/* ── Columna derecha: fotos ── */}
        <div style={{ display: "grid", gap: 6 }}>
          {FOTOS_CONTACTO.map((src, i) => (
            <div
              key={src + i}
              style={{
                position: "relative",
                minHeight: i === 0 ? 260 : 160,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(242,237,228,.07)",
              }}
            >
              {/* Overlay oscuro */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, transparent 50%, rgba(44,20,24,.6) 100%)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
              <Image
                src={src}
                alt={`Villa Alta Cartagena — foto ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover", transition: "transform .6s ease" }}
                priority={i === 0}
              />
              {/* Número de foto */}
              <span
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 16,
                  zIndex: 2,
                  fontSize: 9,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive: columna única en mobile */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}