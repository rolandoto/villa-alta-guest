import Image from "next/image";
import Link from "next/link";

const FOTOS = [
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/FACHADA.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOBBYHOTEL.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/SUITESALA.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/BAÑOSUITE1.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON2/SUITE DUPLEX 2.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON3/SUITE DUPLEX -3.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON4/SUITE DUPLEX -4.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON5/SUITE DUPLEX -5.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITE6/SUITEDUPLEX-6SINBALCON.jpg",
  "/FotosHotelVillaAlta/HABITACIONPREMIUMSENCILLA7/HABITACIONPREMIUMSENCILLA7.jpg",
  "/FotosHotelVillaAlta/FOTOS/DSC06772.jpg",
  "/FotosHotelVillaAlta/FOTOS/DSC06787.jpg",
];

export default function GalleryPage() {
  return (
    <section style={{ background: "#111", color: "#fff", minHeight: "100vh", padding: "140px 24px 80px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ letterSpacing: ".3em", fontSize: 12, textTransform: "uppercase", opacity: 0.7 }}>(Galería)</p>
        <h1 style={{ fontSize: "clamp(34px,7vw,74px)", margin: "12px 0 16px", textTransform: "uppercase" }}>
          Fotos reales de Villa Alta
        </h1>
        <p style={{ maxWidth: 800, opacity: 0.85, lineHeight: 1.7 }}>
          Selección de imágenes desde la carpeta <strong>/public</strong> para mostrar habitaciones, zonas comunes y detalles del hotel.
        </p>

        <div style={{ display: "flex", gap: 12, margin: "24px 0 34px", flexWrap: "wrap" }}>
          <Link href="/contacto" style={{ border: "1px solid #fff", padding: "10px 20px", letterSpacing: ".18em", textTransform: "uppercase" }}>Reservar</Link>
          <Link href="/suites" style={{ border: "1px solid #fff", padding: "10px 20px", letterSpacing: ".18em", textTransform: "uppercase" }}>Ver suites</Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 12,
          }}
        >
          {FOTOS.map((src, i) => (
            <figure key={src + i} style={{ margin: 0, position: "relative", minHeight: 240 }}>
              <Image src={src} alt={`Foto Villa Alta ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover", borderRadius: 4 }} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
