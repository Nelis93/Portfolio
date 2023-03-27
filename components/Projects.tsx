import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function Projects({}: Props) {
  const projects = [1, 2, 3, 4, 5];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-white text-2xl">
        Projects
      </h3>
      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-mandatory z-20 scrollbar-thin scrollbar-track-teal-300/40 scrollbar-thumb-yellow-500/80">
        {/* {projects.map((project, i) => {
          <div className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p44 h-screen">
            <motion.img
              initial={{ y: -300, opacity: 0 }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="/../IMG-20190517-WA0014.jpg"
              alt="none available"
            />
            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-4xl font-semi-bold text-center">
                <span className="underline decoration-yellow-500">
                  Epic Battle {i + 1}
                </span>
                Pelenor fields
              </h4>
              <p className="text-lg text-center md:text-left"></p>
            </div>
          </div>;
        })} */}
      </div>
      <div className="w-full absolute top-[30%] bg-teal-300/10 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
}
