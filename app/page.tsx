
import { MarqueeStrip } from "./components/sections/BookingBar";
import GalleryHeroSlider from "./components/sections/GalleryHeroSlider";
import HeroSection from "./components/sections/HeroSection";
import ReviewsSection from "./components/sections/ReviewsSection";
import RoomsShowcase from "./components/sections/RoomsShowcase";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <GalleryHeroSlider />
      <RoomsShowcase/>
      <ReviewsSection />
    </>
  );
} 
