import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Project as PJT } from "../../typings";
import Project from "./Project";

type Props = {
  projects: PJT[];
};

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex + 1 === projects.length ? 0 : prevIndex + 1
  //   );
  // };

  // const handlePrevious = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex - 1 < 0 ? projects.length - 1 : prevIndex - 1
  //   );
  // };

  // const handleDotClick = (index: number) => {
  //   setCurrentIndex(index);
  // };

  // useEffect(() => {
  //   // Scroll to the currently selected project smoothly
  //   projectRefs.current[currentIndex]?.scrollIntoView({
  //     behavior: "smooth",
  //     inline: "center",
  //   });
  // }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="relative h-screen max-w-[100vh] xl:max-w-full flex flex-col justify-end mx-auto items-center"
    >
      <h3 className="absolute top-[10vh] md:top-[7vh] uppercase tracking-[10px] xl:tracking-[20px] text-white text-[5vh]">
        Projects
      </h3>
      <div className="absolute z-20 hidden md:flex justify-between w-screen top-[50%]">
        {/* Previous Button */}
        <div
          className="hover:bg-yellow-500/80 hover:cursor-pointer text-[#fff] p-3 mx-5 rounded-[50%] size-14 left-0"
          onClick={handlePrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35"
            viewBox="0 96 960 960"
            width="35"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>
        {/* Next Button */}
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
      {/* Projects Carousel */}
      <div
        className="relative w-screen h-screen px-10 xl:px-0 xl:pt-[20vh] flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-10 scrollbar-thin scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80"
        ref={containerRef}
      >
        {projects?.map((project, index) => {
          return (
            <Project
              projects={projects}
              project={project}
              index={index}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              projectRefs={projectRefs}
              handleDotClick={handleDotClick}
            />
          );
        })}
      </div>
      <div className="w-screen absolute top-[30%] bg-teal-300/10 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
