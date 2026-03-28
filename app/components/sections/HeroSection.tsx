"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const heroImg = "/images/hero-back3.avif";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 80,
          display: "grid",
          placeItems: "center",
          background: "radial-gradient(circle at top, #6e3c49 0%, #2d151a 55%, #12090c 100%)",
          opacity: loading ? 1 : 0,
          pointerEvents: loading ? "auto" : "none",
          transition: "opacity .7s ease",
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <div
            style={{
              width: 110,
              height: 110,
              margin: "0 auto 22px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,.35)",
              display: "grid",
              placeItems: "center",
              animation: "pulse 1.2s ease-in-out infinite",
            }}
          >
            <span style={{ fontSize: 26, letterSpacing: ".3em", marginLeft: ".3em" }}>VA</span>
          </div>
          <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: ".45em", fontSize: 11 }}>Villa Alta</p>
          <p style={{ margin: "7px 0 0", textTransform: "uppercase", letterSpacing: ".35em", fontSize: 10, opacity: 0.7 }}>
            Casa de Huéspedes
          </p>
          <div
            style={{
              width: 140,
              height: 2,
              margin: "16px auto 0",
              background: "rgba(255,255,255,.2)",
              overflow: "hidden",
              borderRadius: 999,
            }}
          >
            <span style={{ display: "block", height: "100%", background: "#fff", animation: "line 1.4s ease forwards" }} />
          </div>
        </div>
      </div>

      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "130px 20px 90px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(120deg, rgba(0,0,0,.68), rgba(0,0,0,.3)), url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: loading ? "scale(1.06)" : "scale(1)",
            transition: "transform 1.3s ease",
          }}
        />

        <div style={{ position: "relative", zIndex: 2, color: "#fff", maxWidth: 920 }}>
          <p style={{ margin: 0, letterSpacing: ".35em", textTransform: "uppercase", fontSize: 12, opacity: 0.85 }}>
            Patrimonio Arquitectónico · Siglo XVIII
          </p>

          <h1
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(56px,15vw,152px)",
              lineHeight: 0.88,
              letterSpacing: "-.03em",
              margin: "12px 0",
              textTransform: "uppercase",
            }}
          >
            Villa Alta
          </h1>

          <p style={{ margin: "0 auto", maxWidth: 700, lineHeight: 1.8, fontSize: "clamp(14px,2vw,18px)", opacity: 0.95 }}>
            Vive Cartagena con estilo boutique en el Centro Histórico. Habitaciones únicas, diseño colonial y servicio
            personalizado para una estadía inolvidable.
          </p>

          <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <Link
              href="https://villa-alta.vercel.app"
              target="_blank"
              style={{
                border: "1px solid rgba(255,255,255,.65)",
                color: "#fff",
                padding: "11px 24px",
                borderRadius: 999,
                textTransform: "uppercase",
                letterSpacing: ".2em",
                fontSize: 12,
              }}
            >
              Reservar
            </Link>
            <Link
              href="/galeria"
              style={{
                border: "1px solid rgba(255,255,255,.3)",
                color: "#fff",
                padding: "11px 24px",
                borderRadius: 999,
                textTransform: "uppercase",
                letterSpacing: ".2em",
                fontSize: 12,
                background: "rgba(255,255,255,.12)",
              }}
            >
              Ver galería
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }

        @keyframes line {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
