"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import SpotifyWidget from "@/components/SpotifyWidget";
import InstagramWidget from "@/components/InstagramWidget";
import Gallery from "@/components/Gallery";
import Videos from "@/components/Videos";
import SocialLinks from "@/components/SocialLinks";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation when page loads
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navigation />
      <Hero />
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <Videos />
      </AnimatedSection>
      <AnimatedSection delay={200}>
        <Gallery />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <SpotifyWidget />
      </AnimatedSection>
      <AnimatedSection delay={200}>
        <InstagramWidget />
      </AnimatedSection>
      <AnimatedSection delay={100}>
        <Reviews />
      </AnimatedSection>
      <AnimatedSection>
        <SocialLinks />
      </AnimatedSection>
    </main>
  );
}
