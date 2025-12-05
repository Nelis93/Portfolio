import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "../../../typings";
import { urlFor } from "../../../sanity";

type Props = {
  pageInfo: PageInfo;
};

export default function About({ pageInfo }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1 }}
      className="text-[1rem] flex flex-col relative h-screen justify-start mx-auto items-center sm:max-w-full sm:flex-row sm:px-[1em] sm:justify-evenly lg:px-[20vh] lg:text-[5vh]"
    >
      <h3 className="absolute w-screen text-center top-[3em] uppercase tracking-[20px] text-white text-[2em] sm:top-[1.2em] lg:top-[7vh] lg:text-[1em]">
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
        src={urlFor(pageInfo?.profilePic).url()}
        className="relative flex-shrink-0 w-[17em] h-[15em] rounded-lg object-cover mt-[12em] sm:w-[15em] sm:h-[12em] sm:mt-[4em] lg:w-[50vh] lg:h-[60vh] lg:mb-[7vh] lg:mt-[10vh] lg:cursor-none"
      />
      <div className="xl:space-y-10 pl-10  xl:px-10">
        <h4 className="text-[1.5em] pb-[.8em] pt-[1em] font-semibold sm:pb-[1em] sm:pt-[.5em] lg:text-[1em] lg:pb-[.8em] lg:pt-0">
          Here is a{" "}
          <span className="underline decoration-yellow-300">little</span>{" "}
          background
        </h4>
        <p className="text-[1.2em] lg:text-[3vh] pr-10 sm:pr-0">
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}
