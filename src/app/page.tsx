import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { GitHub } from "@/components/GitHub";
import { WhatsNext } from "@/components/WhatsNext";
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
          <TechStack />
        </div>
        <Projects />
        <div className="bg-neutral-50 dark:bg-[#0a0a0a]">
          <Timeline />
        </div>
        <GitHub />
        <div className="bg-neutral-50 dark:bg-[#0a0a0a]">
          <WhatsNext />
        </div>
        <CoFounder />
        <div className="bg-neutral-50 dark:bg-[#0a0a0a]">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
