"use client";
import Link from "next/link";
import { HOTEL, NAV_LINKS } from "@/app/data/hotel";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--secondary)",
        padding: "80px 20px 40px",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
        
        {/* LOGO */}
        <div
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontWeight: 900,
            fontSize: "clamp(28px,10vw,90px)",
            lineHeight: 0.9,
            letterSpacing: "-.025em",
            textTransform: "uppercase",
            marginBottom: 40,
            background: "linear-gradient(135deg,rgba(255,255,255,.9),rgba(201,169,110,.55))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Villa Alta
          <em
            style={{
              display: "block",
              fontStyle: "normal",
              fontWeight: 200,
              fontSize: "clamp(12px,3vw,22px)",
              letterSpacing: ".4em",
              marginTop: 6,
              paddingLeft: ".4em",
              color: "white",
            }}
          >
            Guest House
          </em>
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gap: 40,
            paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,.055)",

            // 🔥 responsive automático
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          
          {/* INFO */}
          <div>
            <p
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 14,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--cream)",
                lineHeight: 1.6,
              }}
            >
              Una joya arquitectónica en el corazón de Cartagena de Indias,
              donde el lujo colonial se encuentra con el confort moderno.
            </p>

            <a
              href="https://www.instagram.com/villaalta.ctg/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 20,
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 16,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                borderBottom: "1px solid rgba(255,255,255,.1)",
                paddingBottom: 2,
                color: "rgba(255,255,255,.6)",
                transition: "color .3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--gold)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,.6)")
              }
            >
              ↗ {HOTEL.instagram}
            </a>
          </div>

          {/* NAV */}
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 12,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.2)",
                marginBottom: 16,
              }}
            >
              Navegación
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ label: "Inicio", href: "/" }, ...NAV_LINKS].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: ".12em",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACTO */}
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 12,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.2)",
                marginBottom: 16,
              }}
            >
              Contacto
            </div>

            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 14,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "var(--cream)",
                lineHeight: 1.6,
              }}
            >
              {HOTEL.location}
              <br />
              {HOTEL.city}
              <br /><br />

              <a href={`tel:${HOTEL.phone}`} style={{ color: "inherit" }}>
                {HOTEL.phone}
              </a>
              <br />

              <a href={`mailto:${HOTEL.email}`} style={{ color: "inherit" }}>
                {HOTEL.email}
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            textAlign: "center",
            paddingTop: 30,
            marginTop: 40,
            borderTop: "1px solid rgba(255,255,255,.04)",
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 12,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          <span>© 2026 Villa Alta Guest House</span>
          <span>Desarrollado por SLE Development</span>
        </div>
      </div>
    </footer>
  );
}