import Image from "next/image";
import Link from "next/link";
import { ROOMS } from "@/app/data/hotel";

export default function SuitesPage() {
  return (
    <section style={{ padding: "140px 24px 80px", background: "#f5f0e8", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ letterSpacing: ".3em", fontSize: 12, textTransform: "uppercase", opacity: 0.6 }}>(Suites)</p>
        <h1 style={{ fontSize: "clamp(34px,7vw,72px)", margin: "12px 0 24px", textTransform: "uppercase" }}>Nuestras suites</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {ROOMS.map((room) => (
            <article key={room.id} style={{ background: "#fff", border: "1px solid rgba(0,0,0,.08)" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5" }}>
                <Image src={room.images[0]} alt={room.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <div style={{ padding: 16 }}>
                <p style={{ margin: 0, letterSpacing: ".2em", fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>Suite {room.number}</p>
                <h2 style={{ margin: "8px 0", textTransform: "uppercase" }}>{room.title}</h2>
                <p style={{ margin: "0 0 14px" }}>{room.subtitle}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <Link href={`/suites/${room.slug}`} style={{ border: "1px solid #111", padding: "9px 14px", textTransform: "uppercase", letterSpacing: ".12em", fontSize: 12 }}>
                    Ver detalle
                  </Link>
                  <Link href="/contacto" style={{ border: "1px solid #111", padding: "9px 14px", textTransform: "uppercase", letterSpacing: ".12em", fontSize: 12 }}>
                    Reservar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
