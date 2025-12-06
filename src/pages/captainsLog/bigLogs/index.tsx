// // import { GetServerSideProps } from "next";
// // export const getServerSideProps: GetServerSideProps = async (context) => {
// //   // Redirect to /products if the user lands on /products/new-products
// //   return {
// //     redirect: {
// //       destination: "/captainsLog", // The target redirect URL
// //       permanent: false, // Use false for temporary redirect (HTTP 302), true for permanent (HTTP 308)
// //     },
// //   };
// // };

import {useState, useMemo} from 'react'
import {LogbookEntry, Social} from '../../../../typings'
import {fetchLogbookEntries} from '@/utils/fetchLogbookEntries'
import {fetchSocials} from '@/utils/fetchSocials'
import dynamic from 'next/dynamic'
import {GetStaticProps} from 'next'
import Header from '@/components/ui/Header'
import {urlFor} from '../../../lib/sanity'
import Link from 'next/link'
import {FaSearch} from 'react-icons/fa'
import {IconContext} from 'react-icons'
import Breadcrumbs from '../../../components/CaptainsLog/BreadCrumbs'

// Component Props
type Props = {
  socials: Social[]
  logBookEntries: LogbookEntry[]
}

const BigLogs = ({socials, logBookEntries}: Props) => {
  const [query, setQuery] = useState('')

  // Function to highlight matched words
  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<span class="bg-yellow-300 text-black">$1</span>')
  }

  // Memoized filtered log entries to optimize performance
  const filteredEntries = useMemo(() => {
    if (!query) return logBookEntries
    const regex = new RegExp(query, 'gi')
    return logBookEntries.filter(
      (entry) => entry.title.match(regex) || entry.description.match(regex),
    )
  }, [query, logBookEntries])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    return date.toLocaleDateString(undefined, options)
  }
  return (
    <main className="relative flex flex-col items-center bg-gradient-to-br from-teal-300 to-teal-600 text-black w-screen h-screen px-4 lg:px-8 overflow-y-scroll scrollbar-none">
      <Header
        socials={socials}
        setSelectedFilter={() => {}}
        style="sticky bg-teal-500 rounded-b-md text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 pb-6 mb-2 flex items-start justify-between z-20"
      />
      <Breadcrumbs />
      {/* Search Input */}
      <div className="sticky flex flex-row items-center top-5 z-20 w-full max-w-lg">
        <input
          type="text"
          className="w-full p-3 text-base sm:text-xl text-center border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Filter by title or description"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconContext.Provider
          value={{
            style: {
              position: 'absolute',
              color: 'gray',
              backgroundColor: 'transparent',
              height: '80%',
              width: '3em',
              padding: '0.5em',
              right: '1em',
            },
          }}
        >
          <FaSearch />
        </IconContext.Provider>
      </div>

      {/* Article Grid */}
      <section className="relative grid grid-cols-1 gap-6 p-6 w-full lg:text-[2em] lg:px-[20vh] max-w-[90vw] sm:max-w-[80vw] lg:max-w-[1500px]">
        {filteredEntries.map((entry, index) => (
          <Link
            key={index}
            href={`/captainsLog/bigLogs/${entry.slug.current}`}
            className="relative flex items-start h-36 sm:h-auto sm:p-6 bg-gradient-to-b from-stone-600 to-slate-700 sm:hover:bg-stone-400 sm:hover:border-yellow-500 rounded-lg shadow-lg border-l-4 border-l-slate-50"
          >
            <div className="absolute z-0 sm:relative sm:self-center flex-shrink-0 h-full sm:h-44 sm:mr-6 w-full sm:w-44 ">
              <img
                src={urlFor(entry.image)?.url()}
                alt={entry.title}
                className="h-full w-full object-cover rounded-lg sm:rounded-full"
              />
            </div>
            <div className="flex flex-col z-10 p-5 sm:p-0 text-justify items-start text-white">
              <h2
                className="text-xl line-clamp-[2] text-ellipsis font-bold text-white bg-neutral-400 rounded-lg px-2 sm:px-0 sm:bg-auto bg-opacity-70 sm:bg-opacity-0 pb-2"
                dangerouslySetInnerHTML={{
                  __html: highlightText(entry.title, query),
                }}
              />
              <p
                className="hidden sm:block text-lg line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: highlightText(entry.description, query),
                }}
              />
            </div>
            <p className="absolute bottom-0 right-0 p-4 text-lg font-paragraph text-justify text-white">
              {formatDate(entry._updatedAt)}
            </p>
          </Link>
        ))}
        {filteredEntries.length === 0 && (
          <p className="text-center text-white text-lg">No matching articles found.</p>
        )}
      </section>
    </main>
  )
}

export default dynamic(() => Promise.resolve(BigLogs), {ssr: false})

export const getStaticProps: GetStaticProps<Props> = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries()
  const socials: Social[] = await fetchSocials()
  return {
    props: {
      logBookEntries,
      socials,
    },
    revalidate: 10,
  }
}
