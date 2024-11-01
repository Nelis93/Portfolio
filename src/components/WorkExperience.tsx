import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "../../typings";
import Dots from "./Dots";

type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  const [focus, setFocus] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="relative text-[1rem] h-screen flex flex-col overflow-hidden justify-start items-center sm:max-w-full lg:text-[5vh]"
    >
      <h3 className="text-[2em] absolute top-[3em] uppercase tracking-[10px] text-white sm:top-[1.2em] lg:top-[7vh] lg:text-[1em] lg:tracking-[20px]">
        Experience
      </h3>
      <div className="w-full overflow-y-hidden h-[25em] px-10 mt-[12em] flex flex-row justify-start space-x-11 overflow-x-scroll snap-x snap-center snap-mandatory scrollbar-none sm:w-[85%] sm:h-full sm:mt-[6em] sm:items-start sm:space-x-10 lg:w-full lg:px-0 lg:mt-[15vh] lg:mb-[10vh] lg:justify-center lg:items-center lg:space-x-5 lg:overflow-y-hidden lg:scrollbar-thin lg:scrollbar-track-transparent lg:scrollbar-thumb-yellow-500/80">
        {experiences?.map((experience, index) => {
          return (
            <ExperienceCard
              key={experience._id}
              uniqueId={index}
              experience={experience}
              focus={focus}
              setFocus={setFocus}
              setCurrentIndex={setCurrentIndex}
              experienceRefs={experienceRefs}
            />
          );
        })}
      </div>
      <Dots
        items={experiences}
        refs={experienceRefs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        style={
          "relative z-40 flex lg:hidden justify-center items-start gap-5 mt-12 sm:mt-5 sm:pb-4"
        }
      />
    </motion.div>
  );
}
