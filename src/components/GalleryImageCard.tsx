import React from "react";
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
  images: any
  selected: any;
  setSelected: any;
  focus: any;
  setFocus: any
};

export default function GalleryImageCard({
  images,
  image,
  uniqueId,
  controls,
  galleryRefs,
  selected,
  setSelected,
  focus,
  setFocus
}: Props) {
  

  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleCardClick = (event: any) => {
    event.stopPropagation();
    // console.log("cardclick:", focus != uniqueId, focus, uniqueId);
      setFocus((current: any) => (current == uniqueId ? -1 : uniqueId));
  };
  const handleButtonClick = (event: any) => {
    event.stopPropagation();
    setSelected(uniqueId)
  }
  return (
    <motion.div
      // className={styleToggle.card}
      className="group galleryImageCardReg-small sm:galleryImageCardReg-small-flipped lg:galleryImageCardReg"
      key={image._id}
      animate={{rotateY: focus != uniqueId ? 360 : 0}}
      whileInView={{ opacity: 1, y: 0 }}
      
      initial={{ rotateY: 0 }}
  transition={{ duration: 0.8, ease: [1, 1, 1, 1] }}
      onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
      onClick={handleCardClick}
      ref={(el) => {
        // ref.current = el;
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
            onClick: handleButtonClick
          },
        }}
      >
        <TfiNewWindow />
      </IconContext.Provider>
      {focus !== uniqueId &&
      <motion.img
        // className={styleToggle.image}
        className="galleryImageCardReg-small-Img sm:galleryImageCardReg-small-flipped-Img lg:galleryImageCardReg-Img"
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
        />
      }
      {focus === uniqueId &&
      <div
        // className={styleToggle.text}
        className="galleryImageCardReg-small-FlipSide sm:galleryImageCardReg-small-flipped-FlipSide lg:galleryImageCardReg-FlipSide"
      >
        <h4 className="text-[.7em] font-bold">{image.title}</h4>

        {/* insert button to enlarge */}
        <p className="text-[.5em]">{image.description}</p>
        <p className="text-[.5em] italic self-end">{image.location}</p>
      </div>
}
    </motion.div>
  );
}
