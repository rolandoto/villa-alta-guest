import type { Metadata } from "next";
import { MarqueeStrip } from "./components/sections/BookingBar";
import GalleryHeroSlider from "./components/sections/GalleryHeroSlider";
import HeroSection from "./components/sections/HeroSection";
import ReviewsSection from "./components/sections/ReviewsSection";
import RoomsShowcase from "./components/sections/RoomsShowcase";
import { buildMetadata } from "./lib/seo";
import ContactSection from "./components/location/location";
import FAQPage from "./components/FAQPage/FAQPage";

export const metadata: Metadata = buildMetadata({
  title: "Hotel boutique en Cartagena | Villa Alta Guest House",
  description:
    "Reserva en Villa Alta, hotel boutique en el Centro Histórico de Cartagena con suites dúplex, arquitectura colonial y experiencia premium.",
  path: "/",
  keywords: ["hotel boutique cartagena", "centro histórico cartagena", "suites cartagena", "villa alta"],
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <GalleryHeroSlider />
      <RoomsShowcase />
      <ReviewsSection />
      <FAQPage />
      <ContactSection />
    </>
  );
}
