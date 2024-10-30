import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Experience } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  experience: Experience;
  uniqueId: number;
  focus: number;
  setFocus: any;
  setCurrentIndex: any;
  experienceRefs: any;
};

export default function ExperienceCard({
  experience,
  uniqueId,
  focus,
  setFocus,
  setCurrentIndex,
  experienceRefs,
}: Props) {
  // Create a ref for each project
  const ref = useRef<HTMLElement | null>(null);
  // Track if each project is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });
  const [dominance, setDominance] = useState(false);
  // Update the currentIndex based on which project is in view
  useEffect(() => {
    if (isInView) {
      console.log(uniqueId, " is in view");
      setCurrentIndex(uniqueId);
    }
  }, [isInView, uniqueId]);
  const handleCardClick = () => {
    setFocus(uniqueId);
    focus == uniqueId && setDominance((current) => !current);
  };
  return (
    <article
      className={`expCardReg-small sm:expCardReg-small-flipped ${focus == uniqueId ? "lg:expCardFocus" : "lg:expCardReg"}`}
      onClick={handleCardClick}
      ref={(el) => {
        ref.current = el;
        experienceRefs.current[uniqueId] = el;
      }}
    >
      <div className="absolute w-full lg:w-fit h-full">
        <section
          className="relative flex flex-col sm:flex-row lg:flex-col w-full h-full px-[.5em]"
          style={{
            transform: dominance ? "translateY(-100%)" : "inherit",
            transition: "transform",
            transitionDuration: "1s",
            transitionTimingFunction: "ease-in-out",
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
            className="my-[.6em] w-[5em] h-[5em] flex-shrink-0 rounded-full self-center object-cover sm:mr-[1.8em] sm:object-left lg:mr-0 lg:object-center"
            src={urlFor(experience?.companyImage).url()}
            alt="not found"
          />
          <div className="relative pt-5 lg:pt-0 pl-[.2em] w-full h-full">
            <h4 className="text-[.7em] sm:text-[.8em] w-full text-clip line-clamp-1 pl-1 font-light bg-gradient-to-r from-teal-300 from-70% to-teal-200 rounded-lg">
              {experience.jobTitle}
            </h4>
            <p className="expCardReg-small-SubTitle sm:expCardReg-SubTitle">
              {experience.company}
            </p>
            <div className="absolute bottom-10 flex space-x-5 overflow-x-auto scrollbar-none py-[2.5vh]">
              {experience.technologies.map((tech) => {
                return (
                  <img
                    key={tech._id}
                    src={urlFor(tech.image).url()}
                    className="h-[1em] w-[1em]"
                  />
                );
              })}
            </div>
          </div>
          <p className="absolute right-2 bottom-2 uppercase text-[.4em] text-gray-400">
            {new Date(experience.dateStarted).toDateString()} -{" "}
            {experience.isCurrentlyWorkingHere
              ? "present"
              : new Date(experience.dateEnded).toDateString()}
          </p>
        </section>
        <section
          className="relative w-full h-full rounded-lg lg:rounded-none py-[.5em] px-[.5em] bg-stone-600 overflow-y-scroll scrollbar-none"
          style={{
            transform: dominance ? "translateY(-100%)" : "inherit",
            transition: "transform",
            transitionDuration: "1s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <div>
            <h4 className="text-[.7em] lg:text-[.8em] mb-5 w-full text-clip line-clamp-1 pl-1 font-light bg-gradient-to-r from-yellow-600 from-70% to-yellow-300 rounded-lg">
              {experience.jobTitle}
            </h4>
            <ul className="relative overscroll-contain ml-3 space-y-2 max-h-[30%] text-[.5em] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/80">
              {experience.points.map((point, i) => {
                return (
                  <li className="bg-stone-500 px-2 py-1 rounded-lg" key={i}>
                    {point}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </article>
  );
}
