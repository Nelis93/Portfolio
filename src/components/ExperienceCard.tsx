import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="relative flex flex-col flex-shrink-0 mb-[3vh] w-[25%]  rounded-lg items-center snap-center bg-teal-200 px-[2vh] py-[2vh] hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-[20vh] h-[20vh] my-[1vh] flex-shrink-0 rounded-full  object-cover object-center"
        src={urlFor(experience?.companyImage).url()}
        alt="not found"
      />
      <div className="relative pl-[2vh]">
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
        <ul className="space-y-[1vh] h-[15vh]  ml-[1vh] text-[.75rem] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
          {experience.points.map((point, i) => {
            return (
              <li key={i} className="">
                {point}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
