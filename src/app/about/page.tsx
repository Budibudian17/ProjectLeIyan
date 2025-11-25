import AboutHero from "@/components/hero/AboutHero";
import AboutSection from "@/components/about/AboutSection";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import AboutHowWeWork from "@/components/about/AboutHowWeWork";
import OurClients from "@/components/clients/OurClients";
import AboutOfferCta from "@/components/about/AboutOfferCta";

export default function AboutPage() {
  return (
    <main className="bg-zinc-50">
      <AboutHero />
      <AboutSection />
      <AboutMissionVision />
      <AboutHowWeWork />
      <OurClients />
      <AboutOfferCta />
    </main>
  );
}
