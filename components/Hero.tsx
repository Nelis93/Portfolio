import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
type Props = {};

function Hero({}: Props) {
  const [text, count] = useTypewriter({
    words: ["Elesar", "Strider", "Isildur's heir", "Captain of the Dunedain"],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <Image
        src="/../public/IMG-20200323-WA0030.jpg"
        width={50}
        height={50}
        alt="no"
        className="relative rounded-full mx-auto object-cover"
      />
      <div>
        <h2 className="text-sm uppercase">King of Gondor</h2>
        <h1>
          <span>{text}</span>
          <Cursor cursorColor="White" />
        </h1>
      </div>
    </div>
  );
}

export default Hero;
