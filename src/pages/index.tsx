import Head from "next/head";
import type { NextPage } from "next";
import Header from "components/Header";
import Hero from "components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <div className="bg-teal-600 text-white h-screen snap-y snap-mandatory overflow-scroll z-0">
        <Head>
          <title>Nelis Portfolio</title>
        </Head>
        <Header />

        {/* hero */}
        <section id="hero" className="snap-center">
          <Hero />
        </section>
        {/* about */}

        {/* experience */}

        {/* skills */}

        {/* projects */}

        {/* contact */}
      </div>
    </>
  );
};
export default Home;
