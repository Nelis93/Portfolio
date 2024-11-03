import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import DropDownButton from "./DropDownButton";

type Props = {
  setSelectedFilter: any;
};
export default function DropDownFilter({ setSelectedFilter }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeftMenu, setIsLefMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  // Define the click handler outside of the effect
  const handleClickOutside = (event: MouseEvent) => {
    // If the clicked target is outside the dropdown, close it
    console.log(dropdownRef.current);
    event.stopPropagation();
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      console.log("dropdown disengaged");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add event listener to detect clicks outside the dropdown
      document.addEventListener("click", handleClickOutside);
    } else {
      // Remove event listener when dropdown is closed
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup function to remove the event listener on unmount or state change
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const selectListItem = (event: any) => {
    console.log(
      "event.target.parentElement.previousSibling: ",
      event.target.parentElement.previousSibling
    );
    const selector =
      event.target.parentElement.previousSibling.innerText.includes("COUNTRY")
        ? "dates"
        : "countries";
    const nonSelector = selector === "dates" ? "countries" : "dates";
    setSelectedFilter((current: any) => {
      if (!current?.[selector].includes(event.target.innerText.toString())) {
        event.target.classList.add("bg-white", "text-black");
        return {
          [selector]: [
            ...current?.[selector],
            event.target.innerText.toString(),
          ],
          [nonSelector]: current?.[nonSelector],
        };
      }

      event.target.classList.remove("bg-white", "text-black");
      return {
        [selector]: current?.[selector].filter(
          (item: Text) => item !== event.target.innerText.toString()
        ),
        [nonSelector]: current?.[nonSelector],
      };
    });
  };

  const leftMenu = () => {
    let tempArray = [];
    for (let i = 2018; i <= 2024; i++) {
      tempArray.push(i.toString());
    }
    return tempArray;
  };

  const rightMenu = [
    "India",
    "Myanmar",
    "Thailand",
    "Vietnam",
    "New Zealand",
    "Australia",
    "Scandinavia",
    "Belgium",
  ];
  const toggleMenu = () => {
    setIsLefMenu((current) => !current);
  };

  // const slideVerticalAnimation = {
  //   open: {
  //     // rotateX: 0,
  //     y: "-1em",
  //     x: "-5em",
  //     display: "block",

  //     animation: {
  //       duration: 0.3,
  //       mass: 0.8,
  //       type: "spring",
  //     },
  //   },
  //   close: {
  //     // rotateX: -15,
  //     x: "-5em",
  //     y: -320,

  //     transition: {
  //       duration: 0.3,
  //     },
  //     transitionEnd: {
  //       display: "none",
  //     },
  //   },
  // };

  // const slideHorizontalAnimation = {
  //   left: {
  //     x: "-5em",
  //     transition: {
  //       duration: 0.3,
  //     },
  //   },
  //   right: {
  //     x: 0,
  //     transition: {
  //       duration: 0.3,
  //     },
  //   },
  // };
  return (
    <div className="relative z-50 w-auto" ref={dropdownRef}>
      <DropDownButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className="block rounded-md shadow-md left-[-5.5em] overflow-x-hidden absolute h-auto sm:max-h-[80vh] lg:max-h-none w-[5em] z-40 overflow-y-scroll scrollbar-none border-2 border-white bg-black"
        // initial="close"
        style={{
          transform: isOpen ? "translateY(-1em)" : "translateY(-10em)",
          opacity: isOpen ? "1" : "0",
          transition: "transform, opacity",
          transitionDuration: ".5s, 1s",
          transitionTimingFunction: "ease-in-out",
        }}
        // animate={isOpen ? "open" : "close"}
        // variants={slideVerticalAnimation}
      >
        <div
          className="flex items-start h-full relative w-[10em]"
          style={{
            transform: isLeftMenu ? "translateX(-5em)" : "translateX(0)",
            transitionProperty: "transform",
            transitionDuration: ".3s",
            transitionTimingFunction: "ease-in-out",
          }}
          // initial="left"
          // animate={isLeftMenu ? "left" : "right"}
          // variants={slideHorizontalAnimation}
        >
          <div className="flex flex-col text-[.7em] h-full relative w-[50%] ">
            <h4
              onClick={toggleMenu}
              className="cursor-pointer m-0 py-[.5em] text-center hover:text-black hover:bg-white"
              style={{
                transition: "color, background-color",
                transitionDuration: ".2s",
              }}
            >
              COUNTRY &#8594;
            </h4>
            <ul className="item-list list-none flex flex-1 flex-col justify-around">
              {leftMenu().map((text, i) => (
                <li
                  key={i}
                  className="item flex-1 text-center cursor-pointer hover:bg-white hover:text-black"
                  style={{
                    transition: "color, background-color",
                    transitionDuration: ".2s",
                  }}
                  onClick={selectListItem}
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col text-[.7em] h-full relative w-[50%] ">
            <h4
              onClick={toggleMenu}
              className="fill-white cursor-pointer m-0 py-[.5em] text-center hover:text-black hover:bg-white"
              style={{
                transition: "color, background-color",
                transitionDuration: ".2s",
              }}
            >
              &#8592; YEAR
            </h4>
            <ul className="item-list list-none flex flex-1 flex-col justify-around">
              {rightMenu.map((text, i) => (
                <li
                  key={i}
                  className="item flex-1 text-center cursor-pointer hover:bg-white hover:text-black"
                  style={{
                    transition: "color, background-color",
                    transitionDuration: ".2s",
                  }}
                  onClick={selectListItem}
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
