import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GalleryImage } from "../../typings";
import { urlFor } from "../../sanity";
import { TfiNewWindow } from "react-icons/tfi";
import { IconContext } from "react-icons";

type Props = {
  image: GalleryImage;
  uniqueId: number;
  cardCount: any;
  galleryRefs: any;
  setSelected: any;
  focus: any;
  setFocus: any;
  maxHeight: any;
  setMaxHeight: any;
};

export default function GalleryImageCard({
  image,
  uniqueId,
  cardCount,
  galleryRefs,
  setSelected,
  focus,
  setFocus,
  maxHeight, // New prop to pass max height
  setMaxHeight, // New prop to set max height
}: Props) {
  const [imageHeight, setImageHeight] = useState(0);
  // const [isAnimating, setIsAnimating] = useState(false)
  const [iconPosition, setIconPosition] = useState({
    distance: 0,
    transform: "none",
  });

  const handlePosition = (event: any) => {
    const intendedFlipWidth =
      event.target.parentElement.parentElement.offsetWidth -
      event.target.parentElement.parentElement.firstChild.clientWidth;
    setIconPosition((current) => {
      return { distance: intendedFlipWidth, transform: current.transform };
    });
  };
  useEffect(() => {
    if (focus == uniqueId) {
      setIconPosition((current) => {
        return {
          distance: current.distance,
          transform: `rotateY(180deg) translateX(${current.distance}px)`,
        };
      });
      return;
    }
    setIconPosition((current) => {
      return { distance: current.distance, transform: "none" };
    });
    return;
  }, [focus]);
  // const handleImageLoad = (event: any) => {
  //   const height = event.target.offsetHeight;
  //   const heightInVH = (height / window.innerHeight) * 100;
  //   setImageHeight(heightInVH);
  //   // Update the max height if the current image's height is greater
  //   setMaxHeight((prevMaxHeight: any) => {
  //     // console.log("prevMaxHeight.index ", prevMaxHeight.index);
  //     // console.log("galleryRefs# ", galleryRefs.current.length);
  //     function calcHeight() {
  //       const maxArray = [];
  //       for (let i = 0; i <= galleryRefs.current.length; i += 3) {
  //         let triplet = [];
  //         for (let y = 0; y < 3; y++) {
  //           console.log(
  //             "prevMaxHeight.current[i + y] ",
  //             prevMaxHeight.current[i + y],
  //             "heightInVH ",
  //             heightInVH,
  //             "prevMaxHeight.current[i + y] ?? heightInVH ",
  //             prevMaxHeight.current[i + y] ?? heightInVH
  //           );
  //           triplet.push(prevMaxHeight.current[i + y] ?? heightInVH);
  //         }
  //         for (let z = 0; z < 3; z++) {
  //           // console.log("Math.max(...triplet) ", Math.max(...triplet));
  //           maxArray.push(Math.max(...triplet));
  //         }
  //         // console.log("triplet ", triplet);
  //       }
  //       // console.log("maxArray ", maxArray);
  //       return {
  //         current: maxArray,
  //         index: 0,
  //       };
  //     }
  //     return prevMaxHeight.index < 2
  //       ? // return prevMaxHeight.current.length < 3
  //         {
  //           current: [...prevMaxHeight.current, heightInVH],
  //           index: prevMaxHeight.index + 1,
  //         }
  //       : calcHeight();
  //   });
  // };

  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleImageLoad = (event: any) => {
    const height = event.target.offsetHeight;
    const heightInVH = (height / window.innerHeight) * 100;
    setImageHeight(heightInVH);

    setMaxHeight((prevMaxHeight: any) => {
      const updatedHeights = [...prevMaxHeight.current];

      // Update the height at the correct index (uniqueId)
      updatedHeights[uniqueId] = heightInVH;

      // Calculate max height for each triplet group
      const newMaxArray = [];
      for (let i = 0; i < updatedHeights.length; i += 3) {
        const triplet = updatedHeights.slice(i, i + 3);
        const maxTripletHeight = Math.max(...triplet);
        newMaxArray.push(...Array(triplet.length).fill(maxTripletHeight));
      }

      return {
        current: newMaxArray, // Updated array with max heights for each triplet
        index: updatedHeights.length - 1, // Update index to the last processed image
      };
    });
  };

  const handleCardClick = (event: any) => {
    event.stopPropagation();
    if (window.innerWidth > 1000) {
      setFocus((current: any) => {
        if (current == uniqueId) {
          return -1;
        }
        return uniqueId;
      });
      return;
    }
    setSelected(uniqueId);
  };

  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setSelected(uniqueId);
  };
  return (
    // <div
    //   style={{
    //     height: `${window.innerWidth > 1024 ? maxHeight.current[uniqueId] : imageHeight}vh`,
    //     perspective: "1000px",
    //   }}
    //   key={image._id}
    //   className="group relative w-full lg:max-h-[75vh] border-black border-8 lg:cursor-pointer"
    //   onClick={handleCardClick}
    // >
    //   <motion.div
    //     className="relative h-full w-auto shadow-lg shadow-gray-700 rounded-lg overflow-y-hidden"
    //     animate={{ rotateY: focus !== uniqueId ? 0 : 180 }}
    //     initial={false}
    //     // transition={{ duration: 0.3, animationDirection: "normal" }}
    //     onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
    //     // onAnimationComplete={() => setIsAnimating(false)}
    //     ref={(el) => {
    //       galleryRefs.current[uniqueId] = el;
    //     }}
    //     style={{
    //       transform: `${focus !== uniqueId ? "rotateY(0deg)" : "rotateY(180deg)"}`,
    //       transition: "transform 0.6s",
    //       transformStyle: "preserve-3d",
    //     }}
    //     onLoad={handlePosition}
    //   >
    //     <div
    //       className="hidden z-30 lg:flex right-0 justify-center items-center  size-[1.4em]  rounded-[50px]  text-gray-500"
    //       style={{
    //         position: "absolute",
    //         transitionProperty: "transform",
    //         transitionDelay: ".6s",
    //         transitionTimingFunction: "ease-in-out",
    //         transform: `${iconPosition.transform}`,
    //         transformStyle: "preserve-3d",
    //       }}
    //       onClick={handleButtonClick}
    //     >
    //       <IconContext.Provider
    //         value={{
    //           className: "social-icon size-full p-3 bg-black",
    //         }}
    //       >
    //         <TfiNewWindow />
    //       </IconContext.Provider>
    //     </div>
    //     <motion.img
    //       className="relative lg:absolute z-20 w-full h-fit lg:w-auto sm:h-auto rounded-lg "
    //       //  sm:transition-opacity  sm:duration-200 sm:ease-in-out sm:group-hover:opacity-80"
    //       // object-cover lg:object-contain "
    //       src={urlFor(image.actualImage)?.url()}
    //       alt={image.title}
    //       onLoad={handleImageLoad} // Trigger height calculation on load
    //       style={{
    //         backfaceVisibility: "hidden",
    //         transform: "rotateY(0deg)",
    //       }}
    //     />

    //     <div
    //       style={{
    //         // transform: `${focus == uniqueId ? "rotateY(0deg)" : "rotateY(180deg)"}`,
    //         transform: "rotateY(180deg)",
    //         backfaceVisibility: "hidden",
    //       }}
    //       className="absolute bg-black z-20 hidden top-0 left-0 w-full h-full rounded-lg p-4 lg:flex flex-col justify-start items-center space-y-5 pt-6"
    //     >
    //       <h4 className="text-[.7em] lg:text-[.5em] font-bold">
    //         {image.title}
    //       </h4>
    //       <p className="text-[.5em] lg:text-[.4em]">{image.description}</p>
    //       <p className="absolute text-[.7em] lg:text-[.5em] bottom-4 right-4 italic">
    //         {image.location}
    //       </p>
    //     </div>
    //   </motion.div>
    // </div>
    <div
      style={{
        height: `${window.innerWidth > 1024 ? maxHeight.current[uniqueId] : imageHeight}vh`,
        perspective: "1000px",
        backgroundColor: focus == uniqueId ? "black" : "transparent",
        transitionProperty: "background-color",
        boxShadow: "inset 0em 1em black",
        transitionTimingFunction:
          focus == uniqueId ? "ease-out" : "cubic-bezier(0.6, 0, 0.2, 1)", // Smooth easing
        transitionDuration: focus == uniqueId ? "0.3s" : "1s", // Faster black, slower to transparent
        transitionDelay: focus == uniqueId ? "0s" : "0.6s",
      }}
      key={image._id}
      className="group relative w-full lg:max-h-[75vh] border-black border-8 lg:cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Card container with 3D flip */}
      <motion.div
        className="relative h-full w-full shadow-lg shadow-gray-700 rounded-lg"
        animate={{ rotateY: focus !== uniqueId ? 0 : 180 }} // Flip based on focus
        initial={false}
        key={image._id}
        id={image._id}
        style={{
          transformStyle: "preserve-3d", // Required for 3D flipping
          transition: "transform 0.6s", // Smooth transition
        }}
        ref={(el) => {
          galleryRefs.current[uniqueId] = el;
        }}
        onLoad={handlePosition}
      >
        <div
          className="hidden z-30 lg:flex right-0 justify-center items-center  size-[1.4em]  rounded-[50px]  text-gray-500"
          id={image._id}
          style={{
            position: "absolute",
            transitionProperty: "transform",
            transitionDelay: ".6s",
            transitionTimingFunction: "ease-in-out",
            transform: `${iconPosition.transform}`,
            transformStyle: "preserve-3d",
          }}
          onClick={handleButtonClick}
        >
          <IconContext.Provider
            value={{
              className: "social-icon size-full p-3 bg-black",
            }}
          >
            <TfiNewWindow />
          </IconContext.Provider>
        </div>
        {/* Front side of the card: Image */}
        <div
          className="relative overflow-y-clip w-full h-full rounded-lg"
          style={{
            background:
              cardCount < 6 ? "top left url('/FlipMe.svg')" : "inherit",
          }}
        >
          <motion.img
            className="absolute z-20 w-full h-auto rounded-lg"
            src={urlFor(image.actualImage)?.url()}
            alt={image.title}
            onLoad={handleImageLoad}
            style={{
              backfaceVisibility: "hidden", // Hide image when back is shown
            }}
          />
        </div>
        {/* Back side of the card: Information */}
        <div
          className="absolute top-0 left-0 w-full h-full overflow-y-hidden bg-black rounded-lg p-4 flex flex-col justify-start items-center space-y-5"
          style={{
            backfaceVisibility: "hidden", // Hide this when the front is shown
            transform: "rotateY(180deg)", // Flip back side to show when rotated
          }}
        >
          <h4 className="relative text-[.7em] font-bold text-white">
            {image.title}
          </h4>
          <p className="relative text-[.5em] max-h-[70%] overflow-y-hidden break-words overflow-ellipsis text-white">
            {image.description}
          </p>
          <p className="absolute text-[.7em] lg:text-[.5em] bottom-4 right-4 italic text-white">
            {image.location}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
