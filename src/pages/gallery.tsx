import React, { useEffect, useState, useRef } from "react";
import type { GetStaticProps } from "next";
import { GalleryImage, Social } from "../../typings";
import { fetchGalleryImages } from "../utils/fetchGalleryImages";
import dynamic from "next/dynamic";
import GalleryImageCard from "@/components/Gallery/GalleryImageCard";
import GalleryImageCardSmall from "@/components/Gallery/GalleryImageCardSmall";
import Header from "@/components/Header";
import { fetchSocials } from "../utils/fetchSocials";
import Slider from "@/components/Slider";
import FocusedImageCard from "@/components/Gallery/FocusedImageCard";
import Dots from "@/components/Dots";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  galleryImages: GalleryImage[];
  socials: Social[];
};

const Gallery = ({ galleryImages, socials }: Props) => {
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>(
    galleryImages.slice(0, 9)
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement | null>(null);
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
  function debounce(cb: Function, delay = 1000) {
    let timeout: any;

    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  const startCalc = () => {
    setLoading(true);
  };
  const debounceMaxHeightCalculation = debounce(() => {
    setMaxHeight((prevMaxHeight: any) => {
      const newMaxArray = [];
      for (let i = 0; i < prevMaxHeight.current.length; i += 3) {
        const triplet = prevMaxHeight.current.slice(i, i + 3);
        const maxTripletHeight = Math.max(...triplet);
        newMaxArray.push(...Array(triplet.length).fill(maxTripletHeight));
      }
      return {
        current: newMaxArray,
        index: prevMaxHeight.current.length - 1,
      };
    });
    setLoading(false);
  }, 300);
  useEffect(() => {
    if (loading) debounceMaxHeightCalculation();
  }, [loading]);
  // Scroll to selected image when it's clicked
  useEffect(() => {
    if (selected > -1) {
      setDisplayedImages(filteredImages());
      galleryRefs.current[selected]?.scrollIntoView();
      return;
    }
    setPage(1);
    console.log(filteredImages().slice(0, 9));
    setDisplayedImages(filteredImages().slice(0, 9));
  }, [selected]);
  const extraCards = () => {
    if (displayedImages.length % 3 == 0) {
      return 0;
    } else if ((displayedImages.length + 1) % 3 == 0) {
      return 1;
    }
    return 2;
  };
  useEffect(() => {
    setDisplayedImages(filteredImages().slice(0, 9));
    debounceMaxHeightCalculation();
    setPage(1);
    extraCards();
  }, [selectedFilter]);
  const filteredImages = () => {
    return galleryImages
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
  const loadMoreImages = debounce((event: any) => {
    const distanceFromTop = event.target.clientHeight + event.target.scrollTop;
    extraCards();
    if (distanceFromTop > event.target.scrollHeight - 100) {
      console.log("bottom reached");
      if (loading) return;

      setLoading(true);

      const nextImages = filteredImages().slice(page * 9, (page + 1) * 9);

      if (nextImages.length > 0) {
        setDisplayedImages((prev) => [...prev, ...nextImages]);
        setPage((prev) => prev + 1);
      }
      setLoading(false);
      debounceMaxHeightCalculation();
    }
  }, 250);

  return (
    <main
      translate="no"
      className="relative flex flex-col justify-center items-center bg-black text-white w-screen h-screen p-2 sm:p-4 lg:p-8  overflow-y-scroll overflow-auto"
    >
      <Header
        socials={socials}
        setSelectedFilter={setSelectedFilter}
        style={
          "sticky text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 flex items-start justify-between z-30"
        }
      />
      <section
        className="relative flex w-full h-auto overflow-y-scroll lg:overscroll-none scrollbar-none pt-[5vh] sm:pt-0 lg:mt-15 max-w-[90vw] mx-auto sm:max-w-[80vw] sm:px-[1em] lg:text-[2em] lg:px-[20vh] lg:h-screen  lg:max-w-[1500px]"
        onScroll={loadMoreImages}
        onResize={debounceMaxHeightCalculation}
        style={{
          backgroundImage:
            displayedImages.length >= 6 && window.innerWidth > 1500
              ? " url('/FlipMe.svg')"
              : "",
          backgroundAttachment: "fixed",
          backgroundClip: "content-box",
          backgroundOrigin: "content-box",
        }}
      >
        <div
          className="relative z-[1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-0 w-full"
          ref={gridRef}
          onLoad={startCalc}
        >
          {displayedImages.map((image, index) =>
            window.innerWidth < 1024 ? (
              <GalleryImageCardSmall
                key={image._id}
                uniqueId={index}
                image={image}
                setSelected={setSelected}
              />
            ) : (
              <GalleryImageCard
                key={image._id}
                uniqueId={index}
                image={image}
                cardCount={displayedImages.length}
                setSelected={setSelected}
                focus={focus}
                setFocus={setFocus}
                maxHeight={maxHeight}
                setMaxHeight={setMaxHeight}
              />
            )
          )}
          {window.innerWidth > 1024 &&
            Array.from({ length: extraCards() }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: `${maxHeight.current.slice(-1)[0] || 0}vh`, // Access last height safely
                  width: "full",
                  backgroundColor: "black",
                  zIndex: 1,
                }}
              ></div>
            ))}
        </div>
        <Backdrop
          sx={(theme: any) => ({
            opacity: loading ? 1 : 0,
            color: "#fff",
            transition: "opacity",
            transitionTimingFunction: "ease-in-out",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
      </section>
      {selected > -1 && (
        <section className="fixed flex flex-col text-[5vh] z-30 sm:top-0 justify-center w-full sm:w-[70vw] lg:px-auto h-[85vh] sm:h-screen overflow-x-scroll snap-center scrollbar-none items-start sm:items-center">
          <Slider
            items={displayedImages}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              "fixed z-20 hidden sm:flex flex-row justify-between items-center h-full bg-opacity-50 bg-black w-screen"
            }
            scrolling
          />
          <Dots
            items={displayedImages}
            refs={galleryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              "fixed bottom-[.2em] self-center sm:bottom-[2vh] sm:top-auto justify-self-center z-40 sm:z-20 flex gap-5 p-2 rounded-lg bg-gray-500 bg-opacity-60"
            }
          />
          <div className="relative z-30 bg-black text-white w-max sm:mx-auto mb-2 sm:mb-0 max-h-full overflow-y-hidden sm:h-[80vh] flex flex-row space-x-11 overflow-x-scroll snap-x snap-center snap-mandatory scrollbar-none items-start justify-center sm:justify-start">
            {displayedImages.map((image, index) => (
              <FocusedImageCard
                key={image._id}
                uniqueId={index}
                image={image}
                galleryRefs={galleryRefs}
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
