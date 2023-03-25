import React from "react";
import { motion } from "framer-motion";

type Props = {};

export default function About({}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-white text-2xl">
        About
      </h3>
      <motion.img
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        src="/../IMG-20200323-WA0024.jpg"
        className="mb-20 md:mb-0 flex-shrink-0
        w-56
        h-56
        rounded-full
        object-cover
        md:rounded-lg md:w-64 md:h95 xl:w-[500px] xl:h-[600px]"
      />
      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-yellow-300">little</span>{" "}
          background
        </h4>
        <p className="text-base">
          Sons of Gondor! Of Rohan! My brothers. I see in your eyes the same
          fear that would take the heart of me. A day may come when the courage
          of Men fails, when we forsake our friends and break all bonds of
          fellowship, but it is not this day. An hour of wolves and shattered
          shields when the Age of Men comes crashing down, but it is not this
          day! This day we fight! By all that you hold dear on this good earth,
          I bid you stand, Men of the West!
        </p>
      </div>
    </motion.div>
  );
}
