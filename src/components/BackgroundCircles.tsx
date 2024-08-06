import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function BackgroundCircles({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 2.5,
      }}
      className="absolute z-0  mx-auto top-[37.5vh]"
    >
      <div className="relative flex justify-center items-center">
        <div className="absolute border border-white rounded-full h-[25vh] w-[25vh] animate-ping " />
        <div className="border border-teal-200 opacity-20 rounded-full h-[35vh] w-[35vh] absolute  " />
        <div className="border border-teal-200 opacity-20 rounded-full h-[55vh] w-[55vh] absolute  " />
        <div className="border border-teal-200 opacity-20 rounded-full h-[70vh] w-[70vh] absolute  animate-pulse" />
        <div className="border border-teal-200 rounded-full h-[85vh] w-[85vh] absolute  " />
      </div>
    </motion.div>
  );
}
