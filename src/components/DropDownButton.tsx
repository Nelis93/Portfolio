import React from "react";
import { motion } from "framer-motion";

type Props = {
  isOpen: any;
  setIsOpen: any;
};
export default function DropDownButton({ isOpen, setIsOpen }: Props) {
  const Path = (props: any) => {
    return (
      <motion.path
        fill="black"
        strokeWidth="3"
        stroke="black"
        strokeLinecap="round"
        {...props}
      />
    );
  };
  const clicked = () => {
    setIsOpen((current: boolean) => !current);
  };
  return (
    <motion.button
      className="items-center bg-gray-500 hover:bg-white p-2 rounded-[50%] cursor:pointer flex flex-row h-auto justify-center w-auto"
      onClick={clicked}
      animate={isOpen ? "open" : "closed"}
      initial={false}
      style={{
        transition: "all",
        transitionDuration: ".3s",
      }}
    >
      <svg
        width="23"
        height="23"
        style={{ margin: "4px 0 0 2px", color: "gray" }}
        viewBox="0 0 23 23"
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </motion.button>
  );
}
