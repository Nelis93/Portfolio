import React from "react";
import { motion } from "framer-motion";
import { Project as PJT } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  project: PJT;
  index: number;
  currentIndex: number;
  setCurrentIndex: any;
  ref: any;
};

export default function Project({
  project,
  index,
  currentIndex,
  setCurrentIndex,
}: Props) {
  console.log(currentIndex);
  return (
    <motion.div
      key={currentIndex}
      //   ref={(el) => {
      //     if (el) {
      //       console.log(el);
      //       console.log(pjtRefs);
      //       pjtRefs = el;
      //     }
      //   }}
      //   onViewportEnter={(entry) => console.log(entry?.target.attributes)}
      className="relative w-screen pb-[7vh] md:pb-[12vh] xl:pb-[10vh] px-[3vh] xl:px-[30vh] snap-center flex flex-col flex-shrink-0 items-center justify-end space-y-3"
    >
      <motion.img
        initial={{ y: -300, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        src={urlFor(project?.image).url()}
        alt="none available"
        className="relative w-[35vh] xl:w-[40vh] rounded-lg cursor-none"
      />
      {/* <div className="hidden md:flex justify-center gap-5 mt-2">
                {projects.map((_, idx) => (
                <div
                    key={idx}
                    className={`size-4 rounded-[50%] hover:cursor-pointer ${currentIndex === idx ? "bg-yellow-500" : "bg-black"}`}
                    onClick={() => handleDotClick(idx)}
                ></div>
                ))}
            </div> */}
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
