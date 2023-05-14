import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillOne } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  skill: SkillOne;
  directionLeft?: boolean;
};

export default function Skill({ skill, directionLeft }: Props) {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        src={urlFor(skill?.image).url()}
        className="object-cover w-20 h-20 xl:w-[15vh] xl:h-[15vh] filter group-hover:grayscale transition duration-300 ease-in-out"
      />
      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white h-20 w-20 xl:w-[15vh] xl:h-[15vh] rounded z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold text-gray-500 opacity-100">
            {skill?.progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
