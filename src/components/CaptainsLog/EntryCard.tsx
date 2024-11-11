import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  uniqueId: number;
  setSelected: any;
  logBookEntryRefs: any;
  logBookEntry: any;
};
export default function EntryCard({
  uniqueId,
  setSelected,
  logBookEntryRefs,
  logBookEntry,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  //   // Track if each entry is in view
  //   const isInView = useInView(ref, {
  //     amount: 0.5,
  //     once: false,
  //   });
  //   // Update the currentIndex based on which entry is in view
  //   useEffect(() => {
  //     if (isInView) {
  //       setSelected(uniqueId);
  //     }
  //   }, [isInView, uniqueId]);
  return (
    <motion.div
      className="w-full h-full p-8 bg-teal-400 overflow-clip rounded-lg text-white shadow-lg"
      ref={(el) => {
        ref.current = el;
        logBookEntryRefs.current[uniqueId] = el;
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-white">
        {logBookEntry.title}
      </h2>
      <p className="text-justify">{logBookEntry.description}</p>
    </motion.div>
  );
}
