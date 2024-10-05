import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GalleryImage } from "../../typings";
import { urlFor } from "../../sanity";
import { TfiNewWindow } from "react-icons/tfi";
import { IconContext } from "react-icons";

type Props = {
  image: GalleryImage;
  uniqueId: number;
  controls: any;
  galleryRefs: any;
  setSelected: any;
  focus: any;
  setFocus: any;
  maxHeight: number;
  setMaxHeight: any;
};

export default function GalleryImageCard({
  image,
  uniqueId,
  controls,
  galleryRefs,
  setSelected,
  focus,
  setFocus,
  maxHeight, // New prop to pass max height
  setMaxHeight, // New prop to set max height
}: Props) {
  const [imageHeight, setImageHeight] = useState(0);
  // useEffect(() => {
  //   console.log(galleryRefs.current[uniqueId].lastChild.offsetHeight);
  //   const calculateHeightInVH = () => {
  //     if (elementRef.current) {
  //       const elementHeightPx = elementRef.current.offsetHeight;
  //       const viewportHeightPx = window.innerHeight;
  //       const heightInVH = (elementHeightPx / viewportHeightPx) * 100;
  //       setElementHeightVH(heightInVH);
  //     }
  //   };

  //   // Calculate on component mount
  //   calculateHeightInVH();

  //   // Recalculate on window resize
  //   window.addEventListener("resize", calculateHeightInVH);
  //   return () => window.removeEventListener("resize", calculateHeightInVH);
  // }, []);
  // This function handles image loading and updates max height
  const handleImageLoad = (event: any) => {
    const height = event.target.offsetHeight;
    const heightInVH = (height / window.innerHeight) * 100;
    setImageHeight(heightInVH);

    // Update the max height if the current image's height is greater
    setMaxHeight((prevMaxHeight: number) =>
      Math.max(prevMaxHeight, heightInVH)
    );
  };

  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleCardClick = (event: any) => {
    event.stopPropagation();
    if (window.innerWidth > 1000) {
      setFocus((current: any) => (current == uniqueId ? -1 : uniqueId));
      return;
    }
    console.log("uniqueId", uniqueId);
    setSelected(uniqueId);
  };

  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setSelected(uniqueId);
  };

  return (
    <motion.div
      // className="group galleryImageCardReg-small sm:galleryImageCardReg-small-flipped lg:galleryImageCardReg"
      className={`group flex relative w-full sm:min-h-[60vh] h-auto sm:h-fit lg:h-[${maxHeight + "vh"}] lg:max-h-[75vh] lg:cursor-pointer lg:overflow-auto lg:border-none lg:w-full`}
      key={image._id}
      animate={{ rotateY: focus != uniqueId ? 360 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ rotateY: 0 }}
      transition={{ duration: 0.8, ease: [1, 1, 1, 1] }}
      onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
      onClick={handleCardClick}
      ref={(el) => {
        galleryRefs.current[uniqueId] = el;
      }}
    >
      <IconContext.Provider
        value={{
          // style: {
          //   position: "absolute",
          //   zIndex: "10",
          //   right: "0"
          // },
          className:
            "social-icon absolute hidden lg:block z-40 right-0 bg-black rounded-full hover:cursor-pointer",
          attr: {
            onClick: handleButtonClick,
          },
        }}
      >
        <TfiNewWindow />
      </IconContext.Provider>
      {focus !== uniqueId && (
        <motion.img
          // className="galleryImageCardReg-small-Img sm:galleryImageCardReg-small-flipped-Img lg:galleryImageCardReg-Img"
          className="w-full h-fit sm:h-auto rounded-lg object-cover sm:transition-opacity sm:duration-200 sm:ease-in-out sm:group-hover:opacity-80 lg:w-full lg:h-auto"
          src={urlFor(image.actualImage)?.url()}
          alt={image.title}
          onLoad={handleImageLoad} // Trigger height calculation on load
        />
      )}

      {focus === uniqueId && (
        <div className="hidden lg:galleryImageCardReg-FlipSide">
          <h4 className="text-[.7em] font-bold">{image.title}</h4>
          <p className="text-[.5em]">{image.description}</p>
          <p className="text-[.5em] italic self-end">{image.location}</p>
        </div>
      )}
    </motion.div>
  );
}
