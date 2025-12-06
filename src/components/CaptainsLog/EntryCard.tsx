import React, {useRef} from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'
import {urlFor} from '../../lib/sanity'
import {LogbookEntry} from '../../../typings'

type Props = {
  uniqueId: number
  logBookEntryRefs: any
  logBookEntry: LogbookEntry
  style: string
}
export default function EntryCard({uniqueId, logBookEntryRefs, logBookEntry, style}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const url = window.location.href.includes('bigLogs')
    ? window.location.href
    : window.location.href + '/bigLogs'
  console.log(url)
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
    <Link href={`${url}/${logBookEntry.slug.current}`} className={style || ''}>
      <motion.div
        className="relative flex flex-col sm:flex-row lg:flex-col text-justify items-center sm:items-start lg:items-center w-full h-full bg-gradient-to-b from-stone-600 to-slate-700 overflow-clip rounded-lg text-white "
        style={{
          transition: 'all 0.3s ease-out',
        }}
        ref={(el) => {
          ref.current = el
          logBookEntryRefs.current[uniqueId] = el
        }}
      >
        <motion.img
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{duration: 1.2}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="h-[10em] w-full sm:size-[5em] lg-[h-10em] lg:w-full flex-shrink-0 self-center sm:rounded-full lg:rounded-none object-cover sm:mr-[1.8em] sm:object-left lg:mr-0 lg:object-center"
          src={urlFor(logBookEntry.image)?.url()}
          alt="not found"
        />
        <div className="relative p-8 flex flex-col justify-start items-start w-full sm:w-[30em] h-full">
          <h2 className="relative block text-2xl sm:text-xl lg:text-2xl w-full font-bold text-center pb-4 text-white text-nowrap overflow-hidden overflow-ellipsis">
            {logBookEntry.title}
          </h2>
          <p className=" relative text-xl sm:text-base lg:text-xl font-paragraph mb-4 sm:mb-0 line-clamp-[4] lg:line-clamp-[5] text-justify">
            {logBookEntry.description}
          </p>
          <p className="absolute bottom-0 right-0 p-4 font-paragraph text-justify">
            {formatDate(logBookEntry._updatedAt)}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
