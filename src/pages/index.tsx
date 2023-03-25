import Head from "next/head";
import type { NextPage } from "next";
import Header from "components/Header";
import Hero from "components/Hero";
import About from "components/About";
import WorkExperience from "components/WorkExperience";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-teal-600 text-white h-screen snap-y snap-mandatory overflow-scroll z-0">
        <Head>
          <title>Nelis Portfolio</title>
        </Head>
        <Header />
        <section id="hero" className="snap-center">
          <Hero />
        </section>
        <section id="about" className="snap-start">
          <About />
        </section>
        {/* experience */}
        <section id="experience" className="snap-center">
          <WorkExperience />
        </section>
        {/* skills */}

        {/* projects */}

        {/* contact */}
      </div>
    </>
  );
};
export default Home;
