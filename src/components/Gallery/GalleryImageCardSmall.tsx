import React from "react";
import { motion } from "framer-motion";
import { GalleryImage } from "typings";
import { urlFor } from "../../../sanity";

type Props = {
  image: GalleryImage;
  uniqueId: number;
  // galleryRefs: any;
  setSelected: any;
};

export default function GalleryImageCardSmall({
  image,
  uniqueId,
  // galleryRefs,
  setSelected,
}: Props) {
  //clicking on the photo should flip the card, showing the info like it's written on the back of it.
  const handleCardClick = (event: any) => {
    event.stopPropagation();
    setSelected(uniqueId);
  };

  return (
    <div
      key={image._id}
      className="group relative w-full h-full"
      onClick={handleCardClick}
      // ref={(el) => {
      //   galleryRefs.current[uniqueId] = el;
      // }}
    >
      {/* Front side of the card: Image */}
      <motion.img
        className="relative z-20 w-full h-auto rounded-lg"
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
      />
    </div>
  );
}
