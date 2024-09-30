import React, { useEffect, useState, useRef } from "react";
import type { GetStaticProps } from "next";
import { GalleryImage, Social } from "../../typings";
import { fetchGalleryImages } from "../utils/fetchGalleryImages";
import dynamic from "next/dynamic";
import { useAnimation } from "framer-motion";
import GalleryImageCard from "@/components/GalleryImageCard";
import Header from "@/components/Header";
import { fetchSocials } from "../utils/fetchSocials";

type Props = {
  galleryImages: GalleryImage[];
  socials: Social[];
};

const Gallery = ({ galleryImages, socials }: Props) => {
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(
    galleryImages.slice(0, 10)
  ); // Initial images
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const controls = useAnimation();
  const [focus, setFocus] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <main
      translate="no"
      className="bg-black text-white w-screen h-screen p-4 overflow-auto"
    >
      <Header socials={socials} />
      <section className="gallery-small sm:gallery-small-flipped lg:gallery">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-col-dense gap-4">
          {displayedImages.map((image, index) => (
            <GalleryImageCard
              galleryLength={galleryImages.length - 1}
              key={image._id}
              uniqueId={index}
              image={image}
              focus={focus}
              setFocus={setFocus}
              setCurrentIndex={setCurrentIndex}
              controls={controls}
              galleryRefs={galleryRefs}
            />
          ))}
        </div>
        {loading && <p className="text-white">Loading more images...</p>}
      </section>
    </main>
  );
};

export default dynamic(() => Promise.resolve(Gallery), { ssr: false });

export const getStaticProps: GetStaticProps<Props> = async () => {
  const galleryImages: GalleryImage[] = await fetchGalleryImages();
  const socials: Social[] = await fetchSocials();
  return {
    props: {
      galleryImages,
      socials,
    },
    revalidate: 10,
  };
};
