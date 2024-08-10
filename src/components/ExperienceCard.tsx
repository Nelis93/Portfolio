import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  experience: Experience;
  uniqueId: number;
  focus: number;
  setFocus: any;
};

export default function ExperienceCard({
  experience,
  uniqueId,
  focus,
  setFocus,
}: Props) {
  const handleCardClick = () => {
    console.log(focus, uniqueId);
    setFocus(uniqueId);
  };
  return (
    <article
      className={`${focus == uniqueId ? "expCardFocus" : "expCardReg"}`}
      onClick={handleCardClick}
    >
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-[20vh] h-[20vh] my-[2vh] flex-shrink-0 rounded-full  object-cover object-center"
        src={urlFor(experience?.companyImage).url()}
        alt="not found"
      />
      <div className="relative pl-[10px]">
        <h4 className="text-[2em] pl-1 font-light bg-gradient-to-r from-teal-300 from-70% to-teal-200 rounded-lg">
          {experience.jobTitle}
        </h4>
        <p className="font-bold pl-1 text-[1.5em]">{experience.company}</p>
        <div className="relative flex space-x-4 overflow-x-auto scrollbar-none py-[2.5vh]">
          {experience.technologies.map((tech) => {
            return (
              <img
                key={tech._id}
                src={urlFor(tech.image).url()}
                className="h-[5vh] w-[5vh]"
              />
            );
          })}
        </div>
        <p className="uppercase text-[1em] text-gray-400 pb-[2vh]">
          {new Date(experience.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="space-y-[1vh] h-[15vh] ml-[1vh] text-[1.3em] cursor-default overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
          {experience.points.map((point, i) => {
            return <li key={i}>{point}</li>;
          })}
        </ul>
      </div>
    </article>
  );
}
