import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Galería del hotel en Cartagena",
  description:
    "Descubre la galería de Villa Alta con fotos reales de suites, lobby y detalles coloniales en Cartagena de Indias.",
  path: "/galeria",
  keywords: ["galeria hotel cartagena", "fotos villa alta", "hotel centro historico cartagena"],
});

// ─── Datos ────────────────────────────────────────────────────────────────────

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

// ─── Sub-componentes ──────────────────────────────────────────────────────────

interface PhotoCardProps {
  src: string;
  titulo: string;
  index: number;
}

function PhotoCard({ src, titulo, index }: PhotoCardProps) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-sm
                 border border-[rgba(242,237,228,0.07)]
                 transition-all duration-500
                 hover:border-[rgba(201,110,133,0.25)]"
    >
      {/* Imagen */}
      <figure className="relative w-full overflow-hidden aspect-[4/5] sm:aspect-[3/4]">
        <div className="absolute inset-0 z-10 bg-black/25 transition-colors duration-500 group-hover:bg-black/10 pointer-events-none" />
        <Image
          src={src}
          alt={`Fotografía de ${titulo} en el Hotel Villa Alta`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={index < 4}
        />
        {/* Gradiente inferior */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#2c1418]/80 via-transparent to-transparent pointer-events-none" />
      </figure>

      {/* Texto sobre la imagen */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-5 md:p-6">
        {/* Número */}
        <p
          className="mb-1 text-[9px] font-semibold tracking-[0.28em] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#c9a96e" }}
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        {/* Título */}
        <h2
          className="text-base md:text-lg leading-tight"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#f2ede4",
          }}
        >
          {titulo}
        </h2>
      </div>
    </article>
  );
}

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function GaleriaPage() {
  return (
    <section
      className="relative min-h-screen mt-8 px-6 pt-32 pb-24 md:px-12 lg:px-24 overflow-hidden"
      style={{ background: "#3a1c20", fontFamily: "'Barlow Condensed', sans-serif" }}
    >
      {/* Textura de ruido */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* ── Header ── */}
        <header className="max-w-3xl mb-16 md:mb-24">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-5"
            style={{ fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(242,237,228,.5)" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "linear-gradient(to right, #c9a96e, transparent)",
                flexShrink: 0,
              }}
            />
            Villa Alta · Galería
          </div>

          {/* Título principal */}
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(44px, 7vw, 88px)",
              lineHeight: 0.86,
              textTransform: "uppercase",
              color: "#f2ede4",
              letterSpacing: "-0.02em",
              margin: "0 0 8px",
            }}
          >
            Villa Alta
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 60px)",
              lineHeight: 0.9,
              color: "#c96e85",
              margin: "0 0 24px",
              letterSpacing: "0.02em",
            }}
          >
            en imágenes
          </p>

          {/* Línea dorada */}
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "linear-gradient(to right, #c9a96e, transparent)",
              margin: "0 0 24px",
            }}
          />

          {/* Descripción */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(14px, 1.1vw, 16px)",
              lineHeight: 1.85,
              color: "rgba(242,237,228,.72)",
              maxWidth: "540px",
              margin: "0 0 36px",
            }}
          >
            Un recorrido visual con fotografías reales de nuestras suites, arquitectura colonial
            y los detalles que hacen de tu estadía en el Centro Histórico de Cartagena una
            experiencia inolvidable.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/suites"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 36px",
                borderRadius: "2px",
                border: "1px solid #c96e85",
                background: "transparent",
                color: "#e0899e",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background .25s, color .25s",
              }}
              className="hover:bg-[#c96e85] hover:text-[#3a1c20]"
            >
              Ver suites
            </Link>
            <Link
              href="https://villa-alta.vercel.app/"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(242,237,228,.72)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                transition: "color .2s",
              }}
              className="hover:text-[#f2ede4] after:content-['→'] after:ml-2"
            >
              Reservar
            </Link>
          </div>
        </header>

        {/* ── Grid de galería ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {FOTOS.map((item, index) => (
            <PhotoCard
              key={item.src}
              src={item.src}
              titulo={item.titulo}
              index={index}
            />
          ))}
        </div>

        {/* ── Footer count ── */}
        <p
          className="mt-12"
          style={{
            fontSize: "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(242,237,228,.32)",
          }}
        >
          {FOTOS.length} fotografías · Centro Histórico, Cartagena de Indias
        </p>
      </div>
    </section>
  );
}