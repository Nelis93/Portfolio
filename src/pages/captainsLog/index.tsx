import React, {useEffect, useRef, useState} from 'react'
import type {GetStaticProps} from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import {fetchSocials} from '@/utils/fetchSocials'
import {fetchLogbookEntries} from '@/utils/fetchLogbookEntries'
import type {Social, LogbookEntry} from '@/types'
import EntryCarousel from '@/components/CaptainsLog/EntryCarousel'
import EntryCard from '@/components/CaptainsLog/EntryCard'
import MobileEntryCarousel from '@/components/CaptainsLog/MobileEntryCarousel'

/* ---------------- Page ---------------- */
const CaptainsLog: React.FC<{socials: Social[]; logBookEntries: LogbookEntry[]}> = ({
  socials,
  logBookEntries,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState(0)

  const CARD_SCROLL_PX = 350 // how much page scroll advances one card

  /* Page scroll → selected index */
  const onScroll = () => {
    if (!sectionRef.current) return
    if (window.innerWidth < 650) return
    const rect = sectionRef.current.getBoundingClientRect()
    const vh = window.innerHeight
    const startFactor = 0.4
    const start = vh * startFactor
    const raw = (start - rect.top) / CARD_SCROLL_PX

    const idx = Math.min(logBookEntries.length - 1, Math.max(0, Math.floor(raw)))
    setSelected(idx)
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll, {passive: true})
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [logBookEntries.length])

  return (
    <main
      translate="no"
      className="relative flex flex-col items-center w-screen sm:w-full h-full px-4 sm:px-0 overflow-y-scroll sm:overflow-y-visible scrollbar-none bg-gradient-to-br from-teal-300 to-teal-600 text-white"
    >
      <Header
        socials={socials}
        setSelectedFilter={null}
        style="sticky bg-teal-500 sm:bg-transparent rounded-b-md text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 flex items-start justify-between z-30"
      />

      {/* Intro */}
      <section className="relative h-[20vh] sm:h-[30vh] flex items-center sm:items-end justify-center">
        <Link href={'captainsLog/bigLogs'} className="flex w-auto sm:z-50">
          <h1 className="flex py-4 sm:px-0 lg:px-2 text-lg sm:text-2xl h-20 text-center font-bold hover:bg-yellow-500 border-2 border-teal-500 rounded-lg bg-teal-500 text-white">
            These are some writings for when you're free 🦅
          </h1>
        </Link>
      </section>

      {/* Scroll-driven carousel */}
      <section
        ref={sectionRef}
        className="relative w-full"
        style={{height: `${logBookEntries.length * CARD_SCROLL_PX}px`}}
      >
        {window.innerWidth > 1000 ? (
          <EntryCarousel
            entries={logBookEntries}
            selected={selected}
            setSelected={setSelected}
            refs={sectionRef}
          >
            {logBookEntries.map((entry, i) => (
              <EntryCard selected={selected} entry={entry} index={i} styleActive />
            ))}
          </EntryCarousel>
        ) : (
          <MobileEntryCarousel selected={selected} setSelected={setSelected}>
            {logBookEntries.map((entry, idx) => (
              <EntryCard selected={selected} entry={entry} index={idx} styleActive={false} />
            ))}
          </MobileEntryCarousel>
        )}
      </section>

      {/* Continuation */}
      <section className="h-[200vh] flex items-center justify-center">
        <p className="text-xl">More page content coming soon ...</p>
      </section>
    </main>
  )
}

export default dynamic(() => Promise.resolve(CaptainsLog), {ssr: false})
// export default CaptainsLog
export const getStaticProps: GetStaticProps = async () => {
  const logBookEntries = await fetchLogbookEntries()
  const socials = await fetchSocials()
  return {props: {logBookEntries, socials}, revalidate: 10}
}
