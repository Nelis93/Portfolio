import React, { useEffect, useState, useRef } from "react";
import type { GetStaticProps } from "next";
import { Social, LogbookEntry } from "../../typings";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { fetchSocials } from "../utils/fetchSocials";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";

type Props = {
  socials: Social[];
};

const CaptainsLog = ({ socials }: Props) => {
  const [selected, setSelected] = useState(-1);
  const [focus, setFocus] = useState(-1);
  function debounce(cb: Function, delay = 1000) {
    let timeout: any;

    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const CARDS = 10;
  const MAX_VISIBILITY = 3;

  const Card = ({ title, content }: any) => (
    <div className="w-full h-full p-8 bg-teal-400 rounded-lg text-white shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        {title}
      </h2>
      <p className="text-justify">{content}</p>
    </div>
  );

  const Carousel = ({ children }: any) => {
    const [active, setActive] = useState(2);
    const count = React.Children.count(children);

    return (
      <div className="relative w-[23rem] h-[23rem]" style={{perspective: "500px",
        transformStyle: "preserve-3d"}}>
        {active > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 z-10 text-white text-5xl cursor-pointer"
            onClick={() => setActive((i) => i - 1)}
          >
            ←
          </button>
        )}

        {React.Children.map(children, (child, i) => (
          <div
            className={`absolute w-full h-full`}
            style={{
              transition:'all',
              transitionDuration:".3s",
              transform: `
                rotateY(${(active - i) * 50}deg)
                scaleY(${1 + Math.abs(active - i) * -0.4})
                translateZ(${Math.abs(active - i) * -30}rem)
                translateX(${Math.sign(active - i) * -4}rem)
              `,
              // zIndex: i <= active ? i : -i + 2*active,
              // opacity: Math.abs(active - i) >= MAX_VISIBILITY ? 0 : 1,
              pointerEvents: active === i ? "auto" : "none",
              filter: `blur(${Math.abs(active - i)}rem)`,
            }}
          >
            {child}
          </div>
        ))}

        {active < count - 1 && (
          <button
            className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 z-10 text-white text-5xl cursor-pointer"
            onClick={() => setActive((i) => i + 1)}
          >
            →
          </button>
        )}
      </div>
    );
  };

  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-2 sm:p-4 lg:p-8  overflow-y-scroll overflow-auto"
    >
      {/* <Header socials={socials} setSelectedFilter={setSelectedFilter} /> */}
      <section className="relative flex bg-transparent w-full h-auto overflow-scroll scrollbar-none">
        <div className="flex items-center justify-center w-full h-screen overflow-clip bg-gradient-to-br from-teal-300 to-teal-600 font-sans">
          <Carousel>
            {[...Array(CARDS)].map((_, i) => (
              <Card
                key={i}
                title={"Card " + (i + 1)}
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              />
            ))}
          </Carousel>
        </div>
      </section>
    </main>
  );
 
  
}


export default dynamic(() => Promise.resolve(CaptainsLog), { ssr: false });

export const getStaticProps: GetStaticProps<Props> = async () => {
  const bigLogs: LogbookEntry[] = await fetchLogbookEntries();
  const socials: Social[] = await fetchSocials();
  return {
    props: {
      bigLogs,
      socials,
    },
    revalidate: 10,
  };
};
