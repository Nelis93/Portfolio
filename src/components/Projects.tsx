import React from "react";
import { motion } from "framer-motion";
import { Project } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className=" relative h-screen max-w-[100vh] xl:max-w-full flex flex-col justify-end mx-auto items-center"
    >
      <h3 className="absolute top-[12vh] md:top-[7vh] uppercase tracking-[10px] xl:tracking-[20px] text-white text-[5vh]">
        Projects
      </h3>
      <div className="relative w-screen h-screen px-10 xl:px-0 xl:pt-[20vh] flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-0 scrollbar-thin scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80">
        {projects?.map((project, i) => {
          return (
            <div
              key={project._id}
              className="relative w-screen pb-5 md:pb-[12vh] xl:pb-[10vh] px-[3vh] xl:px-[30vh] snap-center flex flex-col flex-shrink-0 space-y-5 items-center justify-end"
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
              <div className="space-y-[3vh] xl:px-[5vh]">
                <h4 className="text-[5vh] max-h-[7vh] overflow-y-hidden font-semibold text-center underline decoration-yellow-500">
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
            </div>
          );
        })}
      </div>
      <div className="w-full absolute top-[30%] bg-teal-300/10 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
