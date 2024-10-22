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
import Dots from "@/components/Dots";

type Props = {
  galleryImages: GalleryImage[];
  socials: Social[];
};

const Gallery = ({ galleryImages, socials }: Props) => {
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(
    galleryImages.slice(0, 10)
  ); // Initial images
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // Only to prevent repeated calls
  const [cardCount, setCardCount] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useState(-1);
  const [focus, setFocus] = useState(-1);
  const [maxHeight, setMaxHeight] = useState<{
    current: number[];
    index: number;
  }>({ current: [], index: 0 });
  const [selectedFilter, setSelectedFilter] = useState<{
    countries: string[];
    dates: string[];
  }>({
    countries: [],
    dates: [],
  });

  // Scroll to selected image when it's clicked
  useEffect(() => {
    selected > -1 && galleryRefs.current[selected]?.scrollIntoView();
  }, [selected]);

  useEffect(() => {
    setCardCount(filteredImages().length);
    // console.log(filteredImages().length);
  }, [selectedFilter, displayedImages]);
  const filteredImages = () => {
    return displayedImages
      .filter((image) => {
        const countries = selectedFilter?.countries;
        let index = image.location.split(" ");
        return countries.length > 0
          ? countries.includes(index[index.length - 1])
          : image;
      })
      .filter((image) => {
        const dates = selectedFilter?.dates;
        return dates.length > 0
          ? dates.includes(image?.dateTaken.toString().split("-")[0])
          : image;
      });
  };
  // Function to load more images
  const loadMoreImages = (event: any) => {
    if (
      window.innerHeight + window.scrollY >=
      event.target.offsetHeight - 500
    ) {
      if (loading) return; // Prevent triggering if already loading

      setLoading(true);

      // Calculate the next batch of images
      const nextImages = galleryImages.slice(page * 10, (page + 1) * 10);

      if (nextImages.length > 0) {
        setDisplayedImages((prev) => [...prev, ...nextImages]);
        setPage((prev) => prev + 1);
      }

      setLoading(false);
    }
    return;
  };
  console.log(galleryRefs.current.length);
  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-2 sm:p-4 lg:p-8 overflow-y-scroll overflow-auto"
    >
      <Header socials={socials} setSelectedFilter={setSelectedFilter} />
      <section
        className="relative flex bg-transparent h-auto overflow-y-scroll overscroll-none scrollbar-none pt-[5vh] sm:pt-0 max-w-[90vw] mx-auto sm:max-w-[80vw] sm:px-[1em] lg:text-[5vh] lg:px-[20vh] lg:h-screen lg:w-full lg:max-w-[1500px]"
        onScroll={loadMoreImages}
      >
        <div className="relative z-[1] bg-transparent grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:w-full">
          {cardCount >= 6 && (
            <div
              className="hidden lg:block fixed overflow-hidden z-0  h-[80%]"
              style={{
                background: "top left url('/FlipMe.svg')",
                width: `calc(100% - 52vh)`,
                maxWidth: `calc(1500px - 40vh)`,
                margin: "0 auto",
              }}
            ></div>
          )}
          {filteredImages().map((image, index) => (
            <GalleryImageCard
              key={image._id}
              uniqueId={index}
              image={image}
              cardCount={cardCount}
              galleryRefs={galleryRefs}
              setSelected={setSelected}
              focus={focus}
              setFocus={setFocus}
              maxHeight={maxHeight}
              setMaxHeight={setMaxHeight}
            />
          ))}
        </div>
        {loading && <p className="text-white">Loading more images...</p>}
      </section>
      {selected > -1 && (
        <section className="fixed flex flex-col text-[5vh] z-30 top-0 justify-center w-full sm:w-[70vw] lg:px-auto h-screen overflow-x-scroll  scrollbar-none items-start sm:items-center">
          <Slider
            items={galleryImages}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              "fixed z-20 hidden sm:flex flex-row justify-between items-center h-full bg-opacity-50 bg-black w-screen"
            }
          />
          <Dots
            items={galleryImages}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              "fixed bottom-[.2em] self-center sm:bottom-[2vh] sm:top-auto justify-self-center z-40 sm:z-20 flex gap-5 p-2 rounded-lg bg-gray-500 bg-opacity-60"
            }
          />
          <div
            className="relative z-30 bg-black text-white w-max sm:mx-auto mb-2 sm:mb-0 sm:h-[80vh] flex flex-row space-x-11 overflow-x-scroll snap-x snap-center snap-mandatory scrollbar-none items-start justify-center sm:justify-start"
            ref={containerRef}
          >
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
      )}
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
