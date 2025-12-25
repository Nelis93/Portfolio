import React, {useRef, useEffect} from 'react'
import Dots from '../ui/Dots'

type Props = {
  children: React.ReactNode[]
  selected: number
  setSelected: (idx: number) => void
}

const MobileEntryCarousel = ({children, selected, setSelected}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to the selected card when selected changes
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

  // Handle manual scroll (swipe)
  const handleScroll = () => {
    if (!scrollRef.current) return
    const {scrollLeft, offsetWidth} = scrollRef.current
    const idx = Math.round(scrollLeft / offsetWidth)
    if (idx !== selected) setSelected(idx)
  }

  return (
    <div className="flex flex-col w-full">
      <div
        ref={scrollRef}
        className="flex flex-row overflow-x-scroll snap-x snap-mandatory scrollbar-none w-full"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
        onScroll={handleScroll}
      >
        {React.Children.map(children, (child, idx) => (
          <div
            className="flex flex-shrink-0 w-full max-w-full snap-start items-center justify-center"
            key={idx}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-2">
        <Dots
          items={children}
          currentIndex={selected}
          setCurrentIndex={setSelected}
          refs={scrollRef}
          style={'flex flex-row items-center gap-2 h-10'}
        />
      </div>
    </div>
  )
}

export default MobileEntryCarousel
