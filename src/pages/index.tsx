import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import About from "components/About";
import Contact from "components/Contact";
import Header from "components/Header";
import Hero from "components/Hero";
import Projects from "components/Projects";
import Skills from "components/Skills";
import WorkExperience from "components/WorkExperience";
import { PageInfo, Experience, Skill, Project, Social } from "../../../typings";
import { fetchPageInfo } from "../../../utils/fetchPageInfo";
import { fetchExperiences } from "../../../utils/fetchExperiences";
import { fetchProjects } from "../../../utils/fetchProjects";
import { fetchSkills } from "../../../utils/fetchSkills";
import { fetchSocials } from "../../../utils/fetchSocials";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, skills, projects, socials }: Props) => {
  return (
    <>
      <div className="bg-teal-600 text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80">
        <Head>
          <title>{pageInfo?.name} Portfolio</title>
        </Head>
        <Header socials={socials} />
        <section id="hero" className="snap-start">
          <Hero pageInfo={pageInfo} />
        </section>
        <section id="about" className="snap-center">
          <About pageInfo={pageInfo} />
        </section>
        <section id="experience" className="snap-center">
          <WorkExperience experiences={experiences} />
        </section>
        <section id="skills" className="snap-start">
          <Skills skills={skills} />
        </section>
        <section id="projects" className="snap-start">
          <Projects projects={projects} />
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperiences();
  const skills: Skill[] = await fetchSkills();
  const projects: Project[] = await fetchProjects();
  const socials: Social[] = await fetchSocials();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
    revalidate: 10,
  };
};
