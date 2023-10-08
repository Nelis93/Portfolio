import Link from "next/link";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { PageInfo } from "../../typings";
import BackgroundCircles from "./BackgroundCircles";
import { urlFor } from "../../sanity";
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
    <div className="h-screen w-screen relative flex flex-col mx-auto">
      <div className=" relative min-h-[50vh] w-screen flex flex-row justify-center">
        <img
          src={urlFor(pageInfo?.heroImage).url()}
          alt="no"
          className="absolute z-0 rounded-full mx-auto top-[25vh] object-cover w-[25vh] h-[25vh]"
        />
        <BackgroundCircles />
      </div>
      <div className="w-full mx-auto space-y-[2vh] pt-[5vh] z-10">
        <h2 className="text-[3vh] uppercase text-white tracking-[15px] text-center">
          {pageInfo?.role}
        </h2>
        <h1 className="relative  flex flex-row flex-wrap justify-center text-[5vh] font-semibold text-center">
          <span className="mr-3">{text}</span>
          <Cursor cursorColor="White" />
        </h1>
        <div className="invisible xl:visible flex flex-row justify-center pt-[3vh]">
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
  );
}

export default Hero;
