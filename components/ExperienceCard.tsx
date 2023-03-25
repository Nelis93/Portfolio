import React from "react";
import { motion } from "framer-motion";
import next from "next";
import { SocialIcon } from "react-social-icons";

type Props = {};

export default function ExperienceCard({}: Props) {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-teal-200 p-10 hover:opacity-100 opacity-40 cursor-pointer transition-opacity duration-200 overflow-hidden">
      <motion.img
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        src="/../IMG-20200323-WA0042.jpg"
        alt="not found"
      />
      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">Numenorian</h4>
        <p className="font-bold text-2xl mt-1">men of the west</p>
        <div className="flex space-x-2 my-2">
          <SocialIcon
            className="h-10 w-10 rounded-full"
            url=""
            fgColor="gray"
            bgColor="transparant"
          />
          <SocialIcon
            className="h-10 w-10 rounded-full"
            url=""
            fgColor="gray"
            bgColor="transparant"
          />
          <SocialIcon
            className="h-10 w-10 rounded-full"
            url=""
            fgColor="gray"
            bgColor="transparant"
          />
        </div>
        <p className="uppercase py-5 text-white">started-ended</p>
        <ul className="list-disc space-y-4 ml-5 text-lg">
          <li>yes</li>
          <li>no</li>
          <li>maybe</li>
          <li>I don't know</li>
          <li>perhaps</li>
        </ul>
      </div>
    </article>
  );
}
