import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { urlFor } from "../../../sanity";
import { GalleryImage } from "typings";
import { TfiClose } from "react-icons/tfi";
import { IconContext } from "react-icons";
import Link from "next/link";

type Props = {
  image: GalleryImage;
  uniqueId: number;
  setSelected: any;
  galleryRefs: any;
};
// Create a ref for each image

export default function FocusedImageCard({
  image,
  galleryRefs,
  setSelected,
  uniqueId,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // Track if each image is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });
  // Update the currentIndex based on which image is in view
  useEffect(() => {
    if (isInView) {
      setSelected(uniqueId);
    }
  }, [isInView, uniqueId]);
  const [dominance, setDominance] = useState(true);
  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setSelected(-1);
  };
  // detDom will toggle the lateral position of the image within the card
  const detDom = (event: any) => {
    if (
      window.innerWidth > 500 &&
      event.target.offsetWidth > event.target.parentElement.offsetWidth * 0.5
    ) {
      setDominance((current: boolean) => !current);
    }
  };
  return (
    <motion.div
      className="relative flex flex-col sm:flex-row justify-start snap-center items-start w-screen sm:w-[70vw] z-50 sm:mx-auto border-4 rounded-xl border-gray-500 sm:overflow-x-clip h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={(el) => {
        ref.current = el;
        galleryRefs.current[uniqueId] = el;
      }}
      // id={uniqueId.toString()}
      exit={{ opacity: 0 }}
      onClick={detDom}
    >
      <IconContext.Provider
        value={{
          className:
            "social-icon sm:size-[2em] lg:size-[1.2em] absolute right-0 z-40 bg-black hover:bg-gray-500 hover:fill-black rounded-full hover:cursor-pointer",
          attr: {
            onClick: handleButtonClick,
            onSelect: handleButtonClick,
          },
        }}
      >
        <TfiClose />
      </IconContext.Provider>
      <motion.img
        className="relative rounded-lg h-fit max-h-full w-auto  justify-self-start self-start place-items-start items-start object-contain lg:col-span-3 lg:row-span-10"
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
        style={{
          x: dominance ? 0 : "-30%",
          cursor: dominance
            ? "url(/ArrowLeft.svg), pointer"
            : "url(/ArrowRight.svg), pointer",
        }}
      />
      <div
        style={{
          transform: dominance ? "" : "translate(-40%)",
          minWidth: dominance ? "0" : "40%",
          pointerEvents: "none",
        }}
        className="relative flex flex-col flex-grow  justify-center sm:justify-start sm:items-start w-full sm:h-full text-wrap px-[.2em] sm:px-[1em] pt-[2em] sm:pb-[3em] lg:pb-0 space-y-[1em] lg:col-span-2 lg:row-span-10"
      >
        <Link href={"en.wikipedia.org"} className="z-50">
          <h4 className="bottom-[2em] relative sm:bottom-auto text-[.8em] text-center sm:text-[.9em] lg:text-[.7em] font-bold">
            {image.title}
          </h4>
        </Link>
        <p className="hidden sm:block text-[.7em] lg:text-[.5em] max-w-full overflow-scroll scrollbar-none  lg:max-h-[70%] ">
          {image.description}
        </p>
        <p className="absolute bg-black text-[.6em] sm:text-[.7em] lg:text-[.5em] bottom-4 text-right right-4 italic">
          {image.location}
        </p>
      </div>
    </motion.div>
  );
}
