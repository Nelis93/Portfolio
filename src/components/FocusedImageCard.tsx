import React, {useRef, useEffect} from 'react'
import {motion, useInView} from 'framer-motion'
import { urlFor } from "../../sanity";
import Dots from './Dots';
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
  
export default function FocusedImageCard({ image, images, galleryRefs, selected, setSelected, uniqueId }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  // Track if each project is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });
  // Update the currentIndex based on which project is in view
  useEffect(() => {
    if (isInView) {
      console.log(uniqueId, " is in view");
      setSelected(uniqueId);
    }
  }, [isInView, uniqueId]);
  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setSelected(-1)
  }
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
      className="project-small sm:project-small-flipped lg:project"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={(el) => {
        ref.current = el;
        galleryRefs.current[uniqueId] = el;
      }}
      exit={{ opacity: 0 }}
    >
     <IconContext.Provider
        value={{
          style: {
            position: "absolute",
            zIndex: "10",
            right: "0",
          },
          className: "social-icon absolute z-20 bg-black rounded-full hover:cursor-pointer",
          attr: {
            onClick: handleButtonClick,
          },
        }}
      >
        <TfiClose />
      </IconContext.Provider>
      <motion.img
        className="project-small-Img sm:project-small-flipped-Img"
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.5 }}
      />
      <div
        className="galleryImageCardFocus-FlipSide"
      >
        <h4 className="text-[.7em] font-bold">{image.title}</h4>

        {/* insert button to enlarge */}
        <p className="text-[.5em]">{image.description}</p>
        <p className="text-[.5em] italic self-end">{image.location}</p>
        <Dots items={images} refs={galleryRefs} currentIndex={selected} setCurrentIndex={setSelected} style={"absolute bottom-0 self-center border-red-500 border-4 z-40 flex justify-center gap-5"} />      
      </div>
      {/* <Slider items={images} refs={galleryRefs} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} style={"absolute z-50 flex justify-between w-screen top-[40vh]"}/> */}
      {/* Implement next/previous controls */}
    </motion.div>
  )
}

