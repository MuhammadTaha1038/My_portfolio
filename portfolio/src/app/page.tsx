import Hero from "@/components/Hero";
export const dynamic = "force-dynamic";
import Profile from "@/components/Profile";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Differentiation from "@/components/Differentiation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Profile />
      <TechStack />
      <Projects />
      <Experience />
      <Differentiation />
      <Contact />
      <Footer />
    </main>
  );
}

