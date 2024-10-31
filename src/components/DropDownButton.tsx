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
        opacity="1"
        {...props}
      />
    );
  };
  const clicked = (event: any) => {
    console.log(event.target)
    setIsOpen((current: boolean) => !current);
    return
  };
  return (
    <motion.button
      className="flex flex-row justify-center items-center bg-gray-500 hover:bg-white rounded-[50%] cursor:pointer h-full w-full"
      onClick={clicked}
      animate={isOpen ? "open" : "closed"}
      style={{
        transition: "all",
        transitionDuration: ".3s",
      }}
    >
      <svg
        width="50"
        height="50"
        style={{  color: "gray", borderRadius: '50px', padding: '4px' }}
        viewBox="-5 -5 30 30"
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
