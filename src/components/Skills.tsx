import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "../../typings";
type Props = {
  skills: SkillType[];
};
///oh boy
export default function Skills({ skills }: Props) {
  function startSkill(array: any[] | undefined) {
    let newArray = array;
    if (window.innerWidth < 400) {
      newArray?.pop();
    }
    return newArray;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="h-screen max-w-[100vh] flex relative 
      flex-col text-center md:text-left w-screen md:max-w-[2000px] 
      md:px-5 justify-end md:space-y-5 mx-auto items-center"
    >
      <h3 className="top-[12vh] md:top-[7vh] absolute uppercase tracking-[20px] text-white text-[5vh]">
        skills
      </h3>
      <h3
        className="hidden md:block top-[16vh] absolute uppercase tracking-[3px] text-white text-[3vh] 
      text-center"
      >
        Hover over a skill for current proficiency
      </h3>
      <div
        className="relative max-h-[70vh] w-full flex flex-col flex-wrap 
      place-content-center px-[10vh] gap-5 mb-[3vh] md:mb-0 pb-[8vh] md:pb-[12vh]"
      >
        {startSkill(
          skills
            ?.slice(0, skills.length / 2)
            .filter((skill) => skill.webdev)
            .map((skill) => {
              return <Skill key={skill._id} skill={skill} />;
            })
        )}
        {skills
          ?.slice(skills.length / 2, skills.length)
          .filter((skill) => skill.webdev)
          .map((skill) => {
            return <Skill key={skill._id} skill={skill} directionLeft />;
          })}
      </div>
    </motion.div>
  );
}
