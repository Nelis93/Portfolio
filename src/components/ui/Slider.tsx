import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconContext } from "react-icons";

type Props = {
  items: any;
  refs: any;
  currentIndex: any;
  setCurrentIndex: any;
  style: any;
  scrolling: boolean;
};

export default function Slider({
  items,
  refs,
  currentIndex,
  setCurrentIndex,
  style,
  scrolling,
}: Props) {
  const slide = (index: any) => {
    refs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  };
  const handleNext = (event: any) => {
    event?.stopPropagation();
    const nextIndex = currentIndex + 1 === items.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrolling && slide(nextIndex);
  };
  const handlePrevious = (event: any) => {
    event?.stopPropagation();
    const prevIndex =
      currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrolling && slide(prevIndex);
  };
  return (
    <div className={style}>
      {/* Previous Button */}
      <IconContext.Provider
        value={{
          className:
            "absolute opacity-100 hover:bg-yellow-500/80 z-50 bg-gray-500 hover:cursor-pointer p-3 mx-5 rounded-[50%] size-14 left-0 2xl:ml-[5vw]",
          attr: { onClick: handlePrevious },
        }}
      >
        <FaAngleLeft />
      </IconContext.Provider>
      {/* Next Button */}
      <IconContext.Provider
        value={{
          className:
            "absolute opacity-100 hover:bg-yellow-500/80 z-50 bg-gray-500 hover:cursor-pointer p-3 mx-5 rounded-[50%] size-14 right-0 2xl:mr-[5vw]",
          attr: { onClick: handleNext },
        }}
      >
        <FaAngleRight />
      </IconContext.Provider>
    </div>
  );
}
