import Hero from "@/src/components/Hero";
import About from "@/src/components/About";
import Gallery from "@/src/components/Gallery";
import Videos from "@/src/components/Videos";
import SocialLinks from "@/src/components/SocialLinks";
import Navigation from "@/src/components/Navigation";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Videos />
      <SocialLinks />
    </main>
  );
}
