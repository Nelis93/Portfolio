import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { LogbookEntry } from "../../../../typings";
import { fetchLogbookEntries } from "@/utils/fetchLogbookEntries";
import { PortableText, PortableTextComponents } from "@portabletext/react";

type Props = {
  logBookEntries: LogbookEntry[];
};
const components: PortableTextComponents = {
  types: {
    code: (props) => {
      const { code } = props.value;
      console.log(props.value);
      return <div>{code}</div>;
    },
    image: ({ value }) => <img src={value.imageUrl} />,
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
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
        <a href={value?.href} target={target}>
          {children}
        </a>
      );
    },
  },
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="text-2xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg">{children}</h3>,
    h4: () => <br />,
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),

    // Ex. 2: rendering custom styles
    customHeading: ({ children }) => (
      <h2 className="text-lg text-primary text-purple-700">{children}</h2>
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
      <li style={{ listStyleType: "disclosure-closed" }}>
        <span>something ridiculous</span>
        {children}
      </li>
    ),

    // Ex. 2: rendering custom list items
    checkmarks: ({ children }) => <li>✅ {children}</li>,
  },
};
export default function BigLog({ logBookEntries }: Props) {
  const router = useRouter();
  const logEntry = logBookEntries.find(
    (entry) => entry.slug.current == router.query.bigLog
  );
  const testi = logEntry?.entry.map((child) => {
    return child.children[0].text;
  });
  return (
    <div className="min-h-screen bg-black text-gray-800 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Article Header */}
        <header className="bg-gradient-to-r from-teal-600 to-teal-300 text-white py-8 px-6">
          <h1 className="text-4xl font-bold mb-2">{logEntry?.title}</h1>
          <div className="flex items-center text-sm space-x-4">
            <span>
              <strong>Author:</strong>
            </span>
            <span>
              <strong>Date: </strong>
              {logEntry && new Date(logEntry.date).toDateString()}
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
          <div className="prose max-w-none prose-purple">
            <PortableText value={logEntry?.entry} components={components} />
            {/* {logEntry?.entry.map((child) => {
              return child[0].text;
            })} */}
          </div>
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
