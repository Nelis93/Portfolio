import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import DropDownFilter from "./DropDownFilter";

type Props = {
  socials: Social[];
  setSelectedFilter: any
};

function Header({ socials, setSelectedFilter }: Props) {
  const router = useRouter();
  const [isGalleryPage, setIsGalleryPage] = useState(false);
  

  useEffect(() => {
    setIsGalleryPage(router.pathname.includes("gallery"));
  }, [router.pathname]);

  // Define the icon map for general use
  const iconMap: { [key: string]: React.ElementType } = {
    FaLinkedinIn: FaLinkedinIn,
    FaFacebookF: FaFacebookF,
    FaCameraRetro: FaCameraRetro,
    FaHome: FaHome,
  };

  return (
    <header className="text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] sticky top-0 p-5 flex items-start justify-between z-20">
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
          .filter((social) => {
            const taggie = isGalleryPage ? "FaCameraRetro" : "FaHome";
            return social.tag != taggie;
          })
          .map((social) => {
            let IconComponent = iconMap[social.tag];
            return (
              <Link key={social._id} href={social.url} className="social-icon">
                <IconContext.Provider
                  value={{
                    className: "h-[75%]",
                  }}
                >
                  <IconComponent />
                </IconContext.Provider>
              </Link>
            );
          })}
      </motion.div>
        <DropDownFilter setSelectedFilter={setSelectedFilter}/>
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
          <Link href="/#contact" className="social-icon">
          <IconContext.Provider
            value={{
              className: "h-[75%]",
            }}
          >
            <FaEnvelope />
          </IconContext.Provider>
      </Link>
          <Link href="/#contact" className="uppercase pl-5 hidden lg:inline-flex text-[.5em] text-gray-400 hover:text-yellow-500">
            get in touch
          </Link>
        </motion.div>
    </header>
  );
}

export default Header;
