import React, { useRef } from "react";

export default function EntryCarousel({ children, selected }: any) {
  const carouselRef = useRef<HTMLElement | null>(null);
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
      className="relative z-30 bg-black text-white w-2/3 sm:mx-auto mb-2 sm:mb-0 sm:h-[80vh] flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-none items-center justify-center sm:justify-start"
      style={{ perspective: "500px", transformStyle: "preserve-3d" }}
    >
      <div className="relative min-w-[23rem] h-[23rem]"></div>
      {React.Children.map(children, (child, i) => (
        <div
          key={child._id}
          className="min-w-[23rem] h-[23rem]  mx-auto"
          style={{
            transform: `
              scaleY(${1 + Math.abs(selected - i) * -0.2})
              rotateY(${(selected - i) * 50}deg)
              translateZ(${Math.abs(selected - i) * -1}em)
              translateX(${(selected - i) * 5}em)
              `,
            // filter: `blur(${Math.abs(selected - i)}rem)`,
            zIndex: Math.abs(selected - i) * -1,
            scrollSnapAlign: "center",
            transition: "all 0.3s ease-out",
            pointerEvents: selected === i ? "auto" : "none",
            display: "block",
          }}
        >
          {child}
        </div>
      ))}
      <div className="min-w-[23rem] h-[23rem]"></div>
    </div>
  );
}
