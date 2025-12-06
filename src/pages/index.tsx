import type {GetStaticProps} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Header from '@/components/ui/Header'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import WorkExperience from '@/components/sections/WorkExperience'
import {urlFor} from '../lib/sanity'
import {PageInfo, Experience, Skill, Project, Social} from '../../typings'
import {fetchPageInfo} from '../utils/fetchPageInfo'
import {fetchExperiences} from '../utils/fetchExperiences'
import {fetchProjects} from '../utils/fetchProjects'
import {fetchSkills} from '../utils/fetchSkills'
import {fetchSocials} from '../utils/fetchSocials'
import dynamic from 'next/dynamic'

type Props = {
  pageInfo: PageInfo
  experiences: Experience[]
  skills: Skill[]
  projects: Project[]
  socials: Social[]
}

const Home = ({pageInfo, experiences, skills, projects, socials}: Props) => {
  return (
    <div
      translate="no"
      className="bg-teal-600 text-white h-screen snap-y snap-mandatory max-w-screen overflow-y-scroll overflow-x-hidden scrollbar-none"
    >
      <Head>
        <title>{pageInfo?.title} Portfolio</title>
        <meta name="description" content="I'm the CEO of SEO. Have a look at my website 🙂." />
      </Head>
      <Header
        socials={socials}
        setSelectedFilter={''}
        style={
          'sticky text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 flex items-start justify-between z-30'
        }
      />
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
        <Contact pageInfo={pageInfo} />
      </section>
      <Link href="#hero">
        <footer className="invisible lg:visible sticky bottom-[2.5vh] w-full z-20 cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-[7.5vh] w-[7.5vh] rounded-full filter grayscale hover:grayscale-0 object-cover object-center"
              src={urlFor(experiences[0].companyImage).url()}
              alt={experiences[0].companyImage._type}
            />
          </div>
        </footer>
      </Link>
    </div>
  )
}
export default dynamic(() => Promise.resolve(Home), {ssr: false})
export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo()
  const experiences: Experience[] = await fetchExperiences()
  const skills: Skill[] = await fetchSkills()
  const projects: Project[] = await fetchProjects()
  const socials: Social[] = await fetchSocials()

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
    revalidate: 10,
  }
}
