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
      className="experience-small sm:experience-small-flipped lg:experience"
    >
      <h3 className="experience-small-Title sm:experience-small-flipped-Title lg:experience-Title">
        Experience
      </h3>
      <div className="experience-small-Container sm:experience-small-flipped-Container lg:experience-Container">
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
      <div className="relative z-40 flex lg:hidden justify-center items-start gap-5 mt-5 sm:pb-4">
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
