import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Social } from "../../typings";
type Props = {
  socials: Social[];
};

function Header({ socials }: Props) {
  return (
    <header className="text-[5vh] sm:text-[5vw] md:text-[5vh] sticky top-0 p-5 flex items-start justify-between mx-5 z-20">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row space-x-2 items-center"
      >
        {socials.map((social) => {
          return (
            <SocialIcon
              key={social._id}
              url={social.url}
              target="blank"
              fgColor="gray"
              bgColor="transparant"
              style={{ width: "1.2em", height: "1.2em" }}
              className="social-icon"
            />
          );
        })}
      </motion.div>
      <Link href="#contact">
        <motion.div
          initial={{
            x: 500,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex flex-row items-center text-gray-300 cursor-pointer"
        >
          <SocialIcon
            className="social-icon"
            network="email"
            fgColor="gray"
            bgColor="transparant"
            style={{ width: "1.2em", height: "1.2em" }}
          />
          <p className="uppercase pl-5 hidden md:inline-flex text-[.5em] text-gray-400 hover:text-yellow-500">
            get in touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}

export default Header;
