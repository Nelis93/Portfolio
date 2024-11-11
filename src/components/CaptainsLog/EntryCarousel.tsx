import React from "react";

export default function EntryCarousel({ children, selected }: any) {
  //   const count = React.Children.count(children);
  return (
    <div
      className="relative w-[23rem] h-[23rem]"
      style={{ perspective: "500px", transformStyle: "preserve-3d" }}
    >
      {/* {active > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 z-10 text-white text-5xl cursor-pointer"
          onClick={() => setActive((i) => i - 1)}
        >
          ←
        </button>
      )} */}

      {React.Children.map(children, (child, i) => (
        <div
          className={`absolute w-full h-full`}
          style={{
            transition: "all",
            transitionDuration: ".3s",
            transform: `
                    rotateY(${(selected - i) * 50}deg)
                    scaleY(${1 + Math.abs(selected - i) * -0.4})
                    translateZ(${Math.abs(selected - i) * -30}rem)
                    translateX(${Math.sign(selected - i) * -4}rem)
                  `,
            // zIndex: i <= selected ? i : -i + 2*selected,
            // opacity: Math.abs(selected - i) >= MAX_VISIBILITY ? 0 : 1,
            pointerEvents: selected === i ? "auto" : "none",
            filter: `blur(${Math.abs(selected - i)}rem)`,
          }}
        >
          {child}
        </div>
      ))}

      {/* {selected < count - 1 && (
        <button
          className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 z-10 text-white text-5xl cursor-pointer"
          onClick={() => setActive((i) => i + 1)}
        >
          →
        </button>
      )} */}
    </div>
  );
}
