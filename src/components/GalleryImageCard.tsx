import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GalleryImage } from "../../typings";
import { urlFor } from "../../sanity";
import { TfiNewWindow, TfiClose } from "react-icons/tfi";
import { IconContext } from "react-icons";

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
  const [selected, setSelected] = useState(-1);
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
  const handleStyleToggle = (mode: string) => {
    const toggle = (mode: string) => {
      if (mode == "on") {
        return {
          from: "lg:galleryImageCardReg",
          to: "lg:galleryImageCardFocus",
        };
      }
      return { from: "lg:galleryImageCardFocus", to: "lg:galleryImageCardReg" };
    };
    setStyleToggle((prevState) => ({
      card: prevState.card.replaceAll(toggle(mode).from, toggle(mode).to), // New class for card
      image: prevState.image.replaceAll(toggle(mode).from, toggle(mode).to), // New class for image
      text: prevState.text.replaceAll(toggle(mode).from, toggle(mode).to), // New class for text
    }));
  };
  const handleDeselect = () => {
    handleStyleToggle("off");
    setSelected(-1);
  };
  //the button should enlarge the photo to take up the whole screen. The info can be displayed on the side in a nice font
  const handleButtonClick = (event: any) => {
    console.log("Buttonclick: ", event.target.parentElement);
    event.stopPropagation();
    if (selected != uniqueId) {
      handleStyleToggle("on");
      setSelected(uniqueId);
      return;
    }
    handleDeselect();
  };
  const handleClickOutside = (event: any) => {
    // Check if the click is outside the motion.div (ref.current)
    if (ref.current != event.target.parentElement) {
      console.log("clicked outside");
      handleDeselect();
      return;
    }
    console.log("clicked inside");
  };

  useEffect(() => {
    // Attach the event listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //the button should return the user to the regular overview, the function should also be invoked when the user
  //clicks outside the range of the image
  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleCardClick = (event: any) => {
    console.log("cardclick:", selected != uniqueId, selected, uniqueId);
    uniqueId !== selected &&
      setFocus((current: any) => (current == uniqueId ? -1 : uniqueId));
    event.stopPropagation();
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
      }}
    >
      <IconContext.Provider
        value={{
          style: {
            position: "absolute",
            zIndex: "10",
            right: "0",
          },
          className: "social-icon absolute z-20 bg-black rounded-full",
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
      </div>
    </motion.div>
  );
}
