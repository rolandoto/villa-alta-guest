import Image from "next/image";
import Link from "next/link";
import { HOTEL } from "@/app/data/hotel";

const FOTOS_CONTACTO = [
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/ENTRADAHOTEL.jpg",
  "/FotosHotelVillaAlta/HABITACIONSUITEBALCON1/LOBBYHUESPEDES.jpg",
  "/FotosHotelVillaAlta/FOTOS/DSC06735.jpg",
];

export default function ContactoPage() {
  return (
    <section style={{ padding: "140px 24px 80px", background: "#0f0f0f", color: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24 }}>
        <div>
          <p style={{ letterSpacing: ".28em", textTransform: "uppercase", fontSize: 12, opacity: 0.7 }}>(Contacto)</p>
          <h1 style={{ fontSize: "clamp(34px,7vw,72px)", margin: "10px 0 20px", textTransform: "uppercase" }}>Reservar en Villa Alta</h1>
          <p style={{ lineHeight: 1.7, opacity: 0.85 }}>Contáctanos para confirmar disponibilidad, tarifas y experiencias especiales en Cartagena.</p>

          <div style={{ marginTop: 20, lineHeight: 1.9 }}>
            <div><strong>Teléfono:</strong> <a href={`tel:${HOTEL.phone}`}>{HOTEL.phone}</a></div>
            <div><strong>Email:</strong> <a href={`mailto:${HOTEL.email}`}>{HOTEL.email}</a></div>
            <div><strong>Dirección:</strong> {HOTEL.location}, {HOTEL.city}</div>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/galeria" style={{ border: "1px solid #fff", padding: "10px 16px", letterSpacing: ".12em", textTransform: "uppercase", fontSize: 12 }}>Ver galería</Link>
            <Link href="/suites" style={{ border: "1px solid #fff", padding: "10px 16px", letterSpacing: ".12em", textTransform: "uppercase", fontSize: 12 }}>Ver suites</Link>
          </div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {FOTOS_CONTACTO.map((src, i) => (
            <div key={src + i} style={{ position: "relative", minHeight: 170 }}>
              <Image src={src} alt={`Foto contacto ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
