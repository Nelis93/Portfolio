import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GalleryImage } from "../../typings";
import { urlFor } from "../../sanity";

type Props = {
  image: GalleryImage;
  uniqueId: number;
  focus: number;
  setFocus: any;
  setCurrentIndex: any;
  controls: any;
};

export default function GalleryImageCard({
  image,
  uniqueId,
  focus,
  setFocus,
  setCurrentIndex,
  controls,
}: Props) {
  // Create a ref for each project
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
      setCurrentIndex(uniqueId);
    }
  }, [isInView, uniqueId]);
  //the button should enlarge the photo to take up the whole screen. The info can be displayed on the side in a nice font
  const handleButtonClick = () => {};
  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleCardClick = () => {
    console.log(focus, uniqueId);
    console.log(
      focus == uniqueId && window.innerWidth > 700
        ? "galleryImageCardFocus"
        : "galleryImageCardReg"
    );
    setFocus(uniqueId);
  };
  return (
    <motion.div
      //   className={`galleryImageCardReg-small sm:galleryImageCardReg-small-flipped ${focus == uniqueId ? "lg:galleryImageCardFocus" : "lg:galleryImageCardReg"}`}
      key={image._id}
      className="relative group w-full h-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
      onClick={handleCardClick}
      ref={(el) => {
        ref.current = el;
      }}
    >
      <motion.img
        className={`${focus == uniqueId ? "hidden" : "galleryImageCardReg-small-Img sm:galleryImageCardReg-small-flipped-Img lg:galleryImageCardReg-Img"}`}
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
      />
      <div
        className={`${focus != uniqueId ? "hidden" : "galleryImageCardReg-small-FlipSide sm:galleryImageCardReg-small-flipped-FlipSide lg:galleryImageCardReg-FlipSide"}`}
      >
        <h4 className="text-[.7em] font-bold">{image.title}</h4>

        {/* insert button to enlarge */}
        <p className="text-[.5em]">{image.description}</p>
        <p className="text-[.5em] italic self-end">{image.location}</p>
      </div>
    </motion.div>
  );
}
