import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="relative flex flex-col flex-shrink-0 mb-5  rounded-lg items-center md:w-[28%] snap-center bg-teal-200 px-5 py-[2vh] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-[20vh] h-[20vh] flex-shrink-0 rounded-full  object-cover object-center"
        src={urlFor(experience?.companyImage).url()}
        alt="not found"
      />
      <div className="relative bottom-0 h-full w-full px-5 ">
        <h4 className="text-[1rem] font-light">{experience.jobTitle}</h4>
        <p className="font-bold text-[1rem]">{experience.company}</p>
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
        <p className="uppercase text-[0.5rem] text-white pb-[2vh]">
          {new Date(experience.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="absolute space-y-[1vh] mt-[50%] h-[10vh] bottom-0 ml-5 text-[.75rem] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
          {experience.points.map((point, i) => {
            return (
              <li key={i} className="pr-2">
                {point}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
