import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Project as PJT } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  projects: any;
  project: PJT;
  index: number;
  currentIndex: any;
  setCurrentIndex: any;
  projectRefs: any;
  handleDotClick: any;
};

export default function Project({
  projects,
  project,
  index,
  currentIndex,
  setCurrentIndex,
  projectRefs,
  handleDotClick,
}: Props) {
  // Create a ref for each project
  const ref = useRef<HTMLDivElement | null>(null);
  // Track if each project is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });

  // Update the currentIndex based on which project is in view
  useEffect(() => {
    if (isInView) {
      setCurrentIndex(index);
    }
  }, [isInView, index]);

  return (
    <motion.div
      key={index}
      ref={(el) => {
        ref.current = el;
        projectRefs.current[index] = el;
      }}
      className="relative w-screen pb-[7vh] md:pb-[12vh] xl:pb-[10vh] px-[3vh] xl:px-[30vh] snap-center flex flex-col flex-shrink-0 items-center justify-end space-y-3"
    >
      {/* Project Image */}
      <motion.img
        initial={{ y: -300, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={urlFor(project?.image).url()}
        alt="none available"
        className="relative w-[35vh] xl:w-[40vh] rounded-lg cursor-none"
      />
      <div className="relative z-40 hidden md:flex justify-center gap-5 mt-2">
        {projects.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`size-4 rounded-[50%] hover:cursor-pointer ${
              currentIndex === idx ? "bg-yellow-500" : "bg-black"
            }`}
            onClick={() => handleDotClick(idx)}
          ></div>
        ))}
      </div>
      <div className="space-y-3 xl:px-[5vh]">
        <h4 className="mb-5 text-[5vh] max-h-[7vh] overflow-y-hidden font-semibold text-center underline decoration-yellow-500">
          {project?.title}
        </h4>
        <div className="flex items-center space-x-5 justify-center overflow-x-scroll scrollbar-none">
          {project?.technologies.map((tech) => {
            return (
              <img
                className="h-[5vh] w-[5vh]"
                key={tech._id}
                src={urlFor(tech?.image.asset._ref).url()}
                alt=""
              />
            );
          })}
        </div>
        <p className="text-[3vh] h-[25vh] xl:max-h-[20vh] overflow-y-auto scrollbar-thin scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80 text-center">
          {project?.summary}
        </p>
      </div>
    </motion.div>
  );
}
