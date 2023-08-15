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
      className="h-screen relative flex overflow-hidden flex-col text-left max-w-screen justify-start mx-auto items-center z-0"
    >
      <h3 className="top-[7vh] absolute uppercase tracking-[20px] text-white text-[5vh]">
        Projects
      </h3>
      <div className="relative w-screen mt-[20vh] flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80">
        {projects?.map((project, i) => {
          console.log(project);
          return (
            <div
              key={project._id}
              className="w-screen px-[30vh]  snap-center flex flex-col flex-shrink-0 space-y-5 items-center justify-start  h-screen"
            >
              <motion.img
                initial={{ y: -300, opacity: 0 }}
                transition={{ duration: 1.2 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                src={urlFor(project.image).url()}
                alt="none available"
                width={"100"}
                className="w-[30vh] rounded-lg"
              />
              <div className="space-y-[3vh] px-[5vh]">
                <h4 className="text-[5vh] font-semibold text-center">
                  <span className="underline decoration-yellow-500">
                    Project {i + 1}
                  </span>{" "}
                  {project?.title}
                </h4>
                <div className="flex items-center space-x-3 justify-center">
                  {project?.technologies.map((tech) => {
                    // console.log(urlFor(tech?.image.asset._ref).url());
                    return (
                      <img
                        className="h-[7vh] w-[7vh]"
                        key={tech._id}
                        src={urlFor(tech?.image.asset._ref).url()}
                        alt=""
                      />
                    );
                  })}
                </div>
                <p className="text-[3vh] text-center">{project?.summary}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full absolute top-[30%] bg-teal-300/10 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
