import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GenreSection from "@/components/GenreSection";
import HighlightsSection from "@/components/HighlightsSection";
import MixSection from "@/components/MixSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AudioVisualizer from "@/components/AudioVisualizer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GenreSection />
      <HighlightsSection />
      <MixSection />
      <ContactSection />
      <Footer />
      <AudioVisualizer />
    </main>
  );
}