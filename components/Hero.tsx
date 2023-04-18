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
    words: ["Elessar", "Strider", "Isildur's heir", "Captain of the Dunedain"],
    loop: true,
    delaySpeed: 3000,
  });
  return (
    <>
      <div className="h-screen relative flex flex-col items-center justify-start text-center overflow-hidden">
        <BackgroundCircles />
        <div className="w-screen h-[37.5vh] bg-white"></div>
        <img
          src={urlFor(pageInfo?.heroImage).url()}
          width="200px"
          height="200px"
          alt="no"
          className=" relative rounded-full mx-auto  object-cover xl:w-[25vh] xl:h-[25vh]"
        />
        <div className="z-20">
          <h2 className="text-sm uppercase text-white pb-2 tracking-[15px]">
            {pageInfo?.role}
          </h2>
          <h1 className="text-5xl lg:text-6xl font-semibold px-10">
            <span className="mr-3">{text}</span>
            <Cursor cursorColor="White" />
          </h1>
          <div className="pt-5">
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
    </>
  );
}

export default Hero;
