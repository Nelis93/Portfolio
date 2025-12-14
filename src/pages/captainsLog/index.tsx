import React, {useEffect, useRef, useState, useCallback} from 'react'
import type {GetStaticProps} from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Header from '@/components/ui/Header'
import Dots from '@/components/ui/Dots'
import {motion} from 'framer-motion'
import {fetchSocials} from '../../utils/fetchSocials'
import {fetchLogbookEntries} from '@/utils/fetchLogbookEntries'
import {urlFor} from '../../lib/sanity'
import formatDate from '@/utils/formateDate'
import type {Social, LogbookEntry} from '../../types'
import Slider from '@/components/ui/Slider'

// -----------------------------
// Utility hooks
// -----------------------------
function useIsClient() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])
  return isClient
}

function useWindowSize() {
  const [size, setSize] = useState({width: 0, height: 0})
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => setSize({width: window.innerWidth, height: window.innerHeight})
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

// -----------------------------
// Props
// -----------------------------
type Props = {
  socials: Social[]
  logBookEntries: LogbookEntry[]
}

// -----------------------------
// Small presentational piece: Card
// -----------------------------
function LogCard({
  entry,
  style,
  onRef,
}: {
  entry: LogbookEntry
  style?: React.CSSProperties
  onRef?: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={onRef}
      className="w-[23rem] rounded-lg shadow-lg overflow-hidden bg-gradient-to-b from-stone-600 to-slate-700 text-white"
      style={style}
    >
      <Link href={`/captainsLog/bigLogs/${entry.slug.current}`} className="block h-full">
        <div className="h-[10rem] w-full overflow-hidden">
          <img
            src={urlFor(entry.image)?.url()}
            alt={entry.title || 'log image'}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 truncate">{entry.title}</h3>
          <p className="text-sm line-clamp-4 mb-4">{entry.description}</p>
          <div className="text-xs text-right">{formatDate(entry._updatedAt)}</div>
        </div>
      </Link>
    </div>
  )
}

// -----------------------------
// Main component
// -----------------------------
const CaptainsLog: React.FC<Props> = ({socials, logBookEntries}) => {
  const isClient = useIsClient()
  const {width: winWidth} = useWindowSize()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [selected, setSelected] = useState(0)
  const entries = logBookEntries || []

  const MAX_VISIBLE = 3

  // compute selected index from scrollTop (desktop vertical scroll inside container)
  const onDesktopScroll = useCallback(() => {
    if (!containerRef.current || entries.length === 0) return
    const el = containerRef.current
    const scrollTop = el.scrollTop
    const maxScroll = el.scrollHeight - el.clientHeight
    const pct = maxScroll <= 0 ? 0 : scrollTop / maxScroll
    const idx = Math.round(pct * (entries.length - 1))
    setSelected((prev) => (prev === idx ? prev : idx))
  }, [entries.length])

  // throttle with RAF
  const handleScroll = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      onDesktopScroll()
      rafRef.current = null
    })
  }, [onDesktopScroll])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, {passive: true})
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Mobile: horizontal snapping
  const scrollTrackRef = useRef<HTMLDivElement | null>(null)
  const onMobileScroll = useCallback(() => {
    const el = scrollTrackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setSelected((prev) => (prev === idx ? prev : idx))
  }, [])

  useEffect(() => {
    const el = scrollTrackRef.current
    if (!el) return
    el.addEventListener('scroll', onMobileScroll, {passive: true})
    return () => el.removeEventListener('scroll', onMobileScroll)
  }, [onMobileScroll])

  // auto-centering when selected changes (use smooth behaviour only on client)
  useEffect(() => {
    if (!isClient) return
    if (winWidth >= 1000) {
      // desktop: we visually position cards in the 3D space; no imperative scroll needed
      return
    }
    // mobile: snap scroll to card
    const el = scrollTrackRef.current
    if (!el) return
    const targetX = selected * el.clientWidth
    el.scrollTo({left: targetX, behavior: 'smooth'})
  }, [selected, isClient, winWidth])

  // convenience: compute transform styles per card
  const cardStyleFor = (i: number): React.CSSProperties => {
    const offset = (selected - i) / 3
    const absOffset = Math.abs(selected - i) / 3
    const direction = Math.sign(selected - i)
    const hidden = Math.abs(selected - i) > MAX_VISIBLE
    return {
      position: 'absolute',
      height: '100%',
      transition: 'transform 280ms ease-out, opacity 280ms ease-out, filter 280ms ease-out',
      transform: `rotateY(${offset * 50}deg) scaleY(${1 - absOffset * 0.4}) translateZ(${-Math.max(0, absOffset) * 30}rem) translateX(${direction * -5}rem)`,
      opacity: hidden ? 0 : 1,
      pointerEvents: selected === i ? 'auto' : 'none',
      zIndex: Math.max(0, 100 - Math.abs(selected - i)),
      filter: `blur(${Math.min(4, absOffset * 1.5)}rem)`,
    }
  }

  return (
    <main className="relative flex flex-col items-center w-full bg-gradient-to-br from-teal-300 to-teal-600 text-white">
      <Header
        socials={socials}
        setSelectedFilter={null}
        style="sticky text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 flex items-start justify-between z-30"
      />

      <section className="relative flex flex-col items-center w-full h-screen px-4 py-6">
        <div className="flex flex-col items-center w-full h-full">
          <Link href={'captainsLog/bigLogs'} className="flex w-auto z-50">
            <h1 className="flex py-4 sm:px-0 lg:px-2 text-lg sm:text-2xl h-20 mb-8 text-center font-bold hover:bg-yellow-500 border-2 border-teal-500 rounded-lg bg-teal-500 text-white">
              These are some writings for when you're free 🦅
            </h1>
          </Link>
          {window.innerWidth > 1000 && (
            <Slider
              items={logBookEntries}
              refs={scrollTrackRef}
              currentIndex={selected}
              setCurrentIndex={setSelected}
              style={
                'absolute hidden h-full sm:flex flex-row justify-between items-center h-[5em] bg-transparent w-1/2'
              }
              scrolling={false}
            />
          )}
          {/* DESKTOP: vertical scroll area that controls 3D carousel */}
          <div
            ref={containerRef}
            className="relative w-full h-auto rounded-lg overflow-y-scroll scrollbar-none"
          >
            {isClient && winWidth >= 1000 ? (
              <div
                ref={listRef}
                className="sticky top-0 w-full h-[60vh] flex items-center justify-center"
                style={{perspective: 800, transformStyle: 'preserve-3d'}}
              >
                {entries.map((entry, i) => (
                  <LogCard
                    key={entry._id}
                    entry={entry}
                    onRef={() => null}
                    style={cardStyleFor(i)}
                  />
                ))}
              </div>
            ) : (
              /* MOBILE: horizontal snapping list */
              <div className="block w-screen max-w-full overflow-x-hidden">
                <div
                  ref={scrollTrackRef}
                  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full"
                  style={{WebkitOverflowScrolling: 'touch'}}
                >
                  {entries.map((entry, idx) => (
                    <div
                      key={entry._id}
                      className="flex-shrink-0 w-full snap-center px-2"
                      style={{maxWidth: '100%'}}
                    >
                      <LogCard entry={entry} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-2">
                  <Dots
                    items={entries}
                    currentIndex={selected}
                    setCurrentIndex={setSelected}
                    refs={scrollTrackRef}
                    style={'flex flex-row items-center gap-2 h-10'}
                  />
                </div>
              </div>
            )}

            {/* keep page scrollable after carousel (the original had 200vh spacer) */}
            <div className="relative w-full h-[200vh] hidden sm:block" />
          </div>
        </div>
      </section>

      <section className="relative hidden sm:block">
        <div className="h-screen w-screen bg-black" />
      </section>
    </main>
  )
}

export default dynamic(() => Promise.resolve(CaptainsLog), {ssr: false})

export const getStaticProps: GetStaticProps<Props> = async () => {
  const logBookEntries: LogbookEntry[] = await fetchLogbookEntries()
  const socials: Social[] = await fetchSocials()
  return {props: {logBookEntries, socials}, revalidate: 10}
}
