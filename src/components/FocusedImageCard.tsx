import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { urlFor } from "../../sanity";
import { GalleryImage } from "../../typings";
import { TfiClose } from "react-icons/tfi";
import { IconContext } from "react-icons";

type Props = {
  image: GalleryImage;
  images: GalleryImage[];
  uniqueId: number;
  selected: any;
  setSelected: any;
  galleryRefs: any;
};
// Create a ref for each project

export default function FocusedImageCard({
  image,
  galleryRefs,
  setSelected,
  uniqueId,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  // Track if each project is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });
  // Update the currentIndex based on which project is in view
  // useEffect(() => {
  //   if (isInView && galleryRefs.current[uniqueId]) {
  //     // console.log(
  //     //   uniqueId,
  //     //   " is in view",
  //     //   galleryRefs.current[uniqueId],
  //     //   " ref"
  //     // );
  //     setSelected(uniqueId);
  //     galleryRefs.current[uniqueId]?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "nearest", // Adjust this to 'center' if you want it to center vertically
  //       inline: "center",
  //     });
  //   }
  // }, [isInView, uniqueId, galleryRefs]);
  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setSelected(-1);
  };
  // const handleClickOutside = (event: any) => {
  //   // Check if the click is outside the motion.div (ref.current)
  //   event.stopPropagation();
  //   if (ref.current != event.target.parentElement && !ref.current?.contains(event.target)) {
  //     console.log("clicked outside");
  //     setSelected(-1)
  //     return;
  //   }
  //   console.log("clicked inside");
  // };

  // useEffect(() => {
  //   // Attach the event listener to the whole document
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <motion.div
      className="relative flex flex-col w-screen sm:w-[70vw] z-50 max-w-[1500px] sm:mx-auto border-4 rounded-xl border-gray-500 h-[90vh] sm:h-full sm:grid grid-cols-5 grid-rows-10 sm:flex-wrap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={(el) => {
        ref.current = el;
        galleryRefs.current[uniqueId] = el;
      }}
      id={uniqueId.toString()}
      exit={{ opacity: 0 }}
    >
      <IconContext.Provider
        value={{
          className:
            "social-icon sm:size-[2em] absolute right-0 z-40 bg-black rounded-full hover:cursor-pointer",
          attr: {
            onClick: handleButtonClick,
          },
        }}
      >
        <TfiClose />
      </IconContext.Provider>
      <motion.img
        className="relative rounded-lg cursor-none h-fit max-h-full w-auto col-span-3 row-span-10 justify-self-start self-start place-items-start items-start object-contain"
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.5 }}
      />
      <div className="relative flex flex-col h-full w-auto px-[1em] pt-[1em] space-y-[1em] col-span-2 row-span-10">
        <h4 className="text-[.9em] lg:text-[.7em] font-bold">{image.title}</h4>
        <p className="hidden sm:block text-[.7em] lg:text-[.5em]">
          {image.description}
        </p>
        <p className="absolute text-[.7em] lg:text-[.5em] bottom-4 right-4 italic">
          {image.location}
        </p>
      </div>
    </motion.div>
  );
}
