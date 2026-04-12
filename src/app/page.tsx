import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative antialiased">
      {/*
        This parent container sets the height to 500vh to create a long scrollable area.
        The ScrollyCanvas and Overlay inside are sticky.
      */}
      <div className="relative h-[500vh]">
        <ScrollyCanvas />
        <Overlay />
      </div>

      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
