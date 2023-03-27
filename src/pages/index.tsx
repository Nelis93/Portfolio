import Head from "next/head";
import type { NextPage } from "next";
import Header from "components/Header";
import Hero from "components/Hero";
import About from "components/About";
import WorkExperience from "components/WorkExperience";
import Skills from "components/Skills";
import Projects from "components/Projects";
import Contact from "components/Contact";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-teal-600 text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80">
        <Head>
          <title>Nelis Portfolio</title>
        </Head>
        <Header />
        <section id="hero" className="snap-start">
          <Hero />
        </section>
        <section id="about" className="snap-center">
          <About />
        </section>
        <section id="experience" className="snap-center">
          <WorkExperience />
        </section>
        <section id="skills" className="snap-start">
          <Skills />
        </section>
        <section id="projects" className="snap-start">
          <Projects />
        </section>
        <section id="contact" className="snap-start">
          <Contact />
        </section>
        <Link href="#hero">
          <footer className="sticky bottom-5 w-full cursor-pointer">
            <div className="flex items-center justify-center">
              <img
                className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0"
                src=""
                alt="not yet"
              />
            </div>
          </footer>
        </Link>
      </div>
    </>
  );
};
export default Home;
