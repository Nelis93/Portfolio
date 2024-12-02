import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

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

  // Track if each entry is in view
  const isInView = useInView(ref, {
    amount: 1,
    once: false,
  });
  // Update the currentIndex based on which entry is in view
  useEffect(() => {
    if (isInView) {
      setSelected(uniqueId);
    }
  }, [isInView]);
  return (
    <Link href={`captainsLog/bigLogs/${logBookEntry.slug.current}`}>
      <motion.div
        className="relative flex flex-col items-center w-full h-full p-8 bg-gradient-to-b from-stone-600 to-yellow-950 overflow-clip rounded-lg text-white"
        ref={(el) => {
          ref.current = el;
          logBookEntryRefs.current[uniqueId] = el;
        }}
      >
        <h2 className="relative block text-2xl w-full font-bold text-center mb-4 text-white text-nowrap overflow-hidden overflow-ellipsis">
          {logBookEntry.title}
        </h2>
        <p className="relative line-clamp-[10] text-justify">
          {logBookEntry.description}
        </p>
      </motion.div>
    </Link>
  );
}
