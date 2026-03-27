import Link from "next/link";

export default function HeroSection() {
  const heroImg = "/images/hero-back3.avif";

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 20px 80px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.35)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, color: "#fff" }}>
        <h1
          style={{
            fontFamily: "Barlow Condensed, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(58px,15vw,130px)",
            lineHeight: 0.9,
            letterSpacing: "-.03em",
            margin: 0,
          }}
        >
          VILLA ALTA
        </h1>

        <p
          style={{
            marginTop: 14,
            letterSpacing: ".5em",
            textTransform: "uppercase",
            fontSize: "clamp(10px,2vw,22px)",
          }}
        >
          Casa de Huéspedes
        </p>

        <p style={{ marginTop: 16, opacity: 0.9 }}>Centro Histórico · Cartagena de Indias</p>

        <Link
          href="/contacto"
          style={{
            display: "inline-block",
            marginTop: 24,
            border: "1px solid rgba(255,255,255,.65)",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: 999,
            textTransform: "uppercase",
            letterSpacing: ".2em",
            fontSize: 12,
          }}
        >
          Reservar
        </Link>
      </div>
    </section>
  );
}
