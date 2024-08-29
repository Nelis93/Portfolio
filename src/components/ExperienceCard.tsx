import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Experience } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  experience: Experience;
  uniqueId: number;
  focus: number;
  setFocus: any;
  setCurrentIndex: any;
};

export default function ExperienceCard({
  experience,
  uniqueId,
  focus,
  setFocus,
  setCurrentIndex,
}: Props) {
  // Create a ref for each project
  const ref = useRef<HTMLElement | null>(null);
  // Track if each project is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });

  // Update the currentIndex based on which project is in view
  useEffect(() => {
    if (isInView) {
      console.log(uniqueId, " is in view");
      setCurrentIndex(uniqueId);
    }
  }, [isInView, uniqueId]);
  const handleCardClick = () => {
    console.log(focus, uniqueId);
    console.log(
      focus == uniqueId && window.innerWidth > 700
        ? "expCardFocus"
        : "expCardReg"
    );
    setFocus(uniqueId);
  };
  return (
    <article
      className={`${focus == uniqueId && window.innerWidth > 700 ? "expCardFocus" : "expCardReg-small sm:expCardReg-small-flipped md:expCardReg"}`}
      onClick={handleCardClick}
      ref={(el) => {
        ref.current = el;
      }}
    >
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="expCardReg-Img sm:expCardReg-small-flipped-Img md:expCardReg-Img"
        src={urlFor(experience?.companyImage).url()}
        alt="not found"
      />
      <div className="relative pl-[10px] sm:space-y-2 md:space-y-0">
        <h4 className="expCardReg-small-Title sm:expCardReg-Title">
          {experience.jobTitle}
        </h4>
        <p className="expCardReg-small-SubTitle sm:expCardReg-SubTitle">
          {experience.company}
        </p>
        <div className="relative flex space-x-[.5em] overflow-x-auto scrollbar-none py-[2.5vh]">
          {experience.technologies.map((tech) => {
            return (
              <img
                key={tech._id}
                src={urlFor(tech.image).url()}
                className="h-[1em] w-[1em] sm:h-[5vw] sm:w-[5vw] md:h-[2.5em] md:w-[2.5em]"
              />
            );
          })}
        </div>
        <p className="uppercase text-[.4em] sm:text-[1em] text-gray-400 pb-[1.2em]">
          {new Date(experience.dateStarted).toDateString()} -{" "}
          {experience.isCurrentlyWorkingHere
            ? "present"
            : new Date(experience.dateEnded).toDateString()}
        </p>
        <ul className="hidden md:block overscroll-contain space-y-1 h-[8em] ml-[1vh] md:text-[1.3em] cursor-default overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
          {experience.points.map((point, i) => {
            return <li key={i}>{point}</li>;
          })}
        </ul>
      </div>
    </article>
  );
}
