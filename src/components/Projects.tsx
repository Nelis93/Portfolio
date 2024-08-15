import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Project as PJT } from "../../typings";
import { urlFor } from "../../sanity";
import Project from "./Project";

type Props = {
  projects: PJT[];
};

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  // const containerRef = useRef<HTMLDivElement>(null);

  const slide = (index: any) => {
    projectRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };
  const handleNext = () => {
    const nextIndex =
      currentIndex + 1 === projects.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    slide(nextIndex);
  };
  const handlePrevious = () => {
    const prevIndex =
      currentIndex - 1 < 0 ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    slide(prevIndex);
  };
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    slide(index);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className=" relative h-screen max-w-[100vh] xl:max-w-full flex flex-col justify-end mx-auto items-center"
    >
      <h3 className="absolute top-[10vh] md:top-[7vh] uppercase tracking-[10px] xl:tracking-[20px] text-white text-[5vh]">
        Projects
      </h3>
      <div className="absolute z-20 hidden md:flex justify-between w-screen top-[50%]">
        <div
          className="hover:bg-yellow-500/80 hover:cursor-pointer text-[#fff] p-3 mx-5 rounded-[50%] size-14 left-0"
          onClick={handlePrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35"
            viewBox="0 100 1000 1000"
            width="45"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>
        <div
          className="hover:bg-yellow-500/80 hover:cursor-pointer text-[#fff] p-3 mx-5 rounded-[50%] size-14 right-0"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35"
            viewBox="0 96 960 960"
            width="35"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </div>
      </div>
      <div className="hidden md:flex justify-center gap-5 mt-2">
        {projects.map((_, idx) => (
          <div
            key={idx}
            className={`size-4 rounded-[50%] hover:cursor-pointer ${currentIndex === idx ? "bg-yellow-500" : "bg-black"}`}
            onClick={() => handleDotClick(idx)}
          ></div>
        ))}
      </div>
      <div className="relative w-screen h-screen px-10 xl:px-0 xl:pt-[20vh] flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-10 scrollbar-thin scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80">
        {projects?.map((project, index) => {
          return (
            <Project
              project={project}
              index={index}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              ref={(el: any) => {
                if (el) {
                  console.log(projectRefs);
                  projectRefs.current[index] = el;
                }
                setCurrentIndex(index);
              }}
            />
            // <div
            //   key={index}
            //   ref={(el) => {
            //     if (el) {
            //       console.log(projectRefs.current[index]);
            //       projectRefs.current[index] = el;
            //     }
            //   }}
            //   // onViewportEnter={() => console.log(index)}
            //   className="relative w-screen pb-[7vh] md:pb-[12vh] xl:pb-[10vh] px-[3vh] xl:px-[30vh] snap-center flex flex-col flex-shrink-0 items-center justify-end space-y-3"
            // >
            //   <motion.img
            //     initial={{ y: -300, opacity: 0 }}
            //     transition={{ duration: 1.2 }}
            //     whileInView={{ opacity: 1, y: 0 }}
            //     viewport={{ once: true }}
            //     src={urlFor(project?.image).url()}
            //     alt="none available"
            //     className="relative w-[35vh] xl:w-[40vh] rounded-lg cursor-none"
            //   />
            //   <div className="hidden md:flex justify-center gap-5 mt-2">
            //     {projects.map((_, idx) => (
            //       <div
            //         key={idx}
            //         className={`size-4 rounded-[50%] hover:cursor-pointer ${currentIndex === idx ? "bg-yellow-500" : "bg-black"}`}
            //         onClick={() => handleDotClick(idx)}
            //       ></div>
            //     ))}
            //   </div>
            //   <div className="space-y-3 xl:px-[5vh]">
            //     <h4 className="mb-5 text-[5vh] max-h-[7vh] overflow-y-hidden font-semibold text-center underline decoration-yellow-500">
            //       {project?.title}
            //     </h4>
            //     <div className="flex items-center space-x-5 justify-center overflow-x-scroll scrollbar-none">
            //       {project?.technologies.map((tech) => {
            //         return (
            //           <img
            //             className="h-[5vh] w-[5vh]"
            //             key={tech._id}
            //             src={urlFor(tech?.image.asset._ref).url()}
            //             alt=""
            //           />
            //         );
            //       })}
            //     </div>
            //     <p className="text-[3vh] h-[25vh] xl:max-h-[20vh] overflow-y-auto scrollbar-thin scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80 text-center">
            //       {project?.summary}
            //     </p>
            //   </div>
            // </div>
          );
        })}
      </div>
      <div className="w-screen absolute top-[30%] bg-teal-300/10 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
