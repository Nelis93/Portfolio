import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { LogbookEntry } from "../../../../typings";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";

type Props = {
  logBookEntries: LogbookEntry[];
};

export default function BigLog({ logBookEntries }: Props) {
  const router = useRouter();
  const logEntry = logBookEntries.find(
    (entry) => entry.slug.current == router.query.bigLog
  );
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Article Header */}
        <header className="bg-gradient-to-r from-teal-600 to-teal-300 text-white py-8 px-6">
          <h1 className="text-4xl font-bold mb-2">{logEntry?.title}</h1>
          <div className="flex items-center text-sm space-x-4">
            <span>
              <strong>Author:</strong>
            </span>
            <span>
              <strong>Date:</strong> {logEntry?.date}
            </span>
          </div>
        </header>

        {/* Article Summary */}
        <section className="p-6 border-b border-gray-200">
          <p className="text-lg text-gray-600 italic">
            {logEntry?.description}
          </p>
        </section>

        {/* Article Content */}
        <article className="p-6">
          <div className="prose max-w-none prose-purple">{logEntry?.entry}</div>
        </article>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries();

  // Create paths for each entry
  const paths = logBookEntries.map((entry) => ({
    params: { bigLog: entry.slug.current }, // Ensure `id` corresponds to the dynamic [bigLog] param
  }));

  return {
    paths,
    fallback: true, // Enable fallback for paths not generated at build time
  };
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries();

  return {
    props: {
      logBookEntries,
    },
    revalidate: 10,
  };
};
