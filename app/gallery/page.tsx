"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────────────
// --rose:  #c96e85   --gold: #e8d4a8
// --cream: #f5f0e8   --ink:  #1a1610
// --muted: rgba(26,22,16,0.45)

// ─── DATA ────────────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { id: 1,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Lobby Huéspedes",  label: "Recepción",    cat: "lobby",     size: "tall" },
  { id: 2,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Fachada Colonial", label: "Exterior",     cat: "exterior",  size: "wide" },
  { id: 3,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Suite Duplex 1",   label: "Habitación",   cat: "suite",     size: "sq"   },
  { id: 4,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Lobby Hotel",      label: "Segundo Piso", cat: "lobby",     size: "sq"   },
  { id: 5,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Antesala Suite",   label: "Interior",     cat: "suite",     size: "wide" },
  { id: 6,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Sala Colonial",    label: "Suite",        cat: "suite",     size: "sq"   },
  { id: 7,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Vista Colonial",   label: "Cartagena",    cat: "cartagena", size: "tall" },
  { id: 8,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Suite Duplex 2",   label: "Habitación",   cat: "suite",     size: "sq"   },
  { id: 9,  src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Centro Histórico", label: "Cartagena",    cat: "cartagena", size: "wide" },
  { id: 10, src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Baño Suite 1",     label: "Suite",        cat: "suite",     size: "sq"   },
  { id: 11, src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Entrada Hotel",    label: "Acceso",       cat: "exterior",  size: "sq"   },
  { id: 12, src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITEALCOBA1.jpg", title: "Lobby 2do Piso",   label: "Interior",     cat: "lobby",     size: "sq"   },
];

const CATEGORIES = [
  { key: "all",       roman: "I",   name: "Todo"      },
  { key: "suite",     roman: "II",  name: "Suites"    },
  { key: "lobby",     roman: "III", name: "Lobby"     },
  { key: "exterior",  roman: "IV",  name: "Exterior"  },
  { key: "cartagena", roman: "V",   name: "Cartagena" },
];

type GalleryItem = (typeof GALLERY_ITEMS)[0];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function matchCat(item: GalleryItem, cat: string) {
  if (cat === "all") return true;
  return item.cat === cat;
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,7,4,0.97)",
        backdropFilter: "blur(28px)",
        animation: "lbFadeIn .35s cubic-bezier(.23,1,.32,1)",
      }}
    >
      {/* Accent top line */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 1, height: 72,
        background: "linear-gradient(to bottom, transparent, rgba(201,110,133,.5), transparent)",
      }} />

      {/* Corner decorations */}
      {(["tl", "tr", "bl", "br"] as const).map((pos) => (
        <svg
          key={pos}
          width="36" height="36" viewBox="0 0 36 36" fill="none"
          style={{
            position: "absolute",
            top:    pos.startsWith("t") ? 24 : "auto",
            bottom: pos.startsWith("b") ? 24 : "auto",
            left:   pos.endsWith("l")   ? 24 : "auto",
            right:  pos.endsWith("r")   ? 24 : "auto",
            opacity: 0.35,
            transform: `scale(${pos.endsWith("r") ? -1 : 1}, ${pos.startsWith("b") ? -1 : 1})`,
          }}
        >
          <path d="M1 35V7C1 3.69 3.69 1 7 1H35" stroke="#e8d4a8" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ))}

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 28, right: 36,
          background: "transparent",
          border: "1px solid rgba(232,212,168,.18)",
          borderRadius: 2,
          padding: "7px 20px",
          cursor: "pointer",
          color: "rgba(232,212,168,.4)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          transition: "all .3s",
        }}
        onMouseEnter={(e) => {
          const b = e.currentTarget;
          b.style.color = "#e8d4a8";
          b.style.borderColor = "rgba(232,212,168,.5)";
          b.style.background = "rgba(232,212,168,.06)";
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget;
          b.style.color = "rgba(232,212,168,.4)";
          b.style.borderColor = "rgba(232,212,168,.18)";
          b.style.background = "transparent";
        }}
      >
        ✕ &nbsp;Cerrar
      </button>

      {/* Image */}
      <div style={{
        position: "relative",
        padding: 2,
        borderRadius: 4,
        background: "linear-gradient(135deg, rgba(201,110,133,.3) 0%, rgba(232,212,168,.06) 50%, rgba(201,110,133,.2) 100%)",
        boxShadow: "0 0 100px rgba(201,110,133,.1)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.title}
          style={{
            display: "block",
            maxWidth: "84vw",
            maxHeight: "76vh",
            objectFit: "contain",
            borderRadius: 3,
          }}
        />
      </div>

      {/* Prev / Next */}
      {([
        { label: "←", side: "left",  action: onPrev },
        { label: "→", side: "right", action: onNext },
      ] as const).map(({ label, side, action }) => (
        <button
          key={side}
          onClick={action}
          style={{
            position: "absolute",
            [side]: 28,
            top: "50%",
            transform: "translateY(-50%)",
            width: 50, height: 50,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(232,212,168,.2)",
            background: "rgba(201,110,133,.06)",
            color: "rgba(245,240,232,.6)",
            fontSize: 18,
            cursor: "pointer",
            transition: "all .3s",
          }}
          onMouseEnter={(e) => {
            const b = e.currentTarget;
            b.style.background = "rgba(201,110,133,.2)";
            b.style.borderColor = "rgba(201,110,133,.6)";
            b.style.color = "#e8d4a8";
          }}
          onMouseLeave={(e) => {
            const b = e.currentTarget;
            b.style.background = "rgba(201,110,133,.06)";
            b.style.borderColor = "rgba(232,212,168,.2)";
            b.style.color = "rgba(245,240,232,.6)";
          }}
        >
          {label}
        </button>
      ))}

      {/* Info strip */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        textAlign: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <div style={{ width: 18, height: 1, background: "rgba(201,110,133,.5)" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c96e85", opacity: 0.7 }} />
          <div style={{ width: 18, height: 1, background: "rgba(232,212,168,.4)" }} />
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
          color: "#c96e85", margin: 0,
        }}>
          {item.label}
        </p>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.05em", color: "#f5f0e8", margin: 0,
        }}>
          {item.title}
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 9, letterSpacing: "0.22em",
          color: "rgba(245,240,232,.2)", margin: 0,
        }}>
          {pad(index + 1)} / {pad(items.length)}
        </p>
      </div>

      <style>{`@keyframes lbFadeIn { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  );
}

// ─── GALLERY CARD ────────────────────────────────────────────────────────────
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), index * 50 + 60);
    return () => clearTimeout(t);
  }, [index]);

  const gridClass =
    item.size === "tall" ? "row-span-2" :
    item.size === "wide" ? "col-span-2" : "";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={gridClass}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: "#1a1610",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "none" : "translateY(16px) scale(0.98)",
        transition: "opacity .5s ease, transform .65s cubic-bezier(.23,1,.32,1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.title}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: hovered ? "scale(1.0)" : "scale(1.08)",
          filter: hovered
            ? "brightness(1.0) saturate(1.1) contrast(1.02)"
            : "brightness(0.55) saturate(0.75)",
          transition: "transform 1.2s cubic-bezier(.23,1,.32,1), filter .6s ease",
        }}
      />

      {/* Top shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(to right, transparent, #c96e85, #e8d4a8, transparent)",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "opacity .4s, transform .6s cubic-bezier(.23,1,.32,1)",
      }} />

      {/* Left accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 2,
        background: "linear-gradient(to bottom, transparent, #c96e85, transparent)",
        opacity: hovered ? 0.8 : 0,
        transition: "opacity .5s .1s",
      }} />

      {/* Bottom overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "20px 22px",
        background: "linear-gradient(to top, rgba(20,15,10,.96) 0%, rgba(20,15,10,.3) 45%, transparent 100%)",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "none" : "translateY(8px)",
        transition: "opacity .45s cubic-bezier(.23,1,.32,1), transform .5s cubic-bezier(.23,1,.32,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <div style={{ width: 14, height: 1, background: "linear-gradient(to right, #c96e85, #e8d4a8)" }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#c96e85",
          }}>
            {item.label}
          </span>
        </div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.02em", color: "#f5f0e8", margin: 0, lineHeight: 1.1,
        }}>
          {item.title}
        </p>
      </div>

      {/* Index badge — idle */}
      <div style={{
        position: "absolute", top: 13, right: 13,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 9, letterSpacing: "0.14em",
        color: "rgba(232,212,168,.22)",
        opacity: hovered ? 0 : 1,
        transition: "opacity .3s",
      }}>
        {pad(index + 1)}
      </div>

      {/* Expand icon — hover */}
      <div style={{
        position: "absolute", top: 11, right: 11,
        width: 28, height: 28,
        border: "1px solid rgba(201,110,133,.5)",
        borderRadius: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "scale(1)" : "scale(0.6)",
        transition: "opacity .3s, transform .45s cubic-bezier(.23,1,.32,1)",
      }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M7 1h3v3M4 10H1V7M10 1L6 5M1 10l4-4" stroke="#c96e85" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}


export default function GalleryPage() {
  const [activeFilter,  setActiveFilter]  = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heroVisible,   setHeroVisible]   = useState(false);

  const cursorDotRef  = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);


  const filteredItems = GALLERY_ITEMS.filter((i) => matchCat(i, activeFilter));

  const openLightbox  = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox  = useCallback(
    () => setLightboxIndex((i) => ((i ?? 0) - 1 + filteredItems.length) % filteredItems.length),
    [filteredItems.length]
  );
  const nextLightbox  = useCallback(
    () => setLightboxIndex((i) => ((i ?? 0) + 1) % filteredItems.length),
    [filteredItems.length]
  );

  return (
    <>
     <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
 
.rs {
  --wine:      #3a1c20;
  --wine-mid:  #48242a;
  --wine-hi:   #5c2e35;
  --wine-low:  #2c1418;
  --rose:      #c96e85;
  --rose2:     #e0899e;
  --gold:      #c9a96e;
  --gold2:     #e0c490;
  --cream:     #f2ede4;
  --cream2:    #e8e2d8;
  --accent-rose: #8b5c66;
  --muted:     rgba(242,237,228,.32);
  --muted2:    rgba(242,237,228,.50);
  --muted3:    rgba(242,237,228,.72);
  --border:    rgba(242,237,228,.08);
 
}
 

.rs {
  width: 100%;
  min-height: 100vh;
  background: var(--wine);
  display: flex;
  flex-direction: column;
  font-family: 'Barlow Condensed', sans-serif;
  position: relative;
  overflow: hidden;
}
.rs::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 200px;
  pointer-events: none;
  z-index: 1;
  opacity: .45;
}

.rs-topbar {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 32px 52px 0;
  font-size: 9px;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--cream);
  line-height: 2.0;
}
.rs-topbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 9px;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--cream);
}
.rs-topbar-counter {
  font-size: 11px;
  color: var(--cream);
  letter-spacing: .1em;
}
.rs-topbar-counter strong {
  font-size: 18px;
  font-weight: 700;
  color: var(--cream);
  letter-spacing: 0;
}
 
/* ── main content ────────────────────────────────────────────── */
.rs-body {
  position: relative;
  z-index: 10;
  flex: 1;
  display: grid;
  /* CAMBIO 1: columna de foto más ancha */
  grid-template-columns: minmax(420px, 560px) 1fr 100px;
  grid-template-rows: 1fr;
  gap: 0;
  padding: 28px 0 28px 52px;
  align-items: center;
}
 
/* ── photo panel ─────────────────────────────────────────────── */
.rs-photo-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  justify-content: center;
}
.rs-photo-frame {
  position: relative;
  width: 100%;
  /* CAMBIO 2: proporción más cuadrada y altura máxima mayor */
  aspect-ratio: 4/5;
  max-height: 680px;
  overflow: hidden;
  border-radius: 3px;
  background: var(--wine-low);
  box-shadow:
    0 32px 80px rgba(0,0,0,.45),
    0 2px 8px rgba(0,0,0,.3),
    inset 0 0 0 1px rgba(255,255,255,.04);
}
.rs-photo-frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}
 
/* photo overlay gradient */
.rs-photo-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(44,20,24,.65) 100%
  );
  pointer-events: none;
}
 
/* image counter strip */
.rs-img-strip {
  position: absolute;
  bottom: 20px;
  left: 18px; right: 18px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rs-img-btns {
  display: flex;
  gap: 8px;
}
.rs-img-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.22);
  background: rgba(20,8,10,.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: rgba(255,255,255,.8);
  font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: border-color .2s, background .2s, transform .15s;
}
.rs-img-btn:hover {
  border-color: rgba(255,255,255,.55);
  background: rgba(20,8,10,.55);
  transform: scale(1.1);
}
.rs-img-count {
  font-size: 9px;
  letter-spacing: .18em;
  color: rgba(255,255,255,.35);
}
 
/* gold progress */
.rs-progress-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(255,255,255,.08);
  z-index: 5;
}
.rs-progress-fill {
  height: 100%;
  background: linear-gradient(to right, var(--gold), var(--gold2));
  transition: width .4s cubic-bezier(.4,0,.2,1);
}
 
/* thumb strip below photo */
.rs-thumbs {
  display: flex;
  gap: 6px;
  width: 100%;
}
.rs-thumb {
  flex: 1;
  aspect-ratio: 1;
  max-width: 52px;
  border-radius: 2px;
  overflow: hidden;
  cursor: pointer;
  opacity: .38;
  transition: opacity .2s, transform .2s;
  border: 1px solid transparent;
}
.rs-thumb.active {
  opacity: 1;
  border-color: var(--gold);
}
.rs-thumb:hover:not(.active) { opacity: .65; transform: translateY(-2px); }
.rs-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
 
/* ── info panel ──────────────────────────────────────────────── */
.rs-info {
  padding: 24px 48px 24px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.rs-eyebrow {
  font-size: 9px;
  letter-spacing: .32em;
  text-transform: uppercase;
  color: var(--cream);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.rs-eyebrow::before {
  content: '';
  width: 24px; height: 1px;
  background: linear-gradient(to right, var(--gold), transparent);
  flex-shrink: 0;
}
.rs-room-name {
  font-size: clamp(18px, 1vw, 14px);
  font-weight: 700;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 8px;
}
.rs-title {
  font-weight: 900;
  font-size: clamp(36px, 5vw, 72px);
  line-height: .88;
  text-transform: uppercase;
  color: var(--cream);
  margin-bottom: 8px;
  letter-spacing: -.02em;
}
.rs-title-sub {
  font-weight: 300;
  font-size: clamp(22px, 3vw, 48px);
  line-height: .9;
  text-transform: uppercase;
  letter-spacing: .04em;
  color: var(--cream);
  opacity: .32;
  margin-bottom: 32px;
}
 
.rs-divider {
  width: 40px;
  height: 1px;
  background: linear-gradient(to right, var(--gold), transparent);
  margin-bottom: 28px;
}
 
.rs-desc {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300;
  font-style: italic;
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.85;
  color: var(--cream);
  max-width: 480px;
  margin-bottom: 36px;
}
 
/* features */
.rs-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 36px;
  margin-bottom: 40px;
  max-width: 560px;
}
.rs-feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 9px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--cream);
  line-height: 1.6;
}
.rs-feature-bullet {
  width: 3px; height: 3px;
  border-radius: 50%;
  background: var(--rose);
  flex-shrink: 0;
  margin-top: 5px;
  opacity: .65;
}
 
/* actions */
.rs-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.rs-btn-reserve {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 36px;
  border-radius: 2px;
  border: 1px solid var(--rose);
  background: transparent;
  color: var(--rose2);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 9px;
  letter-spacing: .32em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .25s, color .25s, border-color .25s;
  text-decoration: none;
}
.rs-btn-reserve:hover {
  background: var(--rose);
  color: var(--wine);
  border-color: var(--rose);
}
.rs-btn-details {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 9px;
  letter-spacing: .28em;
  text-transform: uppercase;
  color: var(--cream);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  transition: color .2s;
  text-decoration: none;
}
.rs-btn-details::after {
  content: '→';
  font-size: 12px;
  transition: transform .2s;
}
.rs-btn-details:hover {
  color: var(--cream);
}
.rs-btn-details:hover::after { transform: translateX(4px); }
 
/* ── NEXT column ─────────────────────────────────────────────── */
.rs-next-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 8px;
  padding-right: 28px;
  align-self: flex-start;
  gap: 14px;
}
.rs-next-btn {
  width: 78px; height: 78px;
  border-radius: 50%;
  background: var(--accent-rose);
  border: 1px solid var(--border);
  color: var(--cream);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 8px;
  letter-spacing: .24em;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  transition: background .25s, color .25s, border-color .25s, transform .3s;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.rs-next-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(var(--rose) var(--prog, 0%), transparent 0%);

  transition: --prog .3s;
}
.rs-next-btn:hover {
  background: var(--wine-hi);
  color: var(--cream);
  border-color: rgba(201,110,133,.3);
  transform: scale(1.07);
}
.rs-next-arrow { font-size: 15px; line-height: 1; }
 
/* ── tabs ────────────────────────────────────────────────────── */
.rs-tabs {
  position: relative;
  z-index: 10;
  display: flex;
  border-top: 1px solid var(--border);
  overflow-x: auto;
  scrollbar-width: none;
}
.rs-tabs::-webkit-scrollbar { display: none; }
.rs-tab {
  flex: 1;
  min-width: max-content;
  padding: 16px 24px;
  text-align: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 9px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--muted);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color .25s, border-color .25s, background .25s;
  white-space: nowrap;
}
.rs-tab.active {
  color: var(--cream);
  border-bottom-color: var(--rose);
  background: rgba(201,110,133,.04);
}
.rs-tab:hover:not(.active) { color: var(--muted3); }
 
 
/* ── tablet landscape (≤1200px) ── */
@media (max-width: 1200px) {
  .rs-topbar { padding: 28px 36px 0; }
  .rs-body {
    /* CAMBIO 3: mantener foto grande en tablet landscape */
    grid-template-columns: minmax(340px, 460px) 1fr 80px;
    padding: 24px 0 24px 36px;
  }
  .rs-info { padding: 20px 32px 20px 40px; }
  .rs-next-col { padding-right: 16px; }
}
 
/* ── tablet portrait (≤900px) ── */
@media (max-width: 900px) {
  .rs-body {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    padding: 20px 28px;
    gap: 32px;
  }
  .rs-photo-wrap {
    max-width: 520px;
    margin: 0 auto;
    width: 100%;
  }
  /* CAMBIO 4: foto más alta en tablet portrait */
  .rs-photo-frame { max-height: 520px; }
  .rs-info {
    padding: 0;
    max-width: 100%;
  }
  .rs-next-col { display: none; }
  .rs-actions { gap: 16px; }
  .rs-btn-next-mobile {
    display: inline-flex !important;
  }
}
 
/* ── mobile (≤600px) ── */
@media (max-width: 600px) {
  .rs-topbar {
    padding: 20px 20px 0;
    font-size: 8px;
  }
  .rs-topbar-right { gap: 12px; }
  .rs-body { padding: 16px 20px; gap: 24px; }
  /* CAMBIO 5: foto más alta en móvil */
  .rs-photo-frame { max-height: 440px; }
  .rs-thumbs { display: none; }
  .rs-info { padding: 0; }
  .rs-title { font-size: clamp(32px, 9vw, 48px); }
  .rs-title-sub { font-size: clamp(18px, 5.5vw, 32px); }
  .rs-desc { font-size: 14px; }
  .rs-features { grid-template-columns: 1fr; gap: 8px; }
  .rs-tab { padding: 14px 14px; font-size: 8px; letter-spacing: .12em; }
  .rs-eyebrow { margin-bottom: 12px; }
  .rs-divider { margin-bottom: 20px; }
}
 
/* mobile next btn (hidden on desktop) */
.rs-btn-next-mobile {
  display: none;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 2px;
  border: 1px solid var(--border);
  background: var(--wine-mid);
  color: var(--cream);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 9px;
  letter-spacing: .24em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .25s, color .25s;
}
.rs-btn-next-mobile:hover {
  background: var(--wine-hi);
  color: var(--cream);
}
        `}</style>
     
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999,
          pointerEvents: "none", mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f5f0e8" }} />
      </div>
      <div
        ref={cursorRingRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9998,
          pointerEvents: "none",
          width: 44, height: 44, borderRadius: "50%",
          border: "1px solid rgba(201,110,133,.55)",
          transform: "translate(-50%, -50%)",
          transition: "width .3s, height .3s",
        }}
      />

      <section style={{
        position: "relative",
        background: "#4b2727",
        padding: "64px 48px 52px",
        overflow: "hidden",
      }}>

        <div style={{
          position: "absolute", inset: 0,
        
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
        
            fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(201,110,133,.75)",
            margin: "0 0 20px",
            display: "flex", alignItems: "center", gap: 12,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(10px)",
            transition: "opacity .7s .25s, transform .7s .25s",
          }}>
            <span style={{ display: "inline-block", width: 32, height: 1, background: "rgba(201,110,133,.5)" }} />
            02 — Galería · Villa Alta · Cartagena de Indias
          </p>


          <h2
              className="rs-title"
              dangerouslySetInnerHTML={{ __html: "NUESTA GALLERIA".split(" ").slice(0, 3).join(" ") }}
            />
          <div style={{
            height: 1, width: 64, margin: "20px 0 16px",
            background: "linear-gradient(to right, #c96e85, #e8d4a8)",
            transformOrigin: "left",
            animation: heroVisible ? "lineGrow .9s .85s cubic-bezier(.23,1,.32,1) both" : "none",
          }} />
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 16,
            color: "rgba(245,240,232,.35)",
            margin: 0,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(8px)",
            transition: "opacity .7s 1.1s, transform .7s 1.1s",
          }}>
            Cada rincón cuenta una historia.
          </p>
        </div>
        <div style={{
          position: "absolute", bottom: 52, right: 48,
          textAlign: "right", zIndex: 1,
          opacity: heroVisible ? 1 : 0,
          transition: "opacity .7s 1.3s",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 64, fontWeight: 900,
            color: "rgba(232,212,168,.05)",
            margin: 0, lineHeight: 1,
          }}>
            {GALLERY_ITEMS.length}
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(201,110,133,.35)", margin: 0,
          }}>
            fotografías
          </p>
        </div>
      </section>

      <div style={{
        display: "flex",
        background: "#4b2727",
        borderBottom: "1px solid rgba(201,110,133,.1)",
      }}>
        {CATEGORIES.map((cat) => {
          const count = cat.key === "all"
            ? GALLERY_ITEMS.length
            : GALLERY_ITEMS.filter((i) => i.cat === cat.key).length;
          const active = activeFilter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              style={{
                flex: 1,
                padding: "20px 0",
                textAlign: "center",
                background: active ? "rgba(201,110,133,.1)" : "transparent",
                border: "none",
                borderRight: "1px solid rgba(245,240,232,.06)",
                cursor: "pointer",
                transition: "background .3s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "rgba(201,110,133,.06)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic", fontSize: 11,
                color: "rgba(201,110,133,.55)", marginBottom: 4,
              }}>
                {cat.roman}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
                color: "rgba(245,240,232,.55)",
              }}>
                {cat.name}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 8, letterSpacing: "0.14em",
                color: "rgba(201,110,133,.4)", marginTop: 3,
              }}>
                {count}
              </div>
            </button>
          );
        })}
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        height: 60,
        position: "sticky",
        top: 80,
        zIndex: 50,
        background: "rgba(245,240,232,.96)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(201,110,133,.12)",
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(26,22,16,.45)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "#c96e85", fontSize: 13,
          }}>
            Villa Alta
          </span>
          — Espacios &amp; Experiencias
        </span>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(26,22,16,.35)", margin: 0,
        }}>
          <span style={{ color: "#c96e85", fontWeight: 500 }}>{filteredItems.length}</span>
          {" "}/ {GALLERY_ITEMS.length} espacios
        </p>
      </div>

      <div style={{ padding: 3, background: "#f5f0e8" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 3,
          gridAutoRows: 240,
        }}>
          {GALLERY_ITEMS.map((item, i) => {
            const visible = matchCat(item, activeFilter);
            const filtIdx = filteredItems.indexOf(item);
            return visible ? (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => openLightbox(filtIdx)}
              />
            ) : (
            
              <div
                key={item.id}
                className={
                  item.size === "tall" ? "row-span-2" :
                  item.size === "wide" ? "col-span-2" : ""
                }
                style={{ opacity: 0, pointerEvents: "none" }}
              />
            );
          })}
        </div>

        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "60px 0 64px", gap: 10,
        }}>
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none">
            <line x1="0" y1="10" x2="44" y2="10" stroke="url(#fgL)" strokeWidth="0.5"/>
            <circle cx="52" cy="10" r="2" fill="#c96e85" opacity="0.4"/>
            <circle cx="60" cy="10" r="3" fill="#c96e85" opacity="0.65"/>
            <circle cx="68" cy="10" r="2" fill="#e8d4a8" opacity="0.4"/>
            <line x1="76" y1="10" x2="120" y2="10" stroke="url(#fgR)" strokeWidth="0.5"/>
            <defs>
              <linearGradient id="fgL" x1="0" y1="0" x2="44" y2="0">
                <stop offset="0%" stopColor="#f5f0e8"/>
                <stop offset="100%" stopColor="#c96e85" stopOpacity="0.4"/>
              </linearGradient>
              <linearGradient id="fgR" x1="0" y1="0" x2="44" y2="0">
                <stop offset="0%" stopColor="#e8d4a8" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#f5f0e8"/>
              </linearGradient>
            </defs>
          </svg>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 8, letterSpacing: "0.32em", textTransform: "uppercase",
            color: "rgba(201,110,133,.4)", margin: 0,
          }}>
            Villa Alta · Cartagena de Indias
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic", fontSize: 14,
            color: "rgba(26,22,16,.15)", margin: 0,
          }}>
            Casa de huéspedes en el corazón del Centro Histórico
          </p>
        </div>
      </div>

    
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </>
  );
}