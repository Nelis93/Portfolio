import React, {useState, useRef} from 'react'
import {motion} from 'framer-motion'
import {Project as PJT} from '../../types'
import Project from '../ui/Project'
import Slider from '../ui/Slider'

type Props = {
  projects: PJT[]
}

export default function Projects({projects}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  return (
    <motion.div
      initial={{opacity: 0}}
      transition={{duration: 1.5}}
      whileInView={{opacity: 1}}
      className="text-[1rem] relative h-screen flex flex-col justify-end mx-auto items-center sm:max-w-full lg:text-[5vh] lg:justify-start"
    >
      <h3 className="text-[2em] absolute top-[2.5em] uppercase tracking-[10px] text-white sm:top-[1em] lg:text-[1em] lg:top-[7vh]">
        Projects
      </h3>

      <Slider
        items={projects}
        refs={projectRefs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        style={'absolute z-20 h-1 hidden xl:flex justify-between w-screen top-[50%]'}
        scrolling
      />
      {/* Projects Carousel */}
      <div
        className="relative w-screen h-screen px-10 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-10 scrollbar-none sm:pt-[3em] lg:px-0  lg:scrollbar-thin lg:scrollbar-track-teal-300/40 lg:scrollbar-thumb-yellow-500/80"
        ref={containerRef}
      >
        {projects
          ?.sort((a, b) => a.position - b.position)
          .map((project, index) => {
            return (
              <Project
                key={project.position}
                projects={projects}
                project={project}
                index={index}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                projectRefs={projectRefs}
              />
            )
          })}
      </div>
      <div className="hidden lg:block w-screen absolute top-[30%] bg-teal-300/10 h-[500px] -skew-y-12"></div>
    </motion.div>
  )
}
