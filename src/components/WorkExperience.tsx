import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "../../typings";
type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  const [focus, setFocus] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="relative text-[5vh] h-screen max-w-[100vh] flex flex-col overflow-hidden sm:max-w-full justify-start md:mx-[10vw] items-center"
    >
      <h3 className="experience-small-Title sm:experience-small-flipped-Title md:experience-Title">
        Experience
      </h3>
      <div className="w-[100%] max-h-[60vh] sm:max-h-[80vh] md:h-[100%] px-10 md:px-0 mt-[22vh] md:mt-[12vh] flex flex-row justify-start md:justify-center md:items-center sm:space-x-5 space-x-11 overflow-x-scroll snap-x snap-center snap-mandatory scrollbar-none md:scrollbar-thin md:scrollbar-track-transparent md:scrollbar-thumb-yellow-500/80">
        {experiences?.map((experience, index) => {
          return (
            <ExperienceCard
              key={experience._id}
              uniqueId={index}
              experience={experience}
              focus={focus}
              setFocus={setFocus}
              setCurrentIndex={setCurrentIndex}
            />
          );
        })}
      </div>
      <div className="relative z-40 flex md:hidden justify-center gap-5 mt-5">
        {experiences.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`size-4 rounded-[50%] hover:cursor-pointer ${
              currentIndex === idx ? "bg-yellow-500" : "bg-black"
            }`}
          ></div>
        ))}
      </div>
    </motion.div>
  );
}
