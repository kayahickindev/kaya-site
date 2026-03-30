import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { GitHub } from "@/components/GitHub";
import { Interests } from "@/components/Interests";
import { CoFounder } from "@/components/CoFounder";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Metrics />
        <About />
        <Projects />
        <Timeline />
        <GitHub />
        <Interests />
        <CoFounder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
