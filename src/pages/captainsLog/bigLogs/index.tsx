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
import EntryCard from "@/components/CaptainsLog/EntryCard";
import Header from "@/components/Header";

// type EntryCarouselProps = {
//   children: React.ReactElement<{ _id: string }>[];

// };
type Props = {
  socials: Social[];
  logBookEntries: LogbookEntry[];
};

const bigLogs = ({ socials, logBookEntries }: Props) => {
  const fakeRef = { current: [] };
  return (
    <main className="relative flex flex-col justify-start items-center bg-gradient-to-br from-teal-300 to-teal-600 text-black w-screen h-screen p-2 sm:p-4 lg:px-8  overflow-y-scroll  scrollbar-none overflow-x-clip">
      <Header socials={socials} setSelectedFilter={() => {}}></Header>
      <div className="sticky bg-inherit flex flex-row justify-center items-start w-screen h-auto z-20 top-5">
        <ArticleFilter logBookEntries={logBookEntries} />
      </div>
      <section className="relative flex w-full h-auto  max-w-[90vw] mx-auto sm:max-w-[80vw] sm:px-[1em] lg:text-[2em] lg:px-[20vh] lg:h-screen  lg:max-w-[1500px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {logBookEntries.map((lbEntry, index) => (
            <EntryCard
              logBookEntryRefs={fakeRef}
              key={lbEntry._id}
              uniqueId={index}
              logBookEntry={lbEntry}
              style={"h-[20em] text-[.5em]"}
            />
          ))}
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
