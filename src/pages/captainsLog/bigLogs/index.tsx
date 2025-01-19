// import { GetServerSideProps } from "next";
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Redirect to /products if the user lands on /products/new-products
//   return {
//     redirect: {
//       destination: "/captainsLog", // The target redirect URL
//       permanent: false, // Use false for temporary redirect (HTTP 302), true for permanent (HTTP 308)
//     },
//   };
// };

// // If you have a default export for this page, it can remain here, but it will not be rendered because of the redirect.
// export default function bigLogs() {
//   return null; // Optional: You can also display a placeholder if redirection somehow fails
// }
import ArticleFilter from "@/components/CaptainsLog/articleFilter";
import { LogbookEntry, Social } from "typings";
import React from "react";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";
import { fetchSocials } from "@/utils/fetchSocials";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";
// import EntryCard from "@/components/CaptainsLog/EntryCard";
import Header from "@/components/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "../../../../sanity";

// type EntryCarouselProps = {
//   children: React.ReactElement<{ _id: string }>[];

// };
type Props = {
  socials: Social[];
  logBookEntries: LogbookEntry[];
};

const bigLogs = ({ socials, logBookEntries }: Props) => {
  // const fakeRef = { current: [] };
  console.log(urlFor(logBookEntries[1].image).url());
  return (
    <main className="relative flex flex-col justify-start items-center bg-gradient-to-br from-teal-300 to-teal-600 text-black w-screen h-screen px-2 sm:px-4 lg:px-8 overflow-y-scroll  scrollbar-none overflow-x-clip">
      <Header
        socials={socials}
        setSelectedFilter={() => {}}
        style={
          "sticky bg-teal-500 rounded-b-md text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 pb-6 mb-2 flex items-start justify-between z-20"
        }
      ></Header>
      <div className="sticky bg-inherit flex flex-row justify-center  h-auto z-20 top-5">
        <ArticleFilter logBookEntries={logBookEntries} />
      </div>
      <section className="relative flex w-full h-auto  max-w-[90vw] mx-auto sm:max-w-[80vw] sm:px-[1em] lg:text-[2em] lg:px-[20vh] lg:h-screen  lg:max-w-[1500px]">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"> */}
        <div className="grid grid-cols-1 gap-6 p-6">
          {logBookEntries.map((lbEntry, index) => {
            return (
              <Link
                href={`/${lbEntry.slug.current}`}
                key={index}
                className="relative drop-shadow-lg border-l-slate-50 border-l-4 flex flex-row justify-start w-full h-60 p-6 bg-gradient-to-b from-stone-600 to-slate-700 hover:bg-stone-400 overflow-clip rounded-lg"
              >
                <div className="relative self-center flex-shrink-0 h-44 mr-6 w-44 ">
                  <img
                    src={urlFor(lbEntry.image)?.url()}
                    alt={lbEntry.title}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <motion.div
                  className="relative flex flex-col text-justify items-start  text-white"
                  style={{
                    transition: "all 0.3s ease-out",
                  }}
                >
                  <h2 className="relative block text-xl w-full font-bold text-center pb-4 text-white text-nowrap overflow-hidden overflow-ellipsis">
                    {lbEntry.title}
                  </h2>
                  <p className="relative line-clamp-[10] text-lg text-center">
                    {lbEntry.description}
                  </p>
                </motion.div>
              </Link>
              // <EntryCard
              //   logBookEntryRefs={fakeRef}
              //   key={lbEntry._id}
              //   uniqueId={index}
              //   logBookEntry={lbEntry}
              //   style={"h-[25em] text-[.5em]"}
              // />
            );
          })}
        </div>
      </section>
    </main>
  );
};
export default dynamic(() => Promise.resolve(bigLogs), { ssr: false });

export const getStaticProps: GetStaticProps<Props> = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries();
  const socials: Social[] = await fetchSocials();
  return {
    props: {
      logBookEntries,
      socials,
    },
    revalidate: 10,
  };
};
