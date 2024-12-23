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
import { LogbookEntry } from "typings";
import React from "react";
import logbookEntry from "@/schemas/logbookEntry";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";
import dynamic from "next/dynamic";
import { GetStaticProps } from "next";

// type EntryCarouselProps = {
//   children: React.ReactElement<{ _id: string }>[];

// };
type Props = {
  logBookEntries: LogbookEntry[];
};
const bigLogs = ({ logBookEntries }: Props) => {
  return (
    <div className="relative flex flex-col justify-start items-center bg-gradient-to-br from-teal-300 to-teal-600 text-black w-screen h-screen overflow-y-scroll scrollbar-none overflow-x-clip">
      <div className="w-full h-full">
        <ArticleFilter logBookEntries={logBookEntries} />
      </div>
    </div>
  );
};
export default dynamic(() => Promise.resolve(bigLogs), { ssr: false });

export const getStaticProps: GetStaticProps<Props> = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries();
  return {
    props: {
      logBookEntries,
    },
    revalidate: 10,
  };
};
