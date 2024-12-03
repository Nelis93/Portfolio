import React, { useRef } from "react";

export default function EntryCarousel({ children, selected }: any) {
  const carouselRef = useRef<HTMLElement | null>(null);
  const MAX_VISIBILITY = 3;
  // const [scrollPos, setScrollPos] = useState({
  //   a: 0,
  //   b: 0,
  // });

  // const setScrollPosition = (event: any) => {
  //   setScrollPos((current) => {
  //     return { a: event.target.scrollLeft, b: current.b };
  //   });
  // };
  return (
    <div
      // className="relative z-30 text-white w-2/3 max-w-[60em] sm:mx-auto mb-2 sm:mb-0 sm:h-[60vh] flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-none items-center justify-center sm:justify-start"
      // className="text-white     flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-none items-center justify-center sm:justify-start"
      style={{
        position: "relative",
        width: "23rem",
        height: "23rem",
        perspective: "500px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* <div className="relative min-w-[23rem] h-[23rem]"></div> */}
      {React.Children.map(children, (child, i) => {
        const offset = (selected - i) / 3;
        const absOffset = Math.abs(selected - i) / 3;
        const direction = Math.sign(selected - i);
        return (
          <div
            key={child._id}
            className="card-container min-w-[23rem] h-[23rem] shadow-lg shadow-black rounded-lg mx-auto"
            style={{
              position: "absolute",
              width: "100%",
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
      {/* <div className="min-w-[23rem] h-[23rem]"></div> */}
    </div>
  );
}
