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
      className="about-small sm:about-small-flipped md:about"
    >
      <h3 className="about-small-Title sm:about-small-flipped-Title md:about-Title">
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
        className="about-small-Img sm:about-small-flipped-Img md:about-Img"
      />
      <div className="xl:space-y-10 pl-10  xl:px-10">
        <h4 className="about-small-SubTitle sm:about-small-flipped-SubTitle md:about-SubTitle">
          Here is a{" "}
          <span className="underline decoration-yellow-300">little</span>{" "}
          background
        </h4>
        <p className="text-[3vh] sm:text-[2.5vw] md:text-[3vh] pr-10 sm:pr-0">
          {pageInfo?.backgroundInformation}
        </p>
      </div>
    </motion.div>
  );
}
