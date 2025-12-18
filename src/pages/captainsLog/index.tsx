import React, {useEffect, useRef, useState} from 'react'
import type {GetStaticProps} from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import {fetchSocials} from '@/utils/fetchSocials'
import {fetchLogbookEntries} from '@/utils/fetchLogbookEntries'
import {urlFor} from '@/lib/sanity'
import formatDate from '@/utils/formateDate'
import type {Social, LogbookEntry} from '@/types'
import Slider from '@/components/ui/Slider'
import logbookEntry from '@/schemas/logbookEntry'
/* ---------------- Card ---------------- */
function LogCard({entry, style}: {entry: LogbookEntry; style: React.CSSProperties}) {
  return (
    <div
      className="absolute w-[23rem] rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-stone-600 to-slate-700 text-white"
      style={style}
    >
      <Link href={`/captainsLog/bigLogs/${entry.slug.current}`} className="block h-full">
        <div className="h-[10rem] w-full overflow-hidden">
          <img
            src={urlFor(entry.image)?.url()}
            alt={entry.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="h-[13rem] p-6">
          <h3 className="text-xl font-bold mb-2 truncate">{entry.title}</h3>
          <p className="text-sm line-clamp-4 mb-4">{entry.description}</p>
          <div className="text-xs text-right">{formatDate(entry._updatedAt)}</div>
        </div>
      </Link>
    </div>
  )
}

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

    const rect = sectionRef.current.getBoundingClientRect()
    const vh = window.innerHeight
    const startFactor = 0.4
    // const topOrBottom =
    //   logBookEntries[selected]._id == logBookEntries[logBookEntries.length - 1]._id
    //     ? rect.bottom
    //     : rect.top
    // start when section top hits middle of viewport
    const start = vh * startFactor
    const raw = (start - rect.top) / CARD_SCROLL_PX

    const idx = Math.min(logBookEntries.length - 1, Math.max(0, Math.round(raw)))
    console.log(
      // 'topOrBottom: ',
      // Math.round(topOrBottom),
      'top: ',
      Math.round(rect.top),
      'bottom: ',
      Math.round(rect.bottom),
      'selected: ',
      selected,
    )
    setSelected(idx)
  }
  // setSelected((current: number) => {
  //     const rect = sectionRef.current?.getBoundingClientRect() || {top: 0, bottom: 0}
  //     const vh = window.innerHeight
  //     const startFactor = 0.4
  //     const topOrBottom =
  //       logBookEntries[current]._id == logBookEntries[logBookEntries.length - 1]._id
  //         ? rect?.bottom
  //         : rect?.top
  //     // start when section top hits middle of viewport
  //     const start = vh * startFactor
  //     const raw = (start - topOrBottom) / CARD_SCROLL_PX

  //     const idx = Math.min(logBookEntries.length - 1, Math.max(0, Math.round(raw)))
  //     console.log(
  //       'topOrBottom: ',
  //       Math.round(topOrBottom),
  //       'top: ',
  //       Math.round(rect.top),
  //       'bottom: ',
  //       Math.round(rect.bottom),
  //       'selected: ',
  //       current,
  //     )
  //     return idx
  //   })
  useEffect(() => {
    window.addEventListener('scroll', onScroll, {passive: true})
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [logBookEntries.length])

  useEffect(() => {
    logBookEntries[selected]._id == logBookEntries[logBookEntries.length - 1]._id
      ? console.log('last')
      : console.log('not last')
    console.log(logBookEntries[selected])
  }, [selected])
  /* 3D transform per card (same logic as your container version) */
  const cardStyleFor = (i: number): React.CSSProperties => {
    const offset = (selected - i) / 3
    const absOffset = Math.abs(selected - i) / 3
    const direction = Math.sign(selected - i)
    const hidden = Math.abs(selected - i) > 3

    return {
      position: 'absolute',
      maxHeight: '25rem',
      transition: 'transform 280ms ease-out, opacity 280ms ease-out, filter 280ms ease-out',
      transform: `rotateY(${offset * 50}deg)
                  scaleY(${1 - absOffset * 0.4})
                  translateZ(${-Math.max(0, absOffset) * 30}rem)
                  translateX(${direction * -5}rem)`,
      opacity: hidden ? 0 : 1,
      pointerEvents: selected === i ? 'auto' : 'none',
      zIndex: Math.max(0, 100 - Math.abs(selected - i)),
      filter: `blur(${Math.min(4, absOffset * 1.5)}rem)`,
    }
  }

  return (
    <main className="bg-gradient-to-br from-teal-300 to-teal-600 text-white">
      <Header
        socials={socials}
        setSelectedFilter={null}
        style="sticky text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 flex items-start justify-between z-30"
      />

      {/* Intro */}
      <section className="h-[30vh] flex items-end justify-center">
        <Link href={'captainsLog/bigLogs'} className="flex w-auto z-50">
          <h1 className="flex py-4 sm:px-0 lg:px-2 text-lg sm:text-2xl h-20 text-center font-bold hover:bg-yellow-500 border-2 border-teal-500 rounded-lg bg-teal-500 text-white">
            These are some writings for when you're free 🦅
          </h1>
        </Link>
      </section>

      {/* Scroll-driven carousel */}
      <section
        ref={sectionRef}
        className="relative bg-blue-200"
        style={{height: `${logBookEntries.length * CARD_SCROLL_PX}px`}}
      >
        {/* {window.innerWidth > 1000 && (
        )} */}
        <div
          className="sticky top-0 pt-[50vh] flex items-center justify-center"
          style={{perspective: 800, transformStyle: 'preserve-3d'}}
        >
          <Slider
            items={logBookEntries}
            refs={sectionRef}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              'absolute hidden h-full sm:flex flex-row justify-between items-center h-[5em] bg-transparent w-1/2'
            }
            scrolling={false}
          />
          {logBookEntries.map((entry, i) => (
            <LogCard key={entry._id} entry={entry} style={cardStyleFor(i)} />
          ))}
        </div>
      </section>

      {/* Continuation */}
      <section className="h-[200vh] bg-black flex items-center justify-center">
        <p className="text-xl">More page content ↓</p>
      </section>
    </main>
  )
}

export default dynamic(() => Promise.resolve(CaptainsLog), {ssr: false})

export const getStaticProps: GetStaticProps = async () => {
  const logBookEntries = await fetchLogbookEntries()
  const socials = await fetchSocials()
  return {props: {logBookEntries, socials}, revalidate: 10}
}
