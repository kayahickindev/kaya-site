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
        <div className="bg-neutral-50 dark:bg-[#0a0a0a]">
          <Metrics />
        </div>
        <About />
        <div className="bg-neutral-50 dark:bg-[#0a0a0a]">
          <Projects />
        </div>
        <Timeline />
        <div className="bg-neutral-50 dark:bg-[#0a0a0a]">
          <GitHub />
        </div>
        <Interests />
        <div className="bg-neutral-50 dark:bg-[#0a0a0a]">
          <CoFounder />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
