"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    label: "01",
    tag: "PATRIMONIO ARQUITECTÓNICO",
    location: "CARTAGENA",
    left: "/FotosHotelVillaAlta/FOTOS/DSC06277.jpg",
    center: "/FotosHotelVillaAlta/FOTOS/DSC06378.jpg",
    rightTop: "/FotosHotelVillaAlta/FOTOS/DSC06299.jpg",
    rightBottom: "/FotosHotelVillaAlta/FOTOS/DSC06462.jpg",
  },
  {
    id: 1,
    label: "02",
    tag: "ESPACIOS PARA VIVIR",
    location: "GETSEMANÍ",
      left: "/FotosHotelVillaAlta/FOTOS/DSC06758.jpg",
    center: "/FotosHotelVillaAlta/FOTOS/DSC06779.jpg",
    rightTop: "/FotosHotelVillaAlta/FOTOS/DSC06784.jpg",
    rightBottom: "/FotosHotelVillaAlta/FOTOS/DSC06432.jpg",
  },
  {
    id: 2,
    label: "03",
    tag: "GASTRONOMÍA",
    location: "CIUDAD AMURALLADA",
      left: "/FotosHotelVillaAlta/FOTOS/DSC06506.jpg",
    center: "/FotosHotelVillaAlta/FOTOS/DSC06553.jpg",
    rightTop: "/FotosHotelVillaAlta/FOTOS/DSC06737.jpg",
    rightBottom: "/FotosHotelVillaAlta/FOTOS/DSC06754.jpg",
  },
];

const WORD1 = "VILLA".split("");
const WORD2 = "ALTA".split("");

export default function GalleryHeroSlider() {
  const [active, setActive] = useState(0);
  const isAnimating = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // refs
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  // letter refs for both text layers (dark + blend)
  const darkLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const blendLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // ── Entry ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    tl.fromTo(metaRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" });

    tl.fromTo(leftRef.current,
      { x: -70, opacity: 0, rotate: -5, scale: 0.93 },
      { x: 0, opacity: 1, rotate: -2, scale: 1, duration: 1.3, ease: "expo.out" },
      "-=0.4"
    );
    tl.fromTo(centerRef.current,
      { y: 70, opacity: 0, scale: 0.87 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" },
      "-=1.1"
    );
    tl.fromTo(rightRef.current,
      { x: 70, opacity: 0, rotate: 5, scale: 0.93 },
      { x: 0, opacity: 1, rotate: 2, scale: 1, duration: 1.3, ease: "expo.out" },
      "-=1.3"
    );

    // reveal letters — both layers simultaneously
    const allDark = darkLetterRefs.current.filter(Boolean);
    const allBlend = blendLetterRefs.current.filter(Boolean);
    tl.fromTo(
      [...allDark, ...allBlend],
      { clipPath: "inset(0 105% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.1, stagger: { each: 0.07, from: "start" }, ease: "expo.inOut" },
      "-=1"
    );

    tl.fromTo([subRef.current],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "expo.out" },
      "-=0.5"
    );

    // float
    gsap.to(centerRef.current, { y: -14, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }, []);

  // ── Mouse parallax ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 2;
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(leftRef.current, { x: dx * -22, y: dy * -10, rotate: -2 + dx * 2, duration: 1.7, ease: "power2.out" });
      gsap.to(centerRef.current, { x: dx * 9, y: dy * -15, duration: 2, ease: "power2.out" });
      gsap.to(rightRef.current, { x: dx * 22, y: dy * -10, rotate: 2 + dx * 2, duration: 1.7, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Slide transition ───────────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    if (isAnimating.current || idx === active) return;
    isAnimating.current = true;

    const cards = [leftRef.current, centerRef.current, rightRef.current];
    const allLetters = [
      ...darkLetterRefs.current.filter(Boolean),
      ...blendLetterRefs.current.filter(Boolean),
    ];

    const tl = gsap.timeline({
      onComplete: () => { setActive(idx); isAnimating.current = false; },
    });

    tl.to(cards, { scale: 0.92, filter: "blur(10px)", opacity: 0, duration: 0.42, stagger: 0.04, ease: "power3.in" });
    tl.to(allLetters, { clipPath: "inset(0 105% 0 0)", duration: 0.38, stagger: 0.04, ease: "power2.in" }, "-=0.28");

    tl.call(() => {
      const s = SLIDES[idx];
      wrapRef.current?.querySelectorAll<HTMLImageElement>("[data-img]").forEach((img) => {
        const k = img.dataset.img as keyof typeof s;
        if (typeof s[k] === "string") img.src = s[k] as string;
      });
    });

    tl.to(cards, { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.85, stagger: 0.06, ease: "expo.out" });
    tl.fromTo(allLetters,
      { clipPath: "inset(0 105% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1, stagger: 0.06, ease: "expo.inOut" },
      "-=0.65"
    );
  }, [active]);

  // ── Auto ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => goTo((active + 1) % SLIDES.length), 5500);
    return () => clearTimeout(t);
  }, [active, goTo]);

  const slide = SLIDES[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800;900&family=Montserrat:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        .gh-wrap {
          position: relative;
          width: 100%;
          height: 100dvh;
          background: #e8e2d9;
          overflow: hidden;
          /* isolation creates a new stacking context so mix-blend-mode works correctly */
          isolation: isolate;
        }

        /* ── CARD images ── */
        .gh-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .gh-card:hover .gh-img { transform: scale(1.05); }

        /* ── Letter base styles ── */
        .gh-letter-dark {
          display: inline-block;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(70px, 13.5vw, 200px);
          letter-spacing: -0.015em;
          line-height: 0.87;
          clip-path: inset(0 105% 0 0);
        }

        /* Dark layer — the actual dark text sitting ABOVE cards */
        .dark-letter { color: #22201d; }

        /* Blend letter — same geometry, bg color, multiply mode
           Where multiply(bg-color, photo) = photo shows through letters */
        .blend-letter {
          color: #e8e2d9;  /* same as background */
          mix-blend-mode: multiply;
        }

        /* discover button */
        .gh-btn {
          background: transparent;
          border: 1px solid rgba(34,32,29,0.3);
          border-radius: 999px;
          padding: 12px 38px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.52rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          color: #2a2620;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: color 0.4s;
        }
        .gh-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #22201d;
          border-radius: 999px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .gh-btn:hover::before { transform: scaleX(1); }
        .gh-btn:hover { color: #e8e2d9; }
        .gh-btn span { position: relative; z-index: 1; }

        .gh-dot-btn {
          background: none; border: none; padding: 5px; cursor: pointer;
          display: flex; align-items: center;
        }

        @media (max-width: 600px) {
          .gh-left-card, .gh-right-card { display: none !important; }
          .gh-center-card { width: 78vw !important; }
        }
      `}</style>

      <div
        ref={wrapRef}
        className="gh-wrap"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) dx < 0 ? goTo((active + 1) % SLIDES.length) : goTo((active - 1 + SLIDES.length) % SLIDES.length);
        }}
      >
        {/* ── TOP META ── */}
        <div ref={metaRef} style={{ opacity: 0, position: "absolute", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "clamp(14px,3vw,22px) clamp(18px,4vw,36px)" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.38rem,1.2vw,0.5rem)", letterSpacing: "0.22em", color: "#2a2620", fontWeight: 400 }}>
            VILLA ALTA CASA DE HUÉSPEDES, 2026
          </span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.38rem,1.2vw,0.5rem)", letterSpacing: "0.22em", color: "#2a2620", fontWeight: 400 }}>
            ({slide.tag})
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.38rem,1.2vw,0.5rem)", letterSpacing: "0.22em", color: "#2a2620", fontWeight: 400 }}>
            <span>{slide.label}</span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>{slide.location}</span>
          </div>
        </div>

      

        {/* ── LAYER 2: PHOTO CARDS ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Left */}
          <div ref={leftRef} className="gh-card gh-left-card" style={{ position: "absolute", left: "4%", top: "50%", transform: "translateY(-50%) rotate(-2deg)", width: "clamp(150px,18vw,270px)", opacity: 0, zIndex: 10 }}>
            <div style={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 18px 55px rgba(0,0,0,0.22)", aspectRatio: "3/4" }}>
              <img data-img="left" src={slide.left} alt="left" className="gh-img" />
            </div>
          </div>

          {/* Center */}
          <div ref={centerRef} className="gh-card gh-center-card" style={{ position: "relative", width: "clamp(210px,27vw,410px)", opacity: 0, zIndex: 12 }}>
            <div style={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 28px 75px rgba(0,0,0,0.28)", aspectRatio: "2/3" }}>
              <img data-img="center" src={slide.center} alt="center" className="gh-img" />
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="gh-card gh-right-card" style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%) rotate(2deg)", width: "clamp(150px,18vw,270px)", opacity: 0, zIndex: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 14px 45px rgba(0,0,0,0.2)", aspectRatio: "4/3" }}>
              <img data-img="rightTop" src={slide.rightTop} alt="right top" className="gh-img" />
            </div>
            <div style={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 14px 45px rgba(0,0,0,0.2)", aspectRatio: "4/3" }}>
              <img data-img="rightBottom" src={slide.rightBottom} alt="right bottom" className="gh-img" />
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", userSelect: "none" }}>
          <div style={{ display: "flex", lineHeight: 0.87 }}>
            {WORD1.map((ch, i) => (
              <span key={i} ref={(el) => { darkLetterRefs.current[i] = el; }} className="gh-letter-dark dark-letter">{ch}</span>
            ))}
            <span className="gh-letter-dark dark-letter" style={{ width: "0.22em" }} />
            {WORD2.map((ch, i) => (
              <span key={i + 6} ref={(el) => { darkLetterRefs.current[i + 6] = el; }} className="gh-letter-dark dark-letter">{ch}</span>
            ))}
          </div>
          <div ref={subRef} style={{ opacity: 0, marginTop: "0.55rem", textAlign: "center" }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(8px,1.4vw,17px)", letterSpacing: "0.48em", color: "rgba(42,38,32,0.55)", fontWeight: 300 }}>
              GUEST&nbsp;&nbsp;&nbsp;HOUSE
            </span>
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 30, pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none", mixBlendMode: "multiply" }}>
          <div style={{ display: "flex", lineHeight: 0.87 }}>
            {WORD1.map((ch, i) => (
              <span key={i} ref={(el) => { blendLetterRefs.current[i] = el; }} className="gh-letter-dark blend-letter">{ch}</span>
            ))}
            <span className="gh-letter-dark blend-letter" style={{ width: "0.22em" }} />
            {WORD2.map((ch, i) => (
              <span key={i + 6} ref={(el) => { blendLetterRefs.current[i + 6] = el; }} className="gh-letter-dark blend-letter">{ch}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "0 20px clamp(22px,4vw,38px)" }}>
          <Link href="/contacto" className="gh-btn" style={{ opacity: 1, pointerEvents: "auto" }}>
            <span>RESERVAR</span>
          </Link>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {SLIDES.map((_, i) => (
              <button key={i} className="gh-dot-btn" onClick={() => goTo(i)}>
                <div style={{ height: 5, width: i === active ? 22 : 5, borderRadius: 3, background: i === active ? "#22201d" : "rgba(34,32,29,0.22)", transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }} />
              </button>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.36rem", letterSpacing: "0.3em", color: "rgba(34,32,29,0.18)", whiteSpace: "nowrap", zIndex: 5, pointerEvents: "none" }}>
          VILLA ALTA — PATRIMONIO ARQUITECTÓNICO
        </div>
        <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Montserrat', sans-serif", fontSize: "0.36rem", letterSpacing: "0.3em", color: "rgba(34,32,29,0.18)", whiteSpace: "nowrap", zIndex: 5, pointerEvents: "none" }}>
          CARTAGENA DE INDIAS — COLOMBIA
        </div>
      </div>
    </>
  );
}