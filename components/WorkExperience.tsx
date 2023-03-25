import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
type Props = {};

export default function WorkExperience({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col relative h-screen overflow-hidden  text-left md:flex-row max-w-full px-10 justify-evenly mx-auto items-center"
    >
      {/* "flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center" */}
      <h3 className="absolute top-24 uppercase tracking-[20px] text-white text-2xl">
        Experience
      </h3>
      <div className=" w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-60">
        <ExperienceCard></ExperienceCard>
        <ExperienceCard></ExperienceCard>
        <ExperienceCard></ExperienceCard>
        <ExperienceCard></ExperienceCard>
      </div>
    </motion.div>
  );
}
