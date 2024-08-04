import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillOne } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  skill: SkillOne;
  directionLeft?: boolean;
};
export default function Skill({ skill, directionLeft }: Props) {
  return (
    <div className="group w-[10vh] md:w-[12vh] h-[10vh] md:h-[12vh] relative flex cursor-none">
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        src={urlFor(skill?.image).url()}
        className="object-cover w-full h-full filter group-hover:grayscale transition duration-300 ease-in-out"
      />
      <div className="hidden md:block absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white w-[12vh] h-[12vh] rounded z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-[5vh] font-bold text-gray-500 opacity-100">
            {skill?.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
