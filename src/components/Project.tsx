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
      className="project-small sm:project-small-flipped lg:project"
    >
      {/* Project Image */}
      <motion.img
        initial={{ y: -300, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={urlFor(project?.image).url()}
        alt="none available"
        className="project-small-Img sm:project-small-flipped-Img lg:project-Img"
      />
      <div className="project-small-Dots sm:project-small-flipped-Dots lg:project-Dots">
        {projects.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`size-[.8em] rounded-[50%] lg:hover:cursor-pointer ${
              currentIndex === idx ? "bg-yellow-500" : "bg-black"
            }`}
            onClick={() => window.innerWidth > 1000 && handleDotClick(idx)}
          ></div>
        ))}
      </div>
      {/* <div className="space-y-3 xl:px-[1.5em]"> */}
      <h4 className="mb-[.5em] text-[1.8em] col-span-2 justify-self-center self-end text-ellipsis line-clamp-1 overflow-hidden font-semibold text-center underline decoration-yellow-500">
        {project?.title}
      </h4>
      <div className="flex items-center space-x-5 col-span-2 justify-self-center self-end justify-center overflow-x-scroll scrollbar-none">
        {project?.technologies.map((tech) => {
          return (
            <img
              className="h-[1.5em] w-[1.5em]"
              key={tech._id}
              src={urlFor(tech?.image.asset._ref).url()}
              alt=""
            />
          );
        })}
      </div>
      <p className="project-small-Sum sm:project-small-flipped-Sum lg:project-Sum">
        {project?.summary}
      </p>
      {/* </div> */}
    </motion.div>
  );
}
