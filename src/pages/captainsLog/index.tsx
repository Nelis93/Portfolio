import React, { useState, useRef } from "react";
import type { GetStaticProps } from "next";
import { Social, LogbookEntry } from "../../../typings";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { fetchSocials } from "../../utils/fetchSocials";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";
import EntryCarousel from "@/components/CaptainsLog/EntryCarousel";
import EntryCard from "@/components/CaptainsLog/EntryCard";
import Slider from "@/components/Slider";

type Props = {
  socials: Social[];
  logBookEntries: LogbookEntry[];
};

const CaptainsLog = ({ socials, logBookEntries }: Props) => {
  const [selected, setSelected] = useState(0);
  // const [scrollPos, setScrollPos] = useState(0);
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
  function throttle(cb: Function, delay = 1000) {
    let shouldWait = false;
    let waitingArgs: any;
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false;
        // waitingArgs = undefined
      } else {
        cb(...waitingArgs); // Execute with the last arguments if needed
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      }
    };

    return (...args: any) => {
      if (shouldWait) {
        waitingArgs = args;
        return;
      }
      cb(...args); // Execute the callback immediately
      shouldWait = true;
      setTimeout(timeoutFunc, delay);
    };
  }
  const handleScroll = (event: any) => {
    setSelected(() => {
      return Math.round(
        (event.target.scrollTop / event.target.scrollTopMax) *
          (logBookEntries.length - 1)
      );
    });
  };
  return (
    <main
      translate="no"
      className="relative flex flex-col justify-start items-center bg-gradient-to-br from-teal-300 to-teal-600 text-white w-full overflow-y-scroll scrollbar-none overflow-x-clip"
    >
      <Header socials={socials} setSelectedFilter={null} />
      <section className="relative flex flex-col justify-center w-full lg:px-auto h-screen scrollbar-none items-start overflow-x-hidden sm:items-center">
        <h1 className="text-[2em]">
          {/* These are some writings for when you're free 🦅 */}
        </h1>
        <Slider
          items={logBookEntries}
          refs={logBookEntryRefs}
          currentIndex={selected}
          setCurrentIndex={setSelected}
          style={
            "absolute hidden sm:flex flex-row justify-between items-center h-[5em] bg-transparent w-1/2"
          }
          scrolling={false}
        />
        <div
          className="relative text-white w-2/3 max-w-[60em] sm:h-[60vh] sm:max-h-[30em] overflow-y-scroll scrollbar-none"
          onScroll={handleScroll}
        >
          <EntryCarousel
            selected={selected}
            setSelected={setSelected}
            debounce={debounce}
          >
            {logBookEntries
              .sort((a, b) => a.position - b.position)
              .map((entry, index) => {
                return (
                  <EntryCard
                    key={entry._id}
                    uniqueId={index}
                    logBookEntry={entry}
                    logBookEntryRefs={logBookEntryRefs}
                    style={""}
                  />
                );
              })}
          </EntryCarousel>
          <div className="relative text-white w-full h-[200vh]"></div>
        </div>
      </section>
      <section className="relative">
        <div className="h-screen w-screen bg-black "></div>
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
