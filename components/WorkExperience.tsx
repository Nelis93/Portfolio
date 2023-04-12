import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "../typings";
type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="h-screen flex flex-col relative overflow-hidden text-lft md:flex-row max-w-full justify-evenly mx-auto items-center"
    >
      {/* "flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center" */}
      <h3 className="absolute top-24 uppercase tracking-[20px] text-white text-2xl">
        Experience
      </h3>
      <div className="w-screen flex flex-row justify-center space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory mt-40 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
        {experiences?.map((experience) => {
          return (
            <ExperienceCard key={experience._id} experience={experience} />
          );
        })}
      </div>
    </motion.div>
  );
}
