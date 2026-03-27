import Image from "next/image";
import Link from "next/link";
import { ROOMS } from "@/app/data/hotel";

export default function SuitesPage() {
  return (
    <section style={{ padding: "130px 24px 80px", background: "#ede8df", minHeight: "100vh", color: "#1c1712" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{ margin: 0, letterSpacing: ".28em", textTransform: "uppercase", fontSize: 12, color: "#7e6542" }}>(Suites)</p>
        <h1 style={{ margin: "12px 0 14px", fontSize: "clamp(38px,7vw,82px)", lineHeight: 0.92, textTransform: "uppercase" }}>
          Nuestras Suites
        </h1>
        <p style={{ margin: 0, maxWidth: 760, lineHeight: 1.8, color: "rgba(28,23,18,.8)" }}>
          Diseñadas para descanso, privacidad y estilo colonial contemporáneo. Cada suite ofrece una experiencia distinta
          para disfrutar Cartagena con el máximo confort.
        </p>

        <div style={{ marginTop: 34, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
          {ROOMS.map((room) => (
            <article
              key={room.id}
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,.1)",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 12px 38px rgba(0,0,0,.07)",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/3" }}>
                <Image src={room.images[0]} alt={room.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>

              <div style={{ padding: 18 }}>
                <p style={{ margin: 0, letterSpacing: ".15em", fontSize: 11, textTransform: "uppercase", color: "#7e6542" }}>
                  Suite {room.number}
                </p>
                <h2 style={{ margin: "8px 0", fontSize: 26, lineHeight: 1.05 }}>{room.title}</h2>
                <p style={{ margin: "0 0 10px", textTransform: "uppercase", letterSpacing: ".08em", fontSize: 12 }}>{room.subtitle}</p>
                <p style={{ margin: "0 0 14px", lineHeight: 1.65, color: "rgba(28,23,18,.8)" }}>{room.description}</p>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Link href={`/suites/${room.slug}`} style={btnPrimary}>Ver detalle</Link>
                  <Link href="/contacto" style={btnSecondary}>Reservar</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const btnBase = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 14px",
  borderRadius: 999,
  textTransform: "uppercase" as const,
  letterSpacing: ".12em",
  fontSize: 11,
};

const btnPrimary = {
  ...btnBase,
  border: "1px solid #7e6542",
  background: "#7e6542",
  color: "#fff",
};

const btnSecondary = {
  ...btnBase,
  border: "1px solid #1c1712",
  color: "#1c1712",
};
