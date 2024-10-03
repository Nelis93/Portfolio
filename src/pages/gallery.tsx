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
import FocusedImageCard from "@/components/FocusedImageCard";
import Dots from '@/components/Dots';

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useState(-1);
  const [focus, setFocus] = useState(-1);

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
  useEffect(()=>{
    console.log(selected)
  },[selected])
  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-4 overflow-auto"
    >
      <Header socials={socials} />
      <section className="relative flex gallery-small sm:gallery-small-flipped lg:gallery">
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
            focus={focus}
            setFocus={setFocus}
            />
          ))}
        </div>
        {loading && <p className="text-white">Loading more images...</p>}
      </section>
      {selected > -1 && 
      <section className="fixed flex flex-col text-[5vh] z-10 top-0 justify-center w-[70vw] max-w-[1800px] h-screen  overflow-x-hidden scrollbar-none items-center bg-white">
        <Slider items={galleryImages} refs={galleryRefs} currentIndex={selected} setCurrentIndex={setSelected} style={"fixed z-20 flex justify-between w-screen max-w-[2000px] top-[40vh]"}/>
        <Dots items={galleryImages} refs={galleryRefs} currentIndex={selected} setCurrentIndex={setSelected} style={"fixed bottom-[2vh] justify-self-center z-20 flex gap-5"} />      
        <div className="relative w-max mx-auto h-[80vh] overflow-x-scroll scrollbar-none  flex flex-row  snap-x  snap-mandatory items-start justify-start"
          ref={containerRef}>
            {displayedImages.map((image, index) => (
              <FocusedImageCard
              key={image._id}
              uniqueId={index}
              images={galleryImages}
              image={image}
              galleryRefs={galleryRefs}
              selected={selected}
              setSelected={setSelected}
              />
            ))}
        </div>
      </section>
}
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
