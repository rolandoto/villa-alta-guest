import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROOMS } from "@/app/data/hotel";

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export default async function SuiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = ROOMS.find((item) => item.slug === slug);

  if (!room) notFound();

  return (
    <section style={{ padding: "130px 24px 80px", background: "#120f0f", minHeight: "100vh", color: "#f3ede3" }}>
      <div style={{ maxWidth: 1220, margin: "0 auto" }}>
        <Link href="/suites" style={{ ...btnBack }}>← Volver a suites</Link>

        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, alignItems: "start" }}>
          <div style={{ gridColumn: "span 2" }}>
            <p style={{ margin: 0, letterSpacing: ".24em", textTransform: "uppercase", fontSize: 12, color: "#d8b98f" }}>
              Suite {room.number}
            </p>
            <h1 style={{ margin: "12px 0", fontSize: "clamp(34px,6vw,76px)", lineHeight: 0.95, textTransform: "uppercase" }}>
              {room.title}
            </h1>
            <p style={{ margin: "0 0 12px", textTransform: "uppercase", letterSpacing: ".12em", fontSize: 12, color: "rgba(243,237,227,.7)" }}>
              {room.subtitle}
            </p>
            <p style={{ margin: 0, maxWidth: 860, lineHeight: 1.8, color: "rgba(243,237,227,.85)" }}>{room.longDescription}</p>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,.12)", borderRadius: 8, padding: 16, background: "rgba(255,255,255,.03)" }}>
            <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: ".16em", fontSize: 11, color: "#d8b98f" }}>Incluye</p>
            <ul style={{ margin: "10px 0 0", paddingLeft: 18, lineHeight: 1.9 }}>
              {room.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link href="/contacto" style={btnReservar}>
              Reservar esta suite
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
          {room.images.map((src, i) => (
            <figure
              key={src + i}
              style={{
                margin: 0,
                position: "relative",
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: 6,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <Image src={src} alt={`${room.title} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const btnBack = {
  display: "inline-flex",
  border: "1px solid rgba(255,255,255,.4)",
  borderRadius: 999,
  padding: "9px 16px",
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  fontSize: 11,
  color: "#f3ede3",
};

const btnReservar = {
  marginTop: 14,
  display: "inline-flex",
  border: "1px solid #d8b98f",
  borderRadius: 999,
  padding: "10px 15px",
  textTransform: "uppercase" as const,
  letterSpacing: ".16em",
  fontSize: 11,
  color: "#120f0f",
  background: "#d8b98f",
};
