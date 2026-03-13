"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
export interface HeroSlide {
  imgLeft: string;
  imgCenter: string;
  imgRight: string;
  imgTitle: string;
  title: string;
  subtitle: string;
  location: string;
  tag?: string;
  year?: string | number;
}

// ─── Default slides ───────────────────────────────────────────────────────────
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    imgLeft:   "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    imgCenter: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
    imgRight:  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imgTitle:  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80",
    title: "VILLA ALTA",
    subtitle: "Guest House",
    location: "Cartagena",
    tag: "Architectural Heritage",
    year: 2026,
  },
  {
    imgLeft:   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    imgCenter: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
    imgRight:  "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80",
    imgTitle:  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80",
    title: "CASA MAR",
    subtitle: "Boutique Hotel",
    location: "Santa Marta",
    tag: "Coastal Retreat",
    year: 2026,
  },
  {
    imgLeft:   "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    imgCenter: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
    imgRight:  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
    imgTitle:  "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1600&q=80",
    title: "HACIENDA",
    subtitle: "Private Estate",
    location: "Barichara",
    tag: "Colonial Heritage",
    year: 2026,
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface GalleryHeroSliderProps {
  slides?: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function GalleryHeroSlider({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  autoPlayInterval = 6000,
}: GalleryHeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const sectionRef   = useRef<HTMLDivElement>(null);
  const imgLeftRef   = useRef<HTMLDivElement>(null);
  const imgCenterRef = useRef<HTMLDivElement>(null);
  const imgRightRef  = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const btnRef       = useRef<HTMLDivElement>(null);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = slides[current];

  // ─── Slide transition ─────────────────────────────────────────────────────
  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setTransitioning(true);

      const targets = [
        imgLeftRef.current,
        imgCenterRef.current,
        imgRightRef.current,
        titleRef.current,
        subtitleRef.current,
      ];

      gsap.to(targets, {
        opacity: 0,
        y: -14,
        duration: 0.38,
        ease: "power3.in",
        stagger: 0.03,
        onComplete: () => {
          setCurrent(index);
          gsap.fromTo(
            targets,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.58,
              ease: "power3.out",
              stagger: 0.055,
              onComplete: () => setTransitioning(false),
            }
          );
        },
      });
    },
    [current, transitioning]
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [goTo, current, slides.length]
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [goTo, current, slides.length]
  );

  // ─── AutoPlay ──────────────────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoPlay) timerRef.current = setInterval(next, autoPlayInterval);
  }, [autoPlay, autoPlayInterval, next]);

  useEffect(() => {
    if (autoPlay) timerRef.current = setInterval(next, autoPlayInterval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // ─── GSAP scroll parallax ─────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.4,
          pin: true,
        },
      });
      tl.to(imgLeftRef.current,   { x: "-22vw", y: -60, scale: 0.88, ease: "none" }, 0);
      tl.to(imgCenterRef.current, { y: -80,              scale: 0.92, ease: "none" }, 0);
      tl.to(imgRightRef.current,  { x: "22vw",  y: -60, scale: 0.88, ease: "none" }, 0);
      tl.to(titleRef.current,     { scale: 0.9, opacity: 0.5, ease: "none" }, 0);
      tl.to(subtitleRef.current,  { y: 30, opacity: 0, ease: "none" }, 0);
      tl.to(btnRef.current,       { y: 50, opacity: 0, ease: "none" }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,200;0,400;0,700;0,900;1,200&display=swap');

        .ghs-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #eae6df;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ─── top bar ─── */
        .ghs-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          z-index: 40;
        }
        .ghs-topbar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 48px; right: 48px;
          height: 1px;
          background: rgba(150,144,135,.18);
        }
        .ghs-brand {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: .32em;
          text-transform: uppercase;
          color: #635e57;
        }
        .ghs-tag-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #a09890;
        }
        .ghs-tag-label span {
          margin: 0 6px;
          opacity: .45;
        }
        .ghs-topnav {
          display: flex;
          gap: 28px;
        }
        .ghs-topnav a {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #a09890;
          text-decoration: none;
          transition: color .2s;
          cursor: pointer;
        }
        .ghs-topnav a:hover { color: #3c3830; }

        /* ─── photos ─── */
        .ghs-photo {
          position: absolute;
          overflow: hidden;
          border-radius: 3px;
          box-shadow: 0 20px 60px rgba(0,0,0,.16), 0 4px 14px rgba(0,0,0,.07);
          will-change: transform;
        }
        .ghs-photo img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .ghs-photo-left {
          width: clamp(190px, 19vw, 310px);
          height: clamp(270px, 43vh, 490px);
          left: clamp(40px, 7vw, 110px);
          top: calc(50% - 24px);
          transform: translateY(-50%);
          z-index: 5;
        }
        .ghs-photo-center {
          width: clamp(310px, 31vw, 520px);
          height: clamp(390px, 62vh, 660px);
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
        }
        .ghs-photo-right {
          width: clamp(190px, 19vw, 310px);
          height: clamp(270px, 43vh, 490px);
          right: clamp(40px, 7vw, 110px);
          top: calc(50% + 24px);
          transform: translateY(-50%);
          z-index: 5;
        }

        /* ─── title ─── */
        .ghs-title-wrap {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
          pointer-events: none;
          white-space: nowrap;
        }
        .ghs-clip-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(96px, 15.5vw, 250px);
          letter-spacing: -.025em;
          text-transform: uppercase;
          line-height: .95;
          background-size: cover;
          background-position: center;
          -webkit-background-clip: text;
          background-clip: text;
          color: rgba(14, 18, 30, 0.80);
          mix-blend-mode: multiply;
        }
        .ghs-subtitle {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 200;
          font-style: italic;
          font-size: clamp(11px, 1vw, 17px);
          letter-spacing: .72em;
          text-transform: uppercase;
          color: #948e85;
          margin-top: 12px;
          padding-right: .72em;
        }

        /* ─── bottom bar ─── */
        .ghs-bottombar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          z-index: 40;
          gap: 32px;
        }
        .ghs-bottombar::before {
          content: '';
          position: absolute;
          top: 0; left: 48px; right: 48px;
          height: 1px;
          background: rgba(150,144,135,.18);
        }

        /* counter */
        .ghs-counter {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          letter-spacing: .2em;
          color: #a09890;
          text-transform: uppercase;
          flex-shrink: 0;
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .ghs-counter-current {
          font-weight: 700;
          font-size: 22px;
          color: #504c46;
          letter-spacing: 0;
          line-height: 1;
        }
        .ghs-counter-sep { opacity: .3; }

        /* progress */
        .ghs-progress {
          flex: 1;
          display: flex;
          gap: 6px;
          align-items: center;
          min-width: 0;
        }
        .ghs-track {
          flex: 1;
          height: 1px;
          background: rgba(150,144,135,.25);
          position: relative;
          cursor: pointer;
          overflow: hidden;
        }
        .ghs-track::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #635e57;
          transform-origin: left;
          transform: scaleX(0);
        }
        .ghs-track.done::after {
          transform: scaleX(1);
          transition: none;
        }
        .ghs-track.active::after {
          transform: scaleX(1);
          transition: transform var(--dur) linear;
        }

        /* right side: location + cta */
        .ghs-right {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }
        .ghs-location {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 400;
          font-size: 11px;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: #a09890;
        }
        .ghs-cta-btn {
          padding: 10px 36px;
          border: 1px solid #c0bbb3;
          border-radius: 2px;
          background: transparent;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          letter-spacing: .38em;
          text-transform: uppercase;
          color: #726d65;
          cursor: pointer;
          transition: background .22s, border-color .22s, color .22s;
          white-space: nowrap;
        }
        .ghs-cta-btn:hover {
          background: rgba(0,0,0,.04);
          border-color: #88837b;
          color: #343028;
        }

        /* ─── arrow buttons — bottom corners, above the bar ─── */
        .ghs-arrows {
          position: absolute;
          bottom: 72px;
          display: flex;
          z-index: 40;
        }
        .ghs-arrows-left  { left: 48px; }
        .ghs-arrows-right { right: 48px; }

        .ghs-arrow-btn {
          width: 44px; height: 44px;
          background: rgba(234,230,223,0.85);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(150,144,135,.3);
          color: #726d65;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          transition: background .2s, color .2s, border-color .2s;
          letter-spacing: 0;
        }
        .ghs-arrow-btn:first-child {
          border-right: none;
        }
        .ghs-arrow-btn:hover {
          background: rgba(210,205,197,0.95);
          color: #1e1c18;
          border-color: rgba(100,95,88,.45);
        }

        .ghs-scroll-space {
          height: 120vh;
          background: #eae6df;
        }
      `}</style>

      <div ref={sectionRef} className="ghs-wrap">

        {/* top bar */}
        <header className="ghs-topbar">
          <span className="ghs-brand">{slide.subtitle} — {slide.year}</span>
          <div className="ghs-tag-label">
            <span>[</span>{slide.tag}<span>]</span>
          </div>
          <nav className="ghs-topnav">
            <a>Rooms</a>
            <a>Gallery</a>
            <a>Book</a>
          </nav>
        </header>

        {/* photos */}
        <div ref={imgLeftRef} className="ghs-photo ghs-photo-left">
          <img src={slide.imgLeft} alt="interior" />
        </div>
        <div ref={imgCenterRef} className="ghs-photo ghs-photo-center">
          <img src={slide.imgCenter} alt="main view" />
        </div>
        <div ref={imgRightRef} className="ghs-photo ghs-photo-right">
          <img src={slide.imgRight} alt="exterior" />
        </div>

        {/* clipped title */}
        <div className="ghs-title-wrap">
          <h1
            ref={titleRef}
            className="ghs-clip-title"
            style={{ backgroundImage: `url('${slide.imgTitle}')` }}
          >
            {slide.title}
          </h1>
          <p ref={subtitleRef} className="ghs-subtitle">{slide.subtitle}</p>
        </div>

        {/* bottom bar */}
        <footer ref={btnRef} className="ghs-bottombar">
          {/* counter */}
          <div className="ghs-counter">
            <span className="ghs-counter-current">0{current + 1}</span>
            <span className="ghs-counter-sep">/</span>
            <span>0{slides.length}</span>
          </div>

          {/* progress tracks */}
          <div className="ghs-progress">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`ghs-track${i === current ? " active" : i < current ? " done" : ""}`}
                style={{ "--dur": `${autoPlayInterval}ms` } as React.CSSProperties}
                onClick={() => { goTo(i); resetTimer(); }}
              />
            ))}
          </div>

          {/* location + CTA */}
          <div className="ghs-right">
            <span className="ghs-location">{slide.location}</span>
            <button className="ghs-cta-btn">Discover More</button>
          </div>
        </footer>

        {/* arrow pair — bottom left */}
        <div className="ghs-arrows ghs-arrows-left">
          <button
            className="ghs-arrow-btn"
            aria-label="Previous slide"
            onClick={() => { prev(); resetTimer(); }}
          >
            ←
          </button>
          <button
            className="ghs-arrow-btn"
            aria-label="Next slide"
            onClick={() => { next(); resetTimer(); }}
          >
            →
          </button>
        </div>

      </div>

      <div className="ghs-scroll-space" />
    </>
  );
}