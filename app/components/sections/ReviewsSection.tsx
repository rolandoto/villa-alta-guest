"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVIEWS, RATING_BARS } from "@/app/data/hotel";

gsap.registerPlugin(ScrollTrigger);

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    gsap.from(titleRef.current, {
      y: 45, opacity: 0, duration: 1.1, ease: "expo.out",
      scrollTrigger: { trigger: section, start: "top 76%", toggleActions: "play none none reverse" },
    });

    // Review cards with IntersectionObserver
    const cards = section.querySelectorAll<HTMLElement>(".review-card");
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = parseInt((e.target as HTMLElement).dataset.delay ?? "0");
            setTimeout(() => (e.target as HTMLElement).classList.add("visible"), delay);
          }
        });
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => ro.observe(c));

    // Rating bars
    const bars = section.querySelectorAll<HTMLElement>(".bar-fill");
    const bo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const pct = (e.target as HTMLElement).dataset.pct ?? "0";
            gsap.to(e.target, { width: `${pct}%`, duration: 1.5, ease: "expo.out" });
            bo.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    bars.forEach((b) => bo.observe(b));

    return () => { ro.disconnect(); bo.disconnect(); };
  }, []);

  const delays = [0, 110, 220, 55, 165, 275];

  return (
    <>
      <style>{`
        /* ── Review card enter animation ── */
        .review-card {
          opacity: 0;
          transform: translateY(24px);
        }
        .review-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Section layout ── */
        .reviews-section {
          background: var(--cream);
          color: var(--navy2);
          padding: 100px 56px;
        }

        /* ── Top row ── */
        .reviews-top-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: flex-end;
          margin-bottom: 64px;
        }

        /* ── Cards grid ── */
        .reviews-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 56px;
        }

        /* ── Rating bars grid ── */
        .reviews-bars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px 56px;
          padding-top: 48px;
          border-top: 1px solid rgba(26,31,46,.08);
        }

        /* ── Score number ── */
        .reviews-score {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 96px;
          line-height: 1;
          color: var(--gold);
          letter-spacing: -.03em;
        }

        /* ────────────────────────────────────────
           TABLET  ≤ 1024px
        ──────────────────────────────────────── */
        @media (max-width: 1024px) {
          .reviews-section {
            padding: 80px 40px;
          }

          .reviews-top-row {
            gap: 40px;
            margin-bottom: 48px;
          }

          .reviews-score {
            font-size: 76px;
          }

          .reviews-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .reviews-bars-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px 40px;
          }
        }

        /* ────────────────────────────────────────
           MOBILE  ≤ 640px
        ──────────────────────────────────────── */
        @media (max-width: 640px) {
          .reviews-section {
            padding: 64px 20px;
          }

          .reviews-top-row {
            grid-template-columns: 1fr;
            gap: 24px;
            align-items: flex-start;
            margin-bottom: 36px;
          }

          /* Move score below title on mobile */
          .reviews-score-block {
            text-align: left !important;
          }

          .reviews-score {
            font-size: 72px;
          }

          .reviews-cards-grid {
            grid-template-columns: 1fr;
            gap: 2px;
            margin-bottom: 40px;
          }

          .reviews-bars-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            padding-top: 32px;
          }
        }
      `}</style>

      <section ref={sectionRef} id="resenas" className="reviews-section">
     
        <div className="reviews-top-row">
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 9,
              letterSpacing: ".24em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 14,
            }}>
              (04) Testimonios
            </div>
            <div
              ref={titleRef}
              style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(38px,7vw,95px)",
                lineHeight: 0.87,
                textTransform: "uppercase",
              }}
            >
              Hotel Boutique<br />en Cartagena:<br />Opiniones
            </div>
          </div>

          <div className="reviews-score-block" style={{ textAlign: "right" }}>
            <div className="reviews-score">9.4</div>
            <div style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: "italic",
              fontSize: 21,
              color: "var(--muted)",
              marginTop: -6,
            }}>
              Fabuloso
            </div>
          </div>
        </div>

        <div className="reviews-cards-grid">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="review-card"
              data-delay={String(delays[i] ?? 0)}
              style={{
                background: "rgba(26,31,46,.04)",
                border: "1px solid rgba(26,31,46,.055)",
                padding: "38px 32px",
                transition: `transform .75s ease ${delays[i]}ms, opacity .75s ease ${delays[i]}ms, background .3s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(26,31,46,.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(26,31,46,.04)")}
            >
              <div style={{ color: "var(--gold)", fontSize: 12, letterSpacing: 3, marginBottom: 16 }}>
                {"★".repeat(r.rating)}
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontStyle: "italic",
                fontSize: 17,
                lineHeight: 1.74,
                color: "var(--navy2)",
                marginBottom: 22,
              }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div style={{
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 10,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}>
                {r.author} · {r.country}
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-bars-grid">
          {RATING_BARS.map((b) => (
            <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "'Barlow Condensed',sans-serif",
                fontSize: 10,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}>
                <span>{b.label}</span>
                <span>{b.score}</span>
              </div>
              <div style={{ height: 2, background: "rgba(26,31,46,.08)", borderRadius: 1 }}>
                <div
                  className="bar-fill"
                  data-pct={String(b.pct)}
                  style={{
                    height: "100%",
                    background: "linear-gradient(to right,var(--gold),var(--gold2))",
                    borderRadius: 1,
                    width: 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}