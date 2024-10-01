import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GalleryImage } from "../../typings";
import { urlFor } from "../../sanity";
import { TfiNewWindow, TfiClose } from "react-icons/tfi";
import { IconContext } from "react-icons";
import Dots from "./Dots";

type Props = {
  image: GalleryImage;
  uniqueId: number;
  controls: any;
  galleryRefs: any;
  images: any
  selected: any;
  setSelected: any;
};

export default function GalleryImageCard({
  images,
  image,
  uniqueId,
  controls,
  galleryRefs,
  selected,
  setSelected
}: Props) {
  // Create a ref for each project
  
  const [focus, setFocus] = useState(-1);
  const ref = useRef<HTMLElement | null>(null);
  // Track if each project is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  });
  
  const [styleToggle, setStyleToggle] = useState({
    card: "group galleryImageCardReg-small sm:galleryImageCardReg-small-flipped lg:galleryImageCardReg",
    image:
      "galleryImageCardReg-small-Img sm:galleryImageCardReg-small-flipped-Img lg:galleryImageCardReg-Img",
    text: "galleryImageCardReg-small-FlipSide sm:galleryImageCardReg-small-flipped-FlipSide lg:galleryImageCardReg-FlipSide",
  });
  // Update the currentIndex based on which project is in view
  // useEffect(() => {
  //   if (isInView) {
  //     console.log(uniqueId, " is in view");
  //     setCurrentIndex(uniqueId);
  //   }
  // }, [isInView, uniqueId]);
  useEffect(()=>{
    handleStyleToggle(selected === uniqueId)
  },[selected])
  const handleStyleToggle = (mode: boolean) => {
    const cardToggle = (mode: boolean) => {
      if (mode) {
        return {
          from: "lg:galleryImageCardReg",
          to: "lg:galleryImageCardFocus",
        };
      }
      return { from: "lg:galleryImageCardFocus", to: "lg:galleryImageCardReg" };
    };
  
    const imageToggle = (mode: boolean) => {
      if (mode) {
        return {
          from: "lg:galleryImageCardReg-Img",
          to: "lg:galleryImageCardFocus-Img",
        };
      }
      return { from: "lg:galleryImageCardFocus-Img", to: "lg:galleryImageCardReg-Img" };
    };
  
    const textToggle = (mode: boolean) => {
      if (mode) {
        return {
          from: "lg:galleryImageCardReg-FlipSide",
          to: "lg:galleryImageCardFocus-FlipSide",
        };
      }
      return { from: "lg:galleryImageCardFocus-FlipSide", to: "lg:galleryImageCardReg-FlipSide" };
    };
  
    setStyleToggle((prevState) => ({
      card: prevState.card.replaceAll(cardToggle(mode).from, cardToggle(mode).to), // New class for card
      image: prevState.image.replaceAll(imageToggle(mode).from, imageToggle(mode).to), // New class for image
      text: prevState.text.replaceAll(textToggle(mode).from, textToggle(mode).to), // New class for text
    }));
  };
  
  const handleDeselect = () => {
    setSelected(-1);
  };
  //the button should enlarge the photo to take up the whole screen. The info can be displayed on the side in a nice font
  const handleButtonClick = (event: any) => {
    console.log("Buttonclick: ", event.target.parentElement.lastChild.classList);
    event.stopPropagation();
    if (selected != uniqueId) {
      console.log('selected is not uniqueId');
      setSelected(uniqueId);
      return;
    }
    console.log('selected IS uniqueId');
    handleDeselect();
  };
  // const handleClickOutside = (event: any) => {
  //   // Check if the click is outside the motion.div (ref.current)
  //   event.stopPropagation();
  //   if (ref.current != event.target.parentElement && !ref.current?.contains(event.target)) {
  //     console.log("clicked outside");
  //     handleDeselect();
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
  //the button should return the user to the regular overview, the function should also be invoked when the user
  //clicks outside the range of the image
  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleCardClick = (event: any) => {
    event.stopPropagation();
    console.log("cardclick:", selected != uniqueId, selected, uniqueId);
    uniqueId !== selected &&
      setFocus((current: any) => (current == uniqueId ? -1 : uniqueId));
  };
  return (
    <motion.div
      className={styleToggle.card}
      key={image._id}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
      onClick={handleCardClick}
      ref={(el) => {
        ref.current = el;
        galleryRefs.current[uniqueId] = el;
      }}
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
        {selected == uniqueId ? <TfiClose /> : <TfiNewWindow />}
      </IconContext.Provider>
      <motion.img
        className={`${focus == uniqueId && selected != uniqueId ? "hidden" : styleToggle.image}`}
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
        />
      <div
        className={`${focus != uniqueId && selected != uniqueId ? "hidden" : styleToggle.text}`}
      >
        <h4 className="text-[.7em] font-bold">{image.title}</h4>

        {/* insert button to enlarge */}
        <p className="text-[.5em]">{image.description}</p>
        <p className="text-[.5em] italic self-end">{image.location}</p>
      <Dots items={images} refs={galleryRefs} currentIndex={selected} setCurrentIndex={setSelected} style={`${selected == uniqueId ? "absolute bottom-0 self-center border-red-500 border-4 z-40 flex justify-center gap-5" : "hidden"}`} />      
      </div>
    </motion.div>
  );
}
