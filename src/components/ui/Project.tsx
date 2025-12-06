import React, {useRef, useEffect} from 'react'
import {motion, useInView} from 'framer-motion'
import {Project as PJT} from '../../types'
import {urlFor} from '../../lib/sanity'
import Dots from './Dots'
import Link from 'next/link'

type Props = {
  projects: any
  project: PJT
  index: number
  currentIndex: any
  setCurrentIndex: any
  projectRefs: any
}

export default function Project({
  projects,
  project,
  index,
  currentIndex,
  setCurrentIndex,
  projectRefs,
}: Props) {
  // Create a ref for each project
  const ref = useRef<HTMLDivElement | null>(null)
  // Track if each project is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  })

  // Update the currentIndex based on which project is in view
  useEffect(() => {
    if (isInView) {
      setCurrentIndex(index)
    }
  }, [isInView, index])

  return (
    <motion.div
      key={index}
      ref={(el) => {
        ref.current = el
        projectRefs.current[index] = el
      }}
      className="text-[2em] relative w-screen pb-[1em] px-[.5em] snap-center flex flex-col flex-shrink-0 items-center justify-end space-y-4 sm:text-[1em] sm:pt-14 sm:px-[1em] sm:grid sm:gap-x-10 sm:grid-flow-col-dense sm:grid-cols-5 sm:grid-rows-10 sm:space-y-3 lg:text-[3vh] lg:pl-[10em] lg:pr-[5em] lg:gap-x-5"
    >
      {/* Project Image */}
      <motion.img
        initial={{y: -300, opacity: 0}}
        transition={{duration: 1.2}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        src={urlFor(project?.image).url()}
        alt="none available"
        className="block relative w-[10em] rounded-lg cursor-none sm:h-auto sm:w-full sm:row-span-9 sm:col-span-2 sm:self-end sm:object-contain lg:row-span-8 lg:self-center"
      />

      <Dots
        items={projects}
        refs={projectRefs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        style={
          'relative flex justify-center gap-5 mt-2 sm:row-span-1 sm:col-span-2 sm:z-40 sm:self-center lg:row-span-2 lg:self-start'
        }
      />
      <Link
        href={project?.linkToBuild}
        className="mb-[.5em] sm:pb-2 text-[1.3em] sm:text-[2em] lg:text-[1.8em] sm:row-span-2 lg:row-span-1 col-span-2 justify-self-center sm:self-end text-ellipsis line-clamp-1 overflow-hidden font-semibold text-center underline decoration-yellow-500"
      >
        {project?.title}
      </Link>
      <div className="flex items-center space-x-5 sm:row-span-2 lg:row-span-1 col-span-3 md:col-span-2 sm:justify-self-start md:justify-self-center lg:self-center justify-center overflow-x-scroll scrollbar-none">
        {project?.technologies.map((tech) => {
          return (
            <img
              className="h-[1.5em] w-[1.5em]"
              key={tech._id}
              src={urlFor(tech?.image.asset._ref).url()}
              alt=""
            />
          )
        })}
      </div>
      <p className="overscroll-y-contain text-[.6em] h-[8em] text-center overflow-y-auto scrollbar-none sm:text-[1em] sm:text-left sm:w-full sm:h-full sm:row-span-6 sm:col-span-3 lg:text-[1em] lg:row-span-8 lg:pt-[1em] lg:px-[2em] lg:scrollbar-none lg:text-left">
        {project?.summary}
      </p>
    </motion.div>
  )
}
