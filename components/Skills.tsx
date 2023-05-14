import React from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "../typings";
type Props = {
  skills: SkillType[];
};

export default function Skills({ skills }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="h-screen flex relative flex-col text-center md:text-left w-screen md:max-w-[2000px] xl:px-5 justify-center xl:space-y-5 mx-auto items-center"
    >
      <h3 className="top-32 md:top-[7vh] absolute uppercase tracking-[20px] text-white text-2xl">
        skills
      </h3>
      <h3 className="top-44 md:top-[12vh] absolute uppercase tracking-[3px] text-white text-sm">
        Hover over a skill for current proficiency
      </h3>
      <div className="max-w-full grid grid-cols-4 gap-5 pt-[10vh]">
        {skills
          ?.slice(0, skills.length / 2)
          .filter((skill) => skill.webdev)
          .map((skill) => {
            return <Skill key={skill._id} skill={skill} />;
          })}
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
