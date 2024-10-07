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
  // const [isAnimating, setIsAnimating] = useState(false)
  const [iconPosition, setIconPosition] = useState("none");

  const handleImageLoad = (event: any) => {
    const height = event.target.offsetHeight;
    console.log(height);
    const heightInVH = (height / window.innerHeight) * 100;
    setImageHeight(heightInVH);

    // Update the max height if the current image's height is greater
    setMaxHeight((prevMaxHeight: number) =>
      Math.max(prevMaxHeight, heightInVH)
    );
  };

  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleCardClick = (event: any) => {
    const intendedFlipWidth = event.target.parentElement.offsetWidth - event.target.parentElement.firstChild.clientWidth
    console.log(intendedFlipWidth)
    event.stopPropagation();
    if (window.innerWidth > 1000) {
        setFocus((current: any) => { 
          if(current == uniqueId) {
            setIconPosition("none")
            return -1
          } 
          // setIconPosition((current: any) => (current == "none" ? `rotateY(180deg) translateX(${intendedFlipWidth}px)`: "none"))
          setIconPosition(`rotateY(180deg) translateX(${intendedFlipWidth}px)`)
          return uniqueId
        })
        return;
    }
        setSelected(uniqueId);
    }


  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setSelected(uniqueId);
  };

  return (
    <div  
      style={{ 
        height: `${window.innerWidth > 1024 ? maxHeight : imageHeight}vh`,
        perspective: "1000px"
      }} 
      key={image._id} 
      className="group relative w-full lg:max-h-[75vh]  lg:cursor-pointer" 
      onClick={handleCardClick}>
      <motion.div
        
        className="relative h-full w-auto"
        animate={{ rotateY: focus != uniqueId ? 0 : 180 }}
        initial={false}
        // transition={{ duration: 0.3, animationDirection: "normal" }}
        onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
        // onAnimationComplete={() => setIsAnimating(false)}
        ref={(el) => {
          galleryRefs.current[uniqueId] = el;
        }}
        style={{
          transition: "transform 0.6s",
          transformStyle: "preserve-3d"

        }}
      >
        <IconContext.Provider
          value={{
            className:
              "social-icon absolute hidden lg:block z-20 right-0 bg-black rounded-full hover:cursor-pointer",
            attr: {
              onClick: handleButtonClick,
            },
            style: {
              "transitionProperty": "transform",
              // "transitionDuration":".6s",
              "transitionDelay":".6s",
              "transitionTimingFunction": "ease-in-out",
              // "right": `${iconPosition.right}`,
              // "left":`${iconPosition.left}`,
              "transform": `${iconPosition}`,
              "transformStyle": "preserve-3d"
    
            }
          }}
        >
          <TfiNewWindow />
        </IconContext.Provider>
          <motion.img
            className="relative lg:absolute w-full h-fit lg:w-auto  sm:h-auto rounded-lg" 
            // object-cover lg:object-contain sm:transition-opacity  sm:duration-200 sm:ease-in-out sm:group-hover:opacity-80"
            src={urlFor(image.actualImage)?.url()}
            alt={image.title}
            onLoad={handleImageLoad} // Trigger height calculation on load
            style={{
              backfaceVisibility: "hidden"
            }}
          />


          <div 
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden"
            }}
            className="absolute hidden border-4 border-white left-0 w-full h-full rounded-lg p-4 lg:flex flex-col justify-start items-center space-y-5 pt-6 transition-all duration-300">
            <h4 className="text-[.7em] lg:text-[.5em] font-bold">
              {image.title}
            </h4>
            <p className="text-[.5em] lg:text-[.4em]">{image.description}</p>
            <p className="absolute text-[.7em] lg:text-[.5em] bottom-4 right-4 italic">
              {image.location}
            </p>
          </div>
      </motion.div>
    </div>
  );
}
