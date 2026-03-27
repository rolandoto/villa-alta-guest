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
    <section style={{ padding: "140px 24px 80px", background: "#17120f", color: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Link href="/suites" style={{ textTransform: "uppercase", letterSpacing: ".2em", fontSize: 12, opacity: 0.8 }}>← Volver a suites</Link>
        <h1 style={{ margin: "16px 0", fontSize: "clamp(34px,7vw,74px)", textTransform: "uppercase" }}>
          Suite {room.number} · {room.title}
        </h1>
        <p style={{ maxWidth: 850, lineHeight: 1.7, opacity: 0.9 }}>{room.longDescription}</p>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10 }}>
          {room.images.map((src, i) => (
            <figure key={src + i} style={{ margin: 0, position: "relative", width: "100%", aspectRatio: "4/5" }}>
              <Image src={src} alt={`${room.title} ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", borderRadius: 4 }} />
            </figure>
          ))}
        </div>

        <div style={{ marginTop: 26 }}>
          <Link href="/contacto" style={{ border: "1px solid #fff", padding: "10px 22px", textTransform: "uppercase", letterSpacing: ".2em", fontSize: 12 }}>
            Reservar
          </Link>
        </div>
      </div>
    </section>
  );
}
