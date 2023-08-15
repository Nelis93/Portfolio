import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "../../typings";
import { urlFor } from "../../sanity";

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
      className="flex  relative h-screen flex-row px-[20vh] justify-start md:justify-evenly mx-auto items-center"
    >
      <h3 className="absolute w-screen text-center top-[7vh]  uppercase tracking-[20px] text-white text-[5vh]">
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
        className="relative flex-shrink-0 w-[50vh] h-[60vh] rounded-lg object-cover mb-[7vh]  mt-[10vh]"
      />
      <div className="space-y-10 px-10">
        <h4 className="text-2xl md:text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-yellow-300">little</span>{" "}
          background
        </h4>
        <p className="text-base">{pageInfo?.backgroundInformation}</p>
      </div>
    </motion.div>
  );
}
