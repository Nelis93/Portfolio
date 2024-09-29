import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaCameraRetro,
  FaHome,
  FaEnvelope,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Social } from "../../typings";

type Props = {
  socials: Social[];
};

function Header({ socials }: Props) {
  const iconMap: { [key: string]: React.ElementType } = {
    FaLinkedinIn: FaLinkedinIn,
    FaFacebookF: FaFacebookF,
    FaCameraRetro: FaCameraRetro,
    FaHome: FaHome,
  };
  return (
    <header className="text-[5vh] sm:text-[5vw] lg:text-[5vh] sticky top-0 p-5 flex items-start justify-between mx-5 z-20">
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
        {socials
          .sort((a, b) => a.position - b.position)
          .map((social) => {
            const IconComponent = iconMap[social.tag];
            return (
              <Link href={social.url}>
                <IconContext.Provider
                  value={{
                    className: "social-icon",
                  }}
                >
                  <IconComponent />
                </IconContext.Provider>
              </Link>
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
          <IconContext.Provider
            value={{
              className: "social-icon",
            }}
          >
            <FaEnvelope />
          </IconContext.Provider>
          <p className="uppercase pl-5 hidden lg:inline-flex text-[.5em] text-gray-400 hover:text-yellow-500">
            get in touch
          </p>
        </motion.div>
      </Link>
    </header>
  );
}

export default Header;
