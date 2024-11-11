import React, { useEffect, useState, useRef } from "react";
import type { GetStaticProps } from "next";
import { Social, LogbookEntry } from "../../typings";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { fetchSocials } from "../utils/fetchSocials";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";
import EntryCarousel from "@/components/CaptainsLog/EntryCarousel";
import EntryCard from "@/components/CaptainsLog/EntryCard";
import Slider from "@/components/Slider";

type Props = {
  socials: Social[];
  logBookEntries: LogbookEntry[];
};

const CaptainsLog = ({ socials, logBookEntries }: Props) => {
  const [selected, setSelected] = useState(2);
  // const [focus, setFocus] = useState(-1);
  const logBookEntryRefs = useRef<(HTMLDivElement | null)[]>([]);
  function debounce(cb: Function, delay = 1000) {
    let timeout: any;

    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  // const CARDS = 10;
  // const MAX_VISIBILITY = 3;

  // const Card = ({ title, content }: any) => (
  //   <div className="w-full h-full p-8 bg-teal-400 rounded-lg text-white shadow-lg transition-all duration-300">
  //     <h2 className="text-2xl font-bold text-center mb-4 text-white">
  //       {title}
  //     </h2>
  //     <p className="text-justify">{content}</p>
  //   </div>
  // );

  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-2 sm:p-4 lg:p-8  overflow-y-scroll overflow-auto"
    >
      {/* <Header socials={socials} setSelectedFilter={setSelectedFilter} /> */}
      <section className="relative flex bg-transparent w-full h-auto overflow-scroll scrollbar-none">
        <Slider
          items={logBookEntries}
          refs={logBookEntryRefs}
          currentIndex={selected}
          setCurrentIndex={setSelected}
          style={
            "fixed z-20 hidden sm:flex flex-row justify-between items-center h-full bg-transparent w-screen"
          }
        />
        <div className="flex items-center justify-center w-full h-full overflow-x-scroll bg-gradient-to-br from-teal-300 to-teal-600 font-sans">
          <EntryCarousel selected={selected}>
            {logBookEntries
              .sort((a, b) => a.position - b.position)
              .map((entry, index) => {
                return (
                  <EntryCard
                    uniqueId={index}
                    logBookEntry={entry}
                    logBookEntryRefs={logBookEntryRefs}
                    setSelected={setSelected}
                  />
                );
              })}
          </EntryCarousel>
        </div>
      </section>
    </main>
  );
};

export default dynamic(() => Promise.resolve(CaptainsLog), { ssr: false });

export const getStaticProps: GetStaticProps<Props> = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries();
  const socials: Social[] = await fetchSocials();
  return {
    props: {
      logBookEntries,
      socials,
    },
    revalidate: 10,
  };
};
