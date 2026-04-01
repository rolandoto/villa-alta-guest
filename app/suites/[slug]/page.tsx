import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROOMS } from "@/app/data/hotel";
import { buildMetadata } from "@/app/lib/seo";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Metadata {
  const room = ROOMS.find(async (item) => item.slug === (await params).slug);

  if (!room) {
    return buildMetadata({
      title: "Suite no encontrada | Villa Alta Guest House",
      description: "La suite solicitada no se encuentra disponible en Villa Alta.",
      path: "/suites",
    });
  }

  return buildMetadata({
    title: `${room.title} ${room.number} | Villa Alta Cartagena`,
    description: room.description,
    path: `/suites/${room.slug}`,
    keywords: [
      `suite ${room.number} cartagena`,
      room.title.toLowerCase(),
      "hotel boutique cartagena",
      "villa alta",
    ],
    image: room.images[0],
  });
}

export default async function SuiteDetailPage({
  params,
}: {
  params:  Promise<{ slug: string }>;
}) {
 const { slug } = await params;
  const room = ROOMS.find((item) => item.slug === slug);

  if (!room) notFound();

  const half = Math.ceil(room.features.length / 2);
  const colA = room.features.slice(0, half);
  const colB = room.features.slice(half);

  return (
    <>
      {/* ── inline global styles ──────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Barlow:wght@300;400&display=swap');

        :root {
          --bg:        #160b0b;
          --bg-card:   rgba(255,255,255,.03);
          --border:    rgba(240,230,220,.13);
          --cream:     #f0e8de;
          --cream-dim: rgba(240,232,222,.6);
          --accent:    #c4697a;
          --gold:      #c8aa80;
          --hero:      'Barlow Condensed', sans-serif;
          --italic:    'Cormorant Garamond', serif;
          --sans:      'Barlow', sans-serif;
        }

        /* ── back button ── */
        .sd-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 9px 18px;
          font-family: var(--hero);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--cream-dim);
          text-decoration: none;
          transition: border-color .25s, color .25s;
        }
        .sd-back:hover { border-color: var(--cream-dim); color: var(--cream); }

        /* ── suite label (dash + text) ── */
        .sd-label {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: var(--hero);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .26em;
          text-transform: uppercase;
          color: var(--cream-dim);
          margin: 0;
        }
        .sd-label::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: currentColor;
          opacity: .5;
        }

        /* ── subheading (pink) ── */
        .sd-subhead {
          font-family: var(--hero);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .3em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0;
        }

        /* ── hero title ── */
        .sd-title {
          font-family: var(--hero);
          font-weight: 900;
          font-size: clamp(52px, 7vw, 88px);
          line-height: .9;
          text-transform: uppercase;
          color: var(--cream);
          margin: 0;
        }

        /* ── italic description ── */
        .sd-desc {
          font-family: var(--italic);
          font-style: italic;
          font-size: 16px;
          line-height: 1.9;
          color: var(--cream-dim);
          max-width: 560px;
          margin: 0;
        }

        /* ── feature list ── */
        .sd-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px 28px;
          margin: 0;
          padding: 0;
        }
        .sd-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--hero);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--cream-dim);
          list-style: none;
        }
        .sd-feature::before {
          content: '•';
          color: var(--accent);
          font-size: 14px;
          line-height: 1;
          flex-shrink: 0;
        }

        /* ── CTA buttons ── */
        .sd-btn-reservar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 30px;
          border: 1px solid var(--cream);
          background: transparent;
          color: var(--cream);
          font-family: var(--hero);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .28em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background .25s, color .25s;
        }
        .sd-btn-reservar:hover { background: var(--cream); color: var(--bg); }

        .sd-btn-ver {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--hero);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--cream-dim);
          text-decoration: none;
          transition: color .25s;
        }
        .sd-btn-ver:hover { color: var(--cream); }
        .sd-btn-ver:hover .sd-arr { transform: translateX(5px); }
        .sd-arr { display: inline-block; transition: transform .25s; }

        /* ── gallery grid ── */
        .sd-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 8px;
        }
        .sd-gallery figure {
          margin: 0;
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .sd-gallery figure:first-child {
          grid-column: span 2;
          aspect-ratio: 16/9;
        }
        .sd-gallery figure img {
          transition: transform .55s ease;
        }
        .sd-gallery figure:hover img {
          transform: scale(1.04);
        }

        /* ── thin accent divider ── */
        .sd-divider {
          width: 36px;
          height: 2px;
          background: var(--accent);
          opacity: .8;
        }

        /* ── responsive ── */
        @media (max-width: 860px) {
          .sd-main-grid { grid-template-columns: 1fr !important; }
          .sd-gallery figure:first-child { grid-column: span 1; aspect-ratio: 4/3; }
        }
      `}</style>

      {/* ── PAGE ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "120px 24px 100px",
          background: "var(--bg)",
          minHeight: "100vh",
          color: "var(--cream)",
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* ── back ── */}
          <Link href="/suites" className="sd-back" style={{ marginBottom: 44 }}>
            ← Volver a suites
          </Link>

          {/* ── two-column: info left | card right ── */}
          <div
            className="sd-main-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 52,
              alignItems: "start",
              marginBottom: 60,
            }}
          >
            {/* LEFT — all text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p className="sd-label">
                Villa Alta · Suite {String(room.number).padStart(2, "0")} de{" "}
                {String(ROOMS.length).padStart(2, "0")}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <p className="sd-subhead">{room.subtitle}</p>
                <h1 className="sd-title">{room.title}</h1>
              </div>

              <div className="sd-divider" />

              <p className="sd-desc">{room.longDescription}</p>

              {/* features two columns */}
              <ul className="sd-features">
                {colA.map((f) => (
                  <li key={f} className="sd-feature">{f}</li>
                ))}
                {colB.map((f) => (
                  <li key={f} className="sd-feature">{f}</li>
                ))}
              </ul>

              {/* CTA row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
                  marginTop: 6,
                }}
              >
                <Link target="_blank" href="https://villa-alta.vercel.app/" className="sd-btn-reservar">
                  Reservar
                </Link>
               
              </div>
            </div>

            {/* RIGHT — amenities card */}
            <div
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--hero)",
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: ".28em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Incluye
              </p>
              <div className="sd-divider" style={{ width: 24 }} />
              <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {room.features.map((f) => (
                  <li key={f} className="sd-feature">{f}</li>
                ))}
              </ul>
              <Link
              target="_blank" href="https://villa-alta.vercel.app/"
                className="sd-btn-reservar"
                style={{ marginTop: 8 }}
              >
                Reservar esta suite
              </Link>
            </div>
          </div>

          {/* ── gallery ── */}
          <div className="sd-gallery">
            {room.images.map((src, i) => (
              <figure key={src + i}>
                <Image
                  src={src}
                  alt={`${room.title} ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}