import React from 'react'

type Props = {
    items: any;
    refs: any;
    currentIndex: any;
    setCurrentIndex: any;
    style: any
  };
  
export default function Dots({items, refs, currentIndex, setCurrentIndex, style}:Props) {
    const slide = (index: any) => {
        refs.current[index]?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      };
      const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        slide(index);
      };
  return (
    <div className={style}>
        {items.map((_: any, idx: number) => (
          <div
            key={idx}
            className={`size-[.8em] rounded-[50%] lg:hover:cursor-pointer ${
              currentIndex === idx ? "bg-yellow-500" : "bg-black"
            }`}
            onClick={() => window.innerWidth > 1000 && handleDotClick(idx)}
          ></div>
        ))}
      </div>
  )
}
