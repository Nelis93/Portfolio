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
      className="skills-small sm:skills-small-flipped lg:skills"
    >
      <h3 className="skills-small-Title sm:skills-small-flipped-Title lg:skills-Title">
        skills
      </h3>
      <h3 className="hidden lg:skills-SubTitle">
        Hover over a skill for current proficiency
      </h3>
      <div className="skills-small-Grid sm:skills-small-flipped-Grid lg:skills-Grid">
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
