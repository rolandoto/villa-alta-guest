"use client";
import Link from "next/link";
import { HOTEL, NAV_LINKS } from "@/app/data/hotel";

export default function Footer() {
  return (
    <footer
    className="bg-[#e8e2d9]"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#3a1c20",
        padding: "80px 20px 40px",
        fontFamily: "'Barlow Condensed', sans-serif",
      }}
    >
      {/* Textura ruido */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>

        {/* LOGO */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontWeight: 900,
              fontSize: "clamp(28px, 10vw, 90px)",
              lineHeight: 0.86,
              letterSpacing: "-.025em",
              textTransform: "uppercase",
              color: "#f2ede4",
            }}
          >
            Villa Alta
          </div>
          <div
            style={{
              fontWeight: 200,
              fontSize: "clamp(12px, 3vw, 18px)",
              letterSpacing: ".4em",
              textTransform: "uppercase",
              color: "#c96e85",
              marginTop: 6,
              paddingLeft: "0.4em",
            }}
          >
            Guest House
          </div>
          {/* línea dorada */}
          <div
            style={{
              width: 40,
              height: 1,
              background: "linear-gradient(to right, #c9a96e, transparent)",
              marginTop: 20,
            }}
          />
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gap: 40,
            paddingTop: 40,
            borderTop: "1px solid rgba(242,237,228,.08)",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >

          {/* INFO */}
          <div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.32)",
                marginBottom: 16,
              }}
            >
              El hotel
            </div>
            <p
              style={{
                fontSize: 14,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.72)",
                lineHeight: 1.7,
                margin: "0 0 20px",
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
                fontSize: 9,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.5)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(242,237,228,.1)",
                paddingBottom: 2,
                transition: "color .25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a96e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,237,228,.5)")}
            >
              ↗ {HOTEL.instagram}
            </a>
          </div>

          {/* NAV */}
          <div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.32)",
                marginBottom: 16,
              }}
            >
              Navegación
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[{ label: "Inicio", href: "/" }, ...NAV_LINKS].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "rgba(242,237,228,.72)",
                    textDecoration: "none",
                    padding: "6px 0",
                    borderBottom: "1px solid transparent",
                    transition: "color .2s, border-color .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f2ede4";
                    e.currentTarget.style.borderBottomColor = "rgba(201,110,133,.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(242,237,228,.72)";
                    e.currentTarget.style.borderBottomColor = "transparent";
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
                fontSize: 9,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.32)",
                marginBottom: 16,
              }}
            >
              Contacto
            </div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.72)",
                lineHeight: 1.8,
              }}
            >
              {HOTEL.location}
              <br />
              {HOTEL.city}
              <br />
              <br />
              <a
                href={`tel:${HOTEL.phone}`}
                style={{ color: "rgba(242,237,228,.72)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a96e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,237,228,.72)")}
              >
                {HOTEL.phone}
              </a>
              <br />
              <a
                href={`mailto:${HOTEL.email}`}
                style={{ color: "rgba(242,237,228,.72)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a96e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,237,228,.72)")}
              >
                {HOTEL.email}
              </a>
            </div>

            {/* CTA reserva */}
            <a
              href="https://villa-alta.vercel.app/"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 28,
                padding: "12px 32px",
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#c96e85";
                e.currentTarget.style.color = "#3a1c20";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#e0899e";
              }}
            >
              Reservar ahora →
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            paddingTop: 28,
            marginTop: 40,
            borderTop: "1px solid rgba(242,237,228,.06)",
            fontSize: 9,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "rgba(242,237,228,.28)",
          }}
        >
          <span>© 2026 Villa Alta Guest House · Diez Elementos S.A.S.</span>
          <span>Desarrollado por SLE Development</span>
        </div>
      </div>
    </footer>
  );
}