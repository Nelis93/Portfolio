import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { PageInfo } from "../typings";
import BackgroundCircles from "./BackgroundCircles";
import { urlFor } from "../sanity";
type Props = {
  pageInfo: PageInfo;
};

function Hero({ pageInfo }: Props) {
  const [text, count] = useTypewriter({
    words: [
      "Welcome to my portfolio 😁",
      "Have a look around",
      "It's a work in progress though",
    ],
    loop: true,
    delaySpeed: 3000,
  });
  return (
    <div className="h-screen w-screen relative flex flex-col justify-start items-center px-10 mx-auto">
      <BackgroundCircles />
      <div className="relative w-screen flex flex-col mt-[37.5vh] space-y-5 justify-center items-center">
        <img
          src={urlFor(pageInfo?.heroImage).url()}
          width="200px"
          height="200px"
          alt="no"
          className=" relative rounded-full mx-auto  object-cover xl:w-[25vh] xl:h-[25vh]"
        />
        <div className="z-20 w-full mx-auto">
          <h2 className="text-sm uppercase text-white pb-2 tracking-[15px]  text-center">
            {pageInfo?.role}
          </h2>
          <h1 className="relative px-3 md:px-0 flex flex-row flex-wrap justify-center text-5xl lg:text-6xl font-semibold text-center">
            <span className="mr-3">{text}</span>
            <Cursor cursorColor="White" />
          </h1>
          <div className="invisible md:visible pt-5 flex flex-row justify-center">
            <Link href="#about">
              <button className="heroButton">About</button>
            </Link>
            <Link href="#experience">
              <button className="heroButton">Experience</button>
            </Link>
            <Link href="#skills">
              <button className="heroButton">Skills</button>
            </Link>
            <Link href="#projects">
              <button className="heroButton">Projects</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
