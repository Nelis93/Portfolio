import React, { useEffect, useState, useRef } from "react";
import type { GetStaticProps } from "next";
import { GalleryImage, Social } from "../../typings";
import { fetchGalleryImages } from "../utils/fetchGalleryImages";
import dynamic from "next/dynamic";
import { useAnimation } from "framer-motion";
import GalleryImageCard from "@/components/GalleryImageCard";
import Header from "@/components/Header";
import { fetchSocials } from "../utils/fetchSocials";
import Slider from "@/components/Slider";

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
  
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useState(-1);

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
      {selected > -1 && <Slider items={galleryImages} refs={galleryRefs} currentIndex={selected} setCurrentIndex={setSelected} style={"absolute z-50 flex justify-between w-screen top-[40vh]"}/>}
      <Header socials={socials} />
      <section className="gallery-small sm:gallery-small-flipped lg:gallery">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-col-dense gap-4">
          {displayedImages.map((image, index) => (
            <GalleryImageCard
              key={image._id}
              uniqueId={index}
              images={galleryImages}
              image={image}
              controls={controls}
              galleryRefs={galleryRefs}
              selected={selected}
              setSelected={setSelected}
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
