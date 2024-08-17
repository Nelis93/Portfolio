import React, { useState } from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "../../typings";
type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  const [focus, setFocus] = useState(0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="relative h-screen max-w-[100vh] flex flex-col overflow-hidden text-lft xl:max-w-full justify-start mx-[10vw] items-center"
    >
      {/* "flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7md px-10 justify-evenly mx-auto items-center" */}
      <h3 className="absolute top-[12vh] md:top-[7vh] uppercase tracking-[10px] md:tracking-[20px] text-white text-[4vh] md:text-[5vh]">
        Experience
      </h3>
      <div className="w-screen md:w-[60vw] xl:w-[85vw] max-h-[80vh] xl:h-[100%] px-10 md:px-0 mt-[25vh] md:mt-[12vh] flex flex-row justify-start xl:justify-center xl:items-center space-x-5 overflow-x-scroll snap-x snap-center snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
        {experiences?.map((experience, index) => {
          return (
            <ExperienceCard
              key={experience._id}
              uniqueId={index}
              experience={experience}
              focus={focus}
              setFocus={setFocus}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
