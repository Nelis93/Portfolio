import React, {useRef} from 'react'

type EntryCarouselProps = {
  children: React.ReactElement<{_id: string}>[]
  selected: number
  setSelected: any
  debounce: any
}

export default function EntryCarousel({children, selected}: EntryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const MAX_VISIBILITY = 3
  return (
    <div
      className="z-30 text-white w-full top-0 mx-auto mb-0 h-[60vh] max-h-[30em] flex flex-row overflow-x-hidden items-center justify-center"
      ref={carouselRef}
      style={{
        position: 'sticky',
        perspective: '500px',
        transformStyle: 'preserve-3d',
      }}
    >
      {React.Children.map(children, (child, i) => {
        if (!child || !React.isValidElement(child)) return null
        const offset = (selected - i) / 3
        const absOffset = Math.abs(selected - i) / 3
        const direction = Math.sign(selected - i)
        return (
          <div
            key={child.props._id}
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
            {child}
          </div>
        )
      })}
    </div>
  )
}
