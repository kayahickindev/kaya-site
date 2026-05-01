import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { TechStack } from "@/components/TechStack";
import { GitHub } from "@/components/GitHub";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";

const altBg = "bg-neutral-50/60 dark:bg-[#0a0807]/60";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <div className={altBg}>
          <Metrics />
        </div>
        <About />
        <div className={altBg}>
          <Projects />
        </div>
        <Timeline />
        <div className={altBg}>
          <TechStack />
        </div>
        <GitHub />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
