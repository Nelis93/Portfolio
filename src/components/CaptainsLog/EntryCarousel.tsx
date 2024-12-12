import React, { useRef, useState, useEffect, useCallback } from "react";

type EntryCarouselProps = {
  children: React.ReactElement<{ _id: string }>[];
  selected: number;
  setSelected: any; // Callback to update the selected card
  debounce: any;
};

export default function EntryCarousel({
  children,
  selected,
  setSelected,
  debounce,
}: EntryCarouselProps) {
  const [scrollPos, setScrollPos] = useState({ a: 0, b: 0 });
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const MAX_VISIBILITY = 3;
  const setScrollPosition = (event: any) => {
    setScrollPos((current) => {
      if (Math.sign(event) > 0) {
        console.log("pos");
        return { a: event, b: 1 };
      }
      console.log("neg");
      return { a: event, b: -1 };
    });
  };
  // const handleScroll = useCallback(
  //   debounce(() => {
  //     if (!carouselRef.current) return;
  //     console.log(
  //       "carouselRef.current!.scrollLeft: ",
  //       carouselRef.current.scrollLeft
  //     );

  //     // setScrollPos((curr) => {
  //     //   if(curr > carouselRef.current.scrollLeft){
  //     //     return
  //     //   }
  //     // })
  //     // const cards = Array.from(carouselRef.current.children) as HTMLElement[];
  //     // let minDiff = Infinity;
  //     // let closestIndex = 0;

  //     // cards.forEach((card, index) => {
  //     //   const cardCenter =
  //     //     card.offsetLeft +
  //     //     card.offsetWidth / 2 -
  //     //     carouselRef.current!.scrollLeft;
  //     //   const containerCenter = carouselRef.current!.offsetWidth / 2;
  //     //   const diff = Math.abs(cardCenter - containerCenter);
  //     //   console.log(index, " : cardCenter: ", cardCenter);
  //     //   console.log(index, " : diff: ", diff);
  //     //   if (diff < minDiff) {
  //     //     minDiff = diff;
  //     //     closestIndex = index;
  //     //   }
  //     // });

  //     // if (closestIndex !== selected) {
  //     //   setSelected(closestIndex);
  //     // }
  //   }, 100),
  //   [selected, setSelected]
  // );
  const handleWheel = debounce((event: any) => {
    setScrollPosition(event.deltaY);
    console.log(event.deltaY);
  }, 100);
  useEffect(() => {
    console.log("selected: ", selected);
    console.log("#children: ", children.length);
    if (scrollPos.b === 1 && selected < children.length - 1) {
      console.log("useEffect: pos ", scrollPos.b);
      setSelected((current: any) => current + 1);
      return;
    } else if (scrollPos.b === -1 && selected > 0) {
      setSelected((current: any) => current - 1);
      console.log("useEffect: neg ", scrollPos.b);
    } else {
      setSelected(0);
    }
  }, [scrollPos]);
  // 2;

  return (
    <div
      className="relative z-30 text-white w-2/3 max-w-[60em] sm:mx-auto mb-2 sm:mb-0 sm:h-[60vh] flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-none items-center justify-center"
      ref={carouselRef}
      // onScroll={handleScroll}
      onWheel={handleWheel}
      // className="text-white     flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-none items-center justify-center sm:justify-start"
      style={{
        position: "relative",
        perspective: "500px",
        transformStyle: "preserve-3d",
      }}
    >
      {React.Children.map(children, (child, i) => {
        if (!child || !React.isValidElement(child)) return null;
        const offset = (selected - i) / 3;
        const absOffset = Math.abs(selected - i) / 3;
        const direction = Math.sign(selected - i);
        return (
          <div
            key={child.props._id}
            className="w-[23rem] shadow-lg shadow-black rounded-lg mx-auto"
            style={{
              position: "absolute",
              // width: "100%",
              height: "100%",
              filter: `blur(${Math.abs((selected - i) / 3)}rem)`,
              transform: `
                rotateY(${offset * 50}deg)
                scaleY(${1 + absOffset * -0.4})
                translateZ(${absOffset * -30}rem)
                translateX(${direction * -5}rem)
              `,
              transition: "all 0.3s ease-out",
              pointerEvents: selected === i ? "auto" : "none",
              opacity: Math.abs(selected - i) >= MAX_VISIBILITY ? 0 : 1,
              display: "block",
              zIndex: Math.abs(selected - i) * -1,
              scrollSnapAlign: "center",
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
