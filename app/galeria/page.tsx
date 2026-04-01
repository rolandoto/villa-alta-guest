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
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-[#191313] border border-white/5 transition-all duration-500 hover:border-[#bea57b]/30 hover:shadow-2xl hover:shadow-[#bea57b]/5">
      {/* Contenedor de la imagen con Aspect Ratio para evitar saltos en el diseño (CLS) */}
      <figure className="relative w-full overflow-hidden aspect-[4/5] sm:aspect-[3/4]">
        {/* Capa oscura superpuesta que se aclara al pasar el mouse */}
        <div className="absolute inset-0 z-10 bg-black/20 transition-colors duration-500 group-hover:bg-transparent pointer-events-none" />
        
        <Image
          src={src}
          alt={`Fotografía de ${titulo} en el Hotel Villa Alta`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={index < 4} // Priorizamos las primeras 4 para LCP (Largest Contentful Paint)
        />
      </figure>

      <div className="flex flex-col flex-grow justify-end p-5 md:p-6 relative z-20 bg-gradient-to-t from-[#191313] via-[#191313]/90 to-transparent">
        <p className="mb-1 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#bea57b]">
          Foto {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="text-lg md:text-xl font-light text-[#f7f2eb] tracking-wide">
          {titulo}
        </h2>
      </div>
    </article>
  );
}

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function GaleriaPage() {
  return (
    <section className="min-h-screen mt-8 bg-[#0f0c0c] text-[#f7f2eb] px-6 pt-32 pb-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-[1400px]">
        

        <header className="max-w-3xl mb-16 md:mb-24">
          <p className="text-[#bea57b] text-xs md:text-sm tracking-[0.28em] uppercase font-semibold mb-4">
            ( Galería )
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] uppercase leading-[0.9] font-light mb-6">
            Villa Alta <br />
            <span className="text-white/60 italic font-serif lowercase text-5xl sm:text-6xl md:text-8xl lg:text-[96px]">en imágenes</span>
          </h1>
          <p className="text-[#f7f2eb]/80 text-base md:text-lg leading-relaxed max-w-2xl font-light">
            Un recorrido visual con fotografías reales de nuestras suites, arquitectura colonial y los detalles que hacen de tu estadía en el Centro Histórico de Cartagena una experiencia inolvidable.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link 
              href="/suites" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#bea57b] text-[#0f0c0c] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bea57b]/50"
            >
              Ver suites
            </Link>
            <Link 
              href="https://villa-alta.vercel.app/" 
              target="_blank"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/30 text-[#f7f2eb] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:border-white hover:bg-white/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              Reservar
            </Link>
          </div>
        </header>

        {/* Grid de Galería */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {FOTOS.map((item, index) => (
            <PhotoCard 
              key={item.src} 
              src={item.src} 
              titulo={item.titulo} 
              index={index} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}