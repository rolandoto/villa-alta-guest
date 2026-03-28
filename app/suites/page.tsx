"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ROOMS } from "@/app/data/hotel";

const T = {
  sand:    "#ede8df",
  ink:     "#1a1410",
  gold:    "#8b6c3e",
  goldLt:  "#b8966a",
  cream:   "#f7f3ee",
  muted:   "rgba(26,20,16,.55)",
  border:  "rgba(139,108,62,.22)",
};

/* ─── Utility: observe entrance ─────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Card ───────────────────────────────────────────────────── */
function RoomCard({ room, index }: { room: (typeof ROOMS)[0]; index: number }) {
  const { ref, visible } = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity .8s ease-out ${index * 100}ms, transform .8s ease-out ${index * 100}ms`,
      }}
    >
      <article
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="room-card"
        style={{
          background: T.cream,
          border: `1px solid ${T.border}`,
          overflow: "hidden",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow .4s ease",
          boxShadow: hovered ? "0 20px 40px rgba(26,20,16,.12)" : "0 4px 12px rgba(26,20,16,.04)",
        }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "3/2", overflow: "hidden" }}>
          <Image
            src={room.images[0]}
            alt={room.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform .8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div className="suite-badge">Suite {room.number}</div>
        </div>

        <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, color: T.goldLt }}>
            {room.subtitle}
          </p>
          <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 400, color: T.ink }}>
            {room.title}
          </h2>
          <div style={{ width: 40, height: 1, background: T.gold, marginBottom: 16 }} />
          <p style={{ margin: "0 0 24px", fontSize: 15, lineHeight: 1.6, color: T.muted, flexGrow: 1 }}>
            {room.description}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={`/suites/${room.slug}`} className="btn-primary">Ver suite</Link>
            <Link target="_blank" href="https://villa-alta.vercel.app/" className="btn-ghost">Reservar</Link>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function SuitesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&display=swap');

        :root {
          --font-serif: 'EB Garamond', Georgia, serif;
          --font-display: 'Cormorant Garamond', Georgia, serif;
        }

        /* Responsive Grid & Containers */
        .container-custom {
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          padding-top: 100px;
          padding-bottom: 48px;
          border-bottom: 1px solid ${T.border};
        }

        .suites-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 32px;
          padding: 48px 0 80px;
        }

        /* Media Queries */
        @media (min-width: 768px) {
          .hero-grid { 
            grid-template-columns: 1fr 300px; 
            padding-top: 140px; 
            align-items: end; 
          }
          .suites-grid { grid-template-columns: repeat(2, 1fr); }
          .container-custom { padding: 0 40px; }
        }

        @media (min-width: 1100px) {
          .suites-grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* Components */
        .suite-badge {
          position: absolute; top: 16px; right: 16px;
          background: rgba(26,20,16,0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 99px;
          padding: 4px 12px;
          color: #fff;
          font-family: var(--font-serif);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .btn-primary, .btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: 99px;
          font-family: var(--font-serif);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-primary { background: ${T.gold}; color: white; border: 1px solid ${T.gold}; }
        .btn-primary:hover { background: ${T.goldLt}; border-color: ${T.goldLt}; }
        .btn-ghost { border: 1px solid ${T.border}; color: ${T.ink}; }
        .btn-ghost:hover { background: ${T.ink}; color: white; }

        /* Animations */
        .suites-hero-line { display: block; overflow: hidden; }
        .suites-hero-line span {
          display: block;
          animation: slideUp 0.9s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>

      <section className="mt-8" style={{ minHeight: "100vh", background: T.sand, color: T.ink }}>
        {/* ── Hero ── */}
        <div className="container-custom hero-grid">
          <div>
            <p style={{ margin: "0 0 16px", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 14, letterSpacing: ".2em", color: T.goldLt }}>
              — COLECCIÓN DE ALOJAMIENTOS
            </p>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 300, lineHeight: 1, fontSize: "clamp(48px, 8vw, 110px)", textTransform: "uppercase" }}>
              <span className="suites-hero-line"><span>Nuestras</span></span>
              <span className="suites-hero-line" style={{ fontStyle: "italic", color: T.gold }}><span>Suites</span></span>
            </h1>
          </div>
          <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.6, color: T.muted }}>
            Diseñadas para descanso, privacidad y estilo colonial contemporáneo en el corazón de Cartagena.
          </p>
        </div>

        {/* ── Filtros ── */}
        <div className="container-custom" style={{ padding: "24px 0", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12, overflowX: "auto", whiteSpace: "nowrap" }}>
           <span style={{ fontSize: 12, color: T.muted, fontFamily: "var(--font-serif)" }}>{ROOMS.length} Suites</span>
           {["Todas", "Junior", "Deluxe"].map(f => (
             <button key={f} style={{ padding: "6px 16px", borderRadius: 99, border: `1px solid ${T.border}`, background: "transparent", fontSize: 11, textTransform: "uppercase", cursor: "pointer" }}>{f}</button>
           ))}
        </div>

        {/* ── Grid ── */}
        <div className="container-custom suites-grid">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>

        {/* ── Footer Strip ── */}
        <div className="container-custom" style={{ padding: "40px 0", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ margin: 0, fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 18 }}>¿Necesitas ayuda para elegir?</p>
          <Link href="/contacto" className="btn-primary">Habla con nosotros</Link>
        </div>
      </section>
    </>
  );
}