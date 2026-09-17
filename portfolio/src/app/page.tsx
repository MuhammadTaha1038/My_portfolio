import { Suspense } from "react";
import Hero from "@/components/Hero";
import Differentiation from "@/components/Differentiation";
import MarqueeTechBar from "@/components/home/MarqueeTechBar";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import FeaturedCaseStudy from "@/components/home/FeaturedCaseStudy";
import CurrentPosition from "@/components/home/CurrentPosition";
import FeaturedCertifications from "@/components/home/FeaturedCertifications";
import LogoCloud from "@/components/home/LogoCloud";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Scrolling tech bar */}
      <MarqueeTechBar />

      {/* 3. Featured Projects (pulls from DB) */}
      <Suspense fallback={null}>
        <FeaturedProjects />
      </Suspense>

      {/* 4. Cinematic Case Study teaser (pulls from DB) */}
      <Suspense fallback={null}>
        <FeaturedCaseStudy />
      </Suspense>

      {/* 5. Current position + what I'm building */}
      <Suspense fallback={null}>
        <CurrentPosition />
      </Suspense>

      {/* 6. Featured Certifications (pulls from DB) */}
      <Suspense fallback={null}>
        <FeaturedCertifications />
      </Suspense>

      {/* 7. Platforms & Logo Cloud */}
      <LogoCloud />

      {/* 8. Engineering differentiators */}
      <Differentiation />
    </main>
  );
}
