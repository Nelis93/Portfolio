import React, { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import { urlFor } from "../../sanity";
import { GalleryImage } from "../../typings";
import { fetchGalleryImages } from "../utils/fetchGalleryImages";
import dynamic from "next/dynamic";
import { motion, useAnimation } from "framer-motion";

type Props = {
  galleryImages: GalleryImage[];
};

const Gallery = ({ galleryImages }: Props) => {
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(
    galleryImages.slice(0, 10)
  ); // Initial images
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  const loadMoreImages = () => {
    setLoading(true);
    const nextImages = galleryImages.slice(page * 10, (page + 1) * 10); // Adjust the slice for pagination
    setDisplayedImages((prev) => [...prev, ...nextImages]);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadMoreImages();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <section className="gallery-small sm:gallery-small-flipped lg:gallery bg-black w-screen h-screen p-4 overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedImages.map((image) => (
          <motion.div
            key={image._id}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onViewportEnter={() => controls.start({ opacity: 1, y: 0 })}
          >
            <img
              src={urlFor(image).url()}
              alt={image.title}
              className="rounded-lg object-cover transition-opacity duration-200 ease-in-out group-hover:opacity-80"
            />
          </motion.div>
        ))}
      </div>
      {loading && <p className="text-white">Loading more images...</p>}
    </section>
  );
};

export default dynamic(() => Promise.resolve(Gallery), { ssr: false });

export const getStaticProps: GetStaticProps<Props> = async () => {
  const galleryImages: GalleryImage[] = await fetchGalleryImages();
  return {
    props: {
      galleryImages,
    },
    revalidate: 10,
  };
};
