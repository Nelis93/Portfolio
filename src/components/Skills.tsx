import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "../../typings";
type Props = {
  skills: SkillType[];
};

export default function Skills({ skills }: Props) {
  function startSkill(array: any[] | undefined) {
    // window.innerWidth < 400 ? 1 : 0;
    if (window.innerWidth < 400) {
      array?.pop();
    }
    return array;
  }
  // console.log(startSkill());
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="h-screen flex relative flex-col text-center md:text-left w-screen md:max-w-[2000px] md:px-5 justify-end md:space-y-5 mx-auto items-center"
    >
      <h3 className="top-[12vh] md:top-[7vh] absolute uppercase tracking-[20px] text-white text-[5vh]">
        skills
      </h3>
      <h3 className="top-[20vh] md:top-[16vh] absolute uppercase tracking-[3px] text-white text-[3vh]">
        Hover over a skill for current proficiency
      </h3>
      <div className="max-w-full grid grid-cols-3 md:grid-cols-4 gap-5 pb-[5vh] md:pb-[15vh]">
        {startSkill(
          skills
            ?.slice(0, skills.length / 2)
            .filter((skill) => skill.webdev)
            .map((skill) => {
              console.log(skill);
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
