import React from 'react'
import {motion} from 'framer-motion'
import Skill from '../ui/Skill'
import {Skill as SkillType} from '../../types'
type Props = {
  skills: SkillType[]
}

export default function Skills({skills}: Props) {
  function startSkill(array: any[] | undefined) {
    let newArray = array
    if (window.innerWidth < 400) {
      newArray?.pop()
    }
    return newArray
  }
  return (
    <motion.div
      initial={{opacity: 0}}
      transition={{duration: 1.5}}
      whileInView={{opacity: 1}}
      className="text-[1rem] relative flex flex-col text-center h-screen w-screen justify-center items-center lg:text-[5vh] lg:text-left lg:max-w-[2000px] lg:px-5"
    >
      <h3 className="absolute text-[2em] top-[3em] uppercase tracking-[20px] text-white sm:top-[1.2em] lg:text-[1em] lg:top-[7vh]">
        skills
      </h3>
      <h3
        className="hidden absolute lg:block top-[6em] uppercase tracking-[3px] text-white text-[.6em]
    text-center"
      >
        Hover over a skill for current proficiency
      </h3>
      <div className="relative max-h-[30em] w-full flex flex-col flex-wrap place-content-center gap-7 mt-20 pb-3 sm:w-fit sm:grid sm:grid-cols-6 sm:gap-x-10 sm:grid-flow-dense lg:grid-cols-4 lg:pb-0 lg:pt-[5vh]">
        {startSkill(
          skills
            ?.slice(0, skills.length / 2)
            .filter((skill) => skill.webdev)
            .map((skill) => {
              return <Skill key={skill._id} skill={skill} />
            }),
        )}
        {skills
          ?.slice(skills.length / 2, skills.length)
          .filter((skill) => skill.webdev)
          .map((skill) => {
            return <Skill key={skill._id} skill={skill} directionLeft />
          })}
      </div>
    </motion.div>
  )
}
