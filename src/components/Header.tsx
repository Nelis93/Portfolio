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
    <header className="sticky top-0 p-5 flex items-start justify-between mx-5 z-20">
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
              style={{ width: "5vh", height: "5vh" }}
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
            style={{ width: "5vh", height: "5vh" }}
          />
          <p className="uppercase pl-5 hidden md:inline-flex text-base text-gray-400 hover:text-yellow-500">
            get in touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}

export default Header;
