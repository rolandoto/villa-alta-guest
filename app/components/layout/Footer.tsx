"use client";
import Link from "next/link";
import { HOTEL, NAV_LINKS } from "@/app/data/hotel";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative", overflow: "hidden",
        background: "var(--secondary)", padding: "100px 60px 50px",
      }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, zIndex: 0 }}>
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
       <div
            style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 900,
                fontSize: "clamp(28px,7vw,90px)", // antes: clamp(40px,11vw,150px)
                lineHeight: 0.84,
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
                fontSize: "clamp(12px,2vw,26px)", // antes: clamp(18px,3vw,44px)
                letterSpacing: ".45em",
                marginTop: 4,
                paddingLeft: ".45em",
                color: "white",
                WebkitBackgroundClip: "unset",
                backgroundClip: "unset",
                }}
            >
                Guest House
            </em>
            </div>
        <div
          style={{
            display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: 64, paddingTop: 48,
            borderTop: "1px solid rgba(255,255,255,.055)",
          }}
        >
          <div>
            <p
              style={{
                 fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15,
                    letterSpacing: ".14em", textTransform: "uppercase",
                    transition: "color .3s",
                    color: "var(--cream)",
              }}
            >
              Una joya arquitectónica en el corazón de Cartagena de Indias, donde el lujo medieval se encuentra con el confort moderno.
            </p>
            <a
              href="https://www.instagram.com/villaalta.ctg/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'Barlow Condensed',sans-serif", fontSize: 20,
                letterSpacing: ".22em", textTransform: "uppercase",
                borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: 2,
                transition: "color .3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.28)")}
            >
              ↗ {HOTEL.instagram}
            </a>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12,
                letterSpacing: ".24em", textTransform: "uppercase",
                color: "rgba(255,255,255,.2)", marginBottom: 16,
              }}
            >
              Navegación
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[{ label: "Inicio", href: "/" }, ...NAV_LINKS].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif", fontSize: 25,
                    fontWeight: 600,
                    letterSpacing: ".14em", 
                    transition: "color .3s",
                  }}
                 
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9,
                letterSpacing: ".24em", textTransform: "uppercase",
                color: "rgba(265,255,255,.2)", marginBottom: 16,
              }}
            >
              Contacto
            </div>
            <div
              style={{
                 fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15,
                    letterSpacing: ".14em", textTransform: "uppercase",
                    transition: "color .3s",color: "var(--cream)",
              }}>
              {HOTEL.location}<br />
              {HOTEL.city}<br /><br />
              <a href={`tel:${HOTEL.phone}`} style={{ color: "inherit" }}>{HOTEL.phone}</a><br />
              <a href={`mailto:${HOTEL.email}`} style={{ color: "inherit" }}>{HOTEL.email}</a>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex", justifyContent: "space-between",
            paddingTop: 36, marginTop: 48,
            borderTop: "1px solid rgba(255,255,255,.04)",
            fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15,
            letterSpacing: ".14em", textTransform: "uppercase",
         
          }}
        >
          <span>© 2026 Villa Alta Guest House. Todos los derechos reservados.</span>
          <span>Developed by SLE Development</span>
        </div>
      </div>
    </footer>
  );
}
