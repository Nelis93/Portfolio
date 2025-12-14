import React, {useState, useRef, useEffect} from 'react'
import type {GetStaticProps} from 'next'
import {Social, LogbookEntry} from '../../types'
import dynamic from 'next/dynamic'
import Header from '@/components/ui/Header'
import {fetchSocials} from '../../utils/fetchSocials'
import {fetchLogbookEntries} from '@/utils/fetchLogbookEntries'
import Slider from '@/components/ui/Slider'
import Link from 'next/link'
import {urlFor} from '../../lib/sanity'
import {motion} from 'framer-motion'
import formatDate from '@/utils/formateDate'
import Dots from '../ui/Dots'

type Props = {
  socials: Social[]
  logBookEntries: LogbookEntry[]
}

const CaptainsLog = ({socials, logBookEntries}: Props) => {
  const [selected, setSelected] = useState(0)
  const logBookEntryRefs = useRef<(HTMLDivElement | null)[]>([])
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const MAX_VISIBILITY = 3
  const ref = useRef<HTMLElement | null>(null)
  const url = window.location.href.includes('bigLogs')
    ? window.location.href
    : window.location.href + '/bigLogs'
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (event: any) => {
    setSelected(() => {
      return Math.round(
        (event.target.scrollTop / event.target.scrollTopMax) * (logBookEntries.length - 1),
      )
    })
  }
  const handleScrollMobile = () => {
    if (!scrollRef.current) return
    const {scrollLeft, offsetWidth} = scrollRef.current
    const idx = Math.round(scrollLeft / offsetWidth)
    if (idx !== selected) setSelected(idx)
  }
  useEffect(() => {
    if (scrollRef.current) {
      const child = scrollRef.current.children[selected] as HTMLElement
      if (child) {
        child.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        })
      }
    }
  }, [selected])
  return (
    <main
      translate="no"
      className="relative flex flex-col justify-start items-center bg-gradient-to-br from-teal-300 to-teal-600 text-white w-full overflow-x-clip"
    >
      <Header
        socials={socials}
        setSelectedFilter={null}
        style={
          'sticky text-[5vh] w-full sm:text-[5vw] lg:text-[5vh] top-0 p-5 flex items-start justify-between z-30'
        }
      />
      <section className="relative flex flex-col justify-center w-full min-h-screen items-center px-2 sm:px-4 md:px-8 py-4">
        <Link href={'captainsLog/bigLogs'}>
          <h1 className="py-4 sm:px-0 lg:px-2 text-lg sm:text-2xl h-20 mb-8 text-center font-bold hover:bg-yellow-500 border-2 border-teal-500 rounded-lg bg-teal-500 text-white">
            These are some writings for when you're free 🦅
          </h1>
        </Link>
        {window.innerWidth > 1000 && (
          <Slider
            items={logBookEntries}
            refs={logBookEntryRefs}
            currentIndex={selected}
            setCurrentIndex={setSelected}
            style={
              'absolute hidden sm:flex flex-row justify-between items-center h-[5em] bg-transparent w-1/2'
            }
            scrolling={false}
          />
        )}
        <div
          className="relative text-white w-full sm:w-5/6 md:w-2/3 max-w-[95vw] sm:max-w-[60em] h-[60vh] max-h-[30em] rounded-lg overflow-y-scroll scrollbar-none"
          onScroll={handleScroll}
        >
          {window.innerWidth > 1000 ? (
            <div
              className="z-30 text-white w-full top-0 mx-auto mb-0 h-[60vh] max-h-[30em] flex flex-row overflow-x-hidden items-center justify-center"
              ref={carouselRef}
              style={{
                position: 'sticky',
                perspective: '500px',
                transformStyle: 'preserve-3d',
              }}
            >
              {logBookEntries.map((entry, i) => {
                if (!entry || !React.isValidElement(entry)) return null
                const offset = (selected - i) / 3
                const absOffset = Math.abs(selected - i) / 3
                const direction = Math.sign(selected - i)
                return (
                  <div
                    key={entry._id}
                    className="w-[23rem] shadow-lg shadow-black rounded-lg mx-auto"
                    style={{
                      position: 'absolute',
                      height: '100%',
                      filter: `blur(${Math.abs((selected - i) / 3)}rem)`,
                      transform: `
                            rotateY(${offset * 50}deg)
                            scaleY(${1 + absOffset * -0.4})
                            translateZ(${absOffset * -30}rem)
                            translateX(${direction * -5}rem)
                          `,
                      transition: 'all 0.3s ease-out',
                      pointerEvents: selected === i ? 'auto' : 'none',
                      opacity: Math.abs(selected - i) >= MAX_VISIBILITY ? 0 : 1,
                      display: 'block',
                      zIndex: Math.abs(selected - i) * -1,
                    }}
                  >
                    <Link href={`${url}/${entry.slug.current}`} className={''}>
                      <motion.div
                        className="relative flex flex-col sm:flex-row lg:flex-col text-justify items-center sm:items-start lg:items-center w-full h-full bg-gradient-to-b from-stone-600 to-slate-700 overflow-clip rounded-lg text-white "
                        style={{
                          transition: 'all 0.3s ease-out',
                        }}
                        ref={(el) => {
                          ref.current = el
                          logBookEntryRefs.current[i] = el
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
                          src={urlFor(entry.image)?.url()}
                          alt="not found"
                        />
                        <div className="relative p-8 flex flex-col justify-start items-start w-full sm:w-[30em] h-full">
                          <h2 className="relative block text-2xl sm:text-xl lg:text-2xl w-full font-bold text-center pb-4 text-white text-nowrap overflow-hidden overflow-ellipsis">
                            {entry.title}
                          </h2>
                          <p className=" relative text-xl sm:text-base lg:text-xl font-paragraph mb-4 sm:mb-0 line-clamp-[4] lg:line-clamp-[5] text-justify">
                            {entry.description}
                          </p>
                          <p className="absolute bottom-0 right-0 p-4 font-paragraph text-justify">
                            {formatDate(entry._updatedAt)}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="block w-screen max-w-full overflow-x-hidden">
              <div
                ref={scrollRef}
                className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-none w-screen"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                }}
                onScroll={handleScrollMobile}
              >
                {logBookEntries.map((entry, idx) => (
                  <div
                    className="flex-shrink-0 w-full snap-center px-2"
                    style={{maxWidth: '100%'}}
                    key={idx}
                  >
                    <Link href={`${url}/${entry.slug.current}`} className={''}>
                      <motion.div
                        className="relative flex flex-col sm:flex-row lg:flex-col text-justify items-center sm:items-start lg:items-center w-full h-full bg-gradient-to-b from-stone-600 to-slate-700 overflow-clip rounded-lg text-white "
                        style={{
                          transition: 'all 0.3s ease-out',
                        }}
                        ref={(el) => {
                          ref.current = el
                          logBookEntryRefs.current[idx] = el
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
                          src={urlFor(entry.image)?.url()}
                          alt="not found"
                        />
                        <div className="relative p-8 flex flex-col justify-start items-start w-full sm:w-[30em] h-full">
                          <h2 className="relative block text-2xl sm:text-xl lg:text-2xl w-full font-bold text-center pb-4 text-white text-nowrap overflow-hidden overflow-ellipsis">
                            {entry.title}
                          </h2>
                          <p className=" relative text-xl sm:text-base lg:text-xl font-paragraph mb-4 sm:mb-0 line-clamp-[4] lg:line-clamp-[5] text-justify">
                            {entry.description}
                          </p>
                          <p className="absolute bottom-0 right-0 p-4 font-paragraph text-justify">
                            {formatDate(entry._updatedAt)}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-2">
                <Dots
                  items={logBookEntries}
                  currentIndex={selected}
                  setCurrentIndex={setSelected}
                  refs={scrollRef}
                  style={'flex flex-row items-center gap-2 h-10'}
                />
              </div>
            </div>
          )}
          <div className="relative hidden sm:block text-white w-full h-[200vh]"></div>
        </div>
      </section>
      <section className="relative hidden sm:block">
        <div className="h-screen w-screen bg-black "></div>
      </section>
    </main>
  )
}

export default dynamic(() => Promise.resolve(CaptainsLog), {ssr: false})

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
