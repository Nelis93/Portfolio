import React, { useEffect, useState, useRef } from "react";
import type { GetStaticProps } from "next";
import { Social } from "../../typings";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { fetchSocials } from "../utils/fetchSocials";

type Props = {
  socials: Social[];
};

const CaptainsLog = ({  socials }: Props) => {
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
  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-2 sm:p-4 lg:p-8  overflow-y-scroll overflow-auto"
    >
      <Header socials={socials} setSelectedFilter={setSelectedFilter} />
      <section
        className="relative flex bg-transparent w-full h-auto overflow-y-scroll lg:overscroll-none scrollbar-none pt-[5vh] sm:pt-0 lg:mt-15 max-w-[90vw] mx-auto sm:max-w-[80vw] sm:px-[1em] lg:text-[2em] lg:px-[20vh] lg:h-screen  lg:max-w-[1500px]"
      >
        <div
          className="relative z-[1] bg-transparent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-0 w-full"
        ></div>
        </section>
    </main>
  );
};

export default dynamic(() => Promise.resolve(CaptainsLog), { ssr: false });

export const getStaticProps: GetStaticProps<Props> = async () => {
  const bigLogs: LogbookEntry[] = await fetchLog();
  const socials: Social[] = await fetchSocials();
  return {
    props: {
      bigLogs,
      socials,
    },
    revalidate: 10,
  };
};
