"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ROOMS } from "@/app/data/hotel";

export default function RoomsShowcase() {
  const [curRoom, setCurRoom] = useState(0);
  const [curImg,  setCurImg]  = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  const room  = ROOMS[curRoom];
  const total = ROOMS.length;
  const half  = Math.ceil(room.features.length / 2);
  const col1  = room.features.slice(0, half);
  const col2  = room.features.slice(half);

  /* ── room switch ──────────────────────────────────────────────── */
  function switchRoom(i: number) {
    if (i === curRoom) return;
    const panel = infoRef.current;
    if (!panel) return;
    gsap.to(panel, {
      opacity: 0, y: 16, duration: 0.28, ease: "power2.in",
      onComplete: () => {
        setCurRoom(i);
        setCurImg(0);
        gsap.fromTo(panel, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.52, ease: "expo.out" });
      },
    });
  }
  const nextRoom = () => switchRoom((curRoom + 1) % total);

  /* ── image nav ────────────────────────────────────────────────── */
  function navImg(d: number) {
    const next = (curImg + d + room.images.length) % room.images.length;
    const img  = imgRef.current;
    if (img) {
      gsap.to(img, {
        opacity: 0, scale: 1.04, duration: 0.22,
        onComplete: () => {
          setCurImg(next);
          gsap.to(img, { opacity: 1, scale: 1, duration: 0.46, ease: "expo.out" });
        },
      });
    } else { setCurImg(next); }
  }

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
      <section className="rs">
        <header className="rs-topbar">
          <div>
            Villa Alta Guest House, 2026<br />
            (Habitaciones)
          </div>
          <div className="rs-topbar-right">
            <div className="rs-topbar-counter">
              <strong>0{curRoom + 1}</strong>
              <span style={{ opacity: .3, margin: "0 4px" }}>/</span>
              0{total}
            </div>
            <span>Room</span>
          </div>
        </header>
        <div className="rs-body">
          <div className="rs-photo-wrap">
            <div className="rs-photo-frame">
              <img ref={imgRef} src={room.images[curImg]} alt={room.title} />
              <div className="rs-img-strip">
                <div className="rs-img-btns">
                  <button className="rs-img-btn" onClick={() => navImg(-1)} aria-label="Anterior">←</button>
                  <button className="rs-img-btn" onClick={() => navImg(1)}  aria-label="Siguiente">→</button>
                </div>
                <span className="rs-img-count">{curImg + 1} / {room.images.length}</span>
              </div>

              <div className="rs-progress-bar">
                <div
                  className="rs-progress-fill"
                  style={{ width: `${((curImg + 1) / room.images.length) * 100}%` }}
                />
              </div>
            </div>

            {room.images.length > 1 && (
              <div className="rs-thumbs">
                {room.images.slice(0, 6).map((src, i) => (
                  <div
                    key={i}
                    className={`rs-thumb${i === curImg ? " active" : ""}`}
                    onClick={() => setCurImg(i)}
                  >
                
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div ref={infoRef} className="rs-info">
            <div className="rs-eyebrow">
              Villa Alta · Suite {room.number} de {String(total).padStart(2, "0")}
            </div>

            <div className="rs-room-name">{room.title}</div>

            <h2
              className="rs-title"
              dangerouslySetInnerHTML={{ __html: room.subtitle.split(" ").slice(0, 3).join(" ") }}
            />
            <div
              className="-title-sub"
              dangerouslySetInnerHTML={{ __html: room.subtitle.split(" ").slice(3).join(" ") || "&nbsp;" }}
            />

            <div className="rs-divider" />

            <p className="rs-desc">{room.longDescription}</p>

            <div className="rs-features">
              {col1.map((f) => (
                <div key={f} className="rs-feature">
                  <span className="rs-feature-bullet" />
                  {f}
                </div>
              ))}
              {col2.map((f) => (
                <div key={f} className="rs-feature">
                  <span className="rs-feature-bullet" />
                  {f}
                </div>
              ))}
            </div>

            <div className="rs-actions">
              <Link href={`/suites/${room.slug}`} className="rs-btn-reserve">
                Reservar
              </Link>
              <Link href={`/suites/${room.slug}`} className="rs-btn-details">
                Ver suite completa
              </Link>
          
              <button className="rs-btn-next-mobile" onClick={nextRoom}>
               Siguiente →
              </button>
            </div>
          </div>

          <div className="rs-next-col">
            <button className="rs-next-btn" onClick={nextRoom} aria-label="Next room">
              <span>Siguiente</span>
              <span className="rs-next-arrow">→</span>
            </button>
          </div>

        </div>

        <nav className="rs-tabs" aria-label="Rooms">
          {ROOMS.map((r, i) => (
            <button
              key={r.id}
              className={`rs-tab${i === curRoom ? " active" : ""}`}
              onClick={() => switchRoom(i)}
            >
              {r.subtitle?.includes("Sencilla") ? "Hab. 7" : `${r.subtitle}`}
            </button>
          ))}
        </nav>

      </section>
    </>
  );
}