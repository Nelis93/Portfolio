import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { LogbookEntry, Social } from "../../../../typings";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";
import { fetchSocials } from "@/utils/fetchSocials";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlFor } from "../../../../sanity";
import Header from "@/components/Header";

type Props = {
  socials: Social[];
  logBookEntries: LogbookEntry[];
};
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <img src={urlFor(value).url()} />,
  },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={"noindex nofollow"}
          className="text-blue-800 underline hover:text-teal-700"
        >
          {children}
        </a>
      );
    },
    break: ({ value, children }) => (
      <span>
        {children}
        <br />
        <br />
      </span>
    ),
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => <ul className="mt-xl">{children}</ul>,
    number: ({ children }) => <ol className="mt-lg">{children}</ol>,

    // Ex. 2: rendering custom lists
    checkmarks: ({ children }) => (
      <ol className="m-auto text-lg">{children}</ol>
    ),
  },
  listItem: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <li style={{ listStyleType: "disclosure-closed" }}>{children}</li>
    ),

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};
export default function BigLog({ logBookEntries, socials }: Props) {
  const router = useRouter();
  // Handle fallback loading state
  if (router.isFallback) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  // Find the specific log entry
  const logEntry = logBookEntries.find(
    (entry) => entry.slug.current == router.query.bigLog
  );

  // Handle case where logEntry is not found
  if (!logEntry) {
    return (
      <div className="h-screen flex justify-center items-center text-white">
        Entry not found.
      </div>
    );
  }
  return (
    <main className="h-screen max-w-screen bg-black overflow-y-scroll overflow-x-hidden scrollbar-none">
      <Header socials={socials} setSelectedFilter={""} />
      <div className="min-h-screen text-gray-800 p-6 sm:p-12">
        <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Article Header */}
          <header className="relative min-h-[8em] bg-gradient-to-r from-teal-600 to-teal-300 text-white py-8 px-6">
            <h1 className="text-4xl font-bold mb-2">{logEntry?.title}</h1>
            <div className="absolute bottom-0 py-2 text-sm space-x-4">
              {logEntry && new Date(logEntry.date).toDateString()}
            </div>
          </header>

          {/* Article Summary */}
          <section className="p-6 border-b border-gray-200">
            <p className="text-lg text-gray-600 italic">
              {logEntry?.description}
            </p>
          </section>

          {/* Article Content */}
          <section className="p-6">
            <div className="text-lg">
              <PortableText value={logEntry?.entry} components={components} />
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries();
  const socials: Social[] = await fetchSocials();
  // Create paths for each entry
  const paths = logBookEntries.map((entry) => ({
    params: { bigLog: entry.slug.current }, // Ensure `id` corresponds to the dynamic [bigLog] param
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

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
