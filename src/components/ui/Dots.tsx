import React from 'react'

type Props = {
  items: any
  refs: any
  currentIndex: any
  setCurrentIndex: any
  style: any
}

export default function Dots({items, refs, currentIndex, setCurrentIndex, style}: Props) {
  const totalItems = items.length
  const maxDots = 5 // Maximum number of dots to display

  // Determine the range of dots to show
  let startIndex = Math.max(0, currentIndex - 2) // Start range 2 items before the current
  let endIndex = Math.min(totalItems - 1, currentIndex + 2) // End range 2 items after the current

  // Ensure we always show `maxDots` if possible, adjust start/end accordingly
  if (endIndex - startIndex < maxDots - 1) {
    // Adjust if less than `maxDots` items in the range
    if (startIndex === 0) {
      endIndex = Math.min(maxDots - 1, totalItems - 1) // Shift end index forward
    } else if (endIndex === totalItems - 1) {
      startIndex = Math.max(0, totalItems - maxDots) // Shift start index backward
    }
  }

  const visibleDots = []
  for (let i = startIndex; i <= endIndex; i++) {
    visibleDots.push(i)
  }

  const slide = (index: any) => {
    refs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    slide(index)
  }

  return (
    <div className={style}>
      {visibleDots.map((idx: number) => (
        <div
          key={idx}
          className={`size-[.8em] max-w-[5vw] max-h-[5vw] rounded-[50%] lg:hover:cursor-pointer ${
            currentIndex === idx ? 'bg-yellow-500' : 'bg-black'
          }`}
          onClick={() => window.innerWidth > 1000 && handleDotClick(idx)}
        ></div>
      ))}
    </div>
  )
}
