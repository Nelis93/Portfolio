import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Project as PJT } from "../../typings";
import Project from "./Project";
import Slider from "./Slider";
import Dots from "./Dots";

type Props = {
  projects: PJT[];
};

export default function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="projects-small sm:projects-small-flipped lg:projects"
    >
      <h3 className="projects-small-Title sm:projects-small-flipped-Title lg:projects-Title">
        Projects
      </h3>
      
      <Slider items={projects} refs={projectRefs} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} style={"absolute z-20 h-1 hidden xl:flex justify-between w-screen top-[50%]"}/>
      <Dots items={projects} refs={projectRefs} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} style={"absolute bottom-[2vh] left-[20vw] justify-self-center z-40 flex gap-5"}/>      
      {/* Projects Carousel */}
      <div
        className="projects-small-Carousel sm:projects-small-flipped-Carousel lg:projects-Carousel"
        ref={containerRef}
      >
        {projects
          ?.sort((a, b) => a.position - b.position)
          .map((project, index) => {
            return (
              <Project
                key={project.position}
                projects={projects}
                project={project}
                index={index}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                projectRefs={projectRefs}
              />
            );
          })}
      </div>
      <div className="hidden lg:block w-screen absolute top-[30%] bg-teal-300/10 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
