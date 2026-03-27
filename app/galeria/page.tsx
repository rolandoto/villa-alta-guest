import Image from "next/image";
import Link from "next/link";

const FOTOS = [
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/FACHADA.jpg", titulo: "Fachada colonial" },
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOBBYHOTEL.jpg", titulo: "Lobby principal" },
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITESALA.jpg", titulo: "Sala de suite" },
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/BAÑOSUITE1.jpg", titulo: "Baño de lujo" },
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON2/SUITE DUPLEX 2.jpg", titulo: "Suite dúplex 2" },
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON3/SUITE DUPLEX -3.jpg", titulo: "Suite dúplex 3" },
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON4/SUITE DUPLEX -4.jpg", titulo: "Suite dúplex 4" },
  { src: "/FotosHotelVillaAlta/HABITACIONSUITEBALCON5/SUITE DUPLEX -5.jpg", titulo: "Suite dúplex 5" },
  { src: "/FotosHotelVillaAlta/HABITACIONPREMIUMSENCILLA7/HABITACIONPREMIUMSENCILLA7.jpg", titulo: "Suite premium" },
  { src: "/FotosHotelVillaAlta/FOTOS/DSC06772.jpg", titulo: "Experiencia Villa Alta" },
  { src: "/FotosHotelVillaAlta/FOTOS/DSC06787.jpg", titulo: "Detalles coloniales" },
  { src: "/FotosHotelVillaAlta/FOTOS/DSC06735.jpg", titulo: "Cartagena histórica" },
];

export default function GaleriaPage() {
  return (
    <section style={{ minHeight: "100vh", padding: "130px 24px 80px", background: "#0f0c0c", color: "#f7f2eb" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <p style={{ margin: 0, letterSpacing: ".28em", textTransform: "uppercase", fontSize: 12, color: "#bea57b" }}>(Galería)</p>
        <h1 style={{ margin: "12px 0 14px", fontSize: "clamp(36px,7vw,84px)", textTransform: "uppercase", lineHeight: 0.95 }}>
          Villa Alta en imágenes
        </h1>
        <p style={{ margin: 0, maxWidth: 760, lineHeight: 1.8, color: "rgba(247,242,235,.82)" }}>
          Recorrido visual con fotografías reales del hotel: suites, lobby, arquitectura y detalles que hacen única la
          experiencia en el Centro Histórico de Cartagena.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
          <Link href="/suites" style={btnPrimary}>Ver suites</Link>
          <Link href="/contacto" style={btnSecondary}>Reservar</Link>
        </div>

        <div
          style={{
            marginTop: 34,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 14,
          }}
        >
          {FOTOS.map((item, index) => (
            <article
              key={item.src}
              style={{
                margin: 0,
                background: "#191313",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <figure style={{ margin: 0, position: "relative", minHeight: 290 }}>
                <Image
                  src={item.src}
                  alt={item.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  priority={index < 3}
                />
              </figure>
              <div style={{ padding: "12px 14px" }}>
                <p style={{ margin: 0, fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "#bea57b" }}>
                  Foto {String(index + 1).padStart(2, "0")}
                </p>
                <h2 style={{ margin: "6px 0 0", fontSize: 20 }}>{item.titulo}</h2>
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
  padding: "11px 18px",
  borderRadius: 999,
  textTransform: "uppercase" as const,
  letterSpacing: ".18em",
  fontSize: 12,
};

const btnPrimary = {
  ...btnBase,
  border: "1px solid #bea57b",
  color: "#0f0c0c",
  background: "#bea57b",
};

const btnSecondary = {
  ...btnBase,
  border: "1px solid rgba(255,255,255,.5)",
  color: "#f7f2eb",
};
