import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  uniqueId: number;
  logBookEntryRefs: any;
  logBookEntry: any;
  style: string;
};
export default function EntryCard({
  uniqueId,
  logBookEntryRefs,
  logBookEntry,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const url = window.location.href;
  console.log(url);
  // Track if each entry is in view
  // const isInView = useInView(ref, {
  //   amount: 1,
  //   once: false,
  // });
  // // Update the currentIndex based on which entry is in view
  // useEffect(() => {
  //   if (isInView) {
  //     setSelected(uniqueId);
  //   }
  // }, [isInView]);
  return (
    <Link href={`${url}/${logBookEntry.slug.current}`} className={style || ""}>
      <motion.div
        className="relative flex flex-col text-justify items-center w-full h-full p-8 bg-gradient-to-b from-stone-600 to-slate-700 overflow-clip rounded-lg text-white"
        style={{
          transition: "all 0.3s ease-out",
        }}
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
