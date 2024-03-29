import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  return (
    <article className="relative max-h-[70vh] flex flex-col flex-shrink-0 w-[80vw] md:w-[60vw] xl:w-[25%] rounded-lg items-center snap-center bg-teal-200 px-2 xl:px-[2vh] pt-[2vh] pb-[4vh] opacity-100 xl:hover:opacity-100 xl:opacity-40 cursor-none transition-opacity duration-200">
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
      <div className="relative pl-[2vh]">
        <h4 className="text-[3vh] font-light">{experience.jobTitle}</h4>
        <p className="font-bold text-[2vh]">{experience.company}</p>
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
        <p className="uppercase text-[1.5vh] text-white pb-[2vh]">
          {new Date(experience.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="space-y-[1vh] h-[15vh]  ml-[1vh] text-[2vh] cursor-default overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
          {experience.points.map((point, i) => {
            return <li key={i}>{point}</li>;
          })}
        </ul>
      </div>
    </article>
  );
}
