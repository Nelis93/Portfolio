import React, {useRef, useState, useEffect} from 'react'

type EntryCarouselProps = {
  children: React.ReactElement<{_id: string}>[]
  selected: number
  setSelected: any
  debounce: any
}

export default function EntryCarousel({
  children,
  selected,
  setSelected,
  debounce,
}: EntryCarouselProps) {
  const [scrollPos, setScrollPos] = useState({a: 0, b: 0})
  const [userPos, setUserPos] = useState(false)
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const MAX_VISIBILITY = 3
  const setScrollPosition = (event: any) => {
    setScrollPos(() => {
      if (Math.sign(event) > 0) {
        // console.log("pos");
        return {a: event, b: 1}
      }
      // console.log("neg");
      return {a: event, b: -1}
    })
  }
  const handleWheel = debounce((event: any) => {
    if (selected === 4) return
    setScrollPosition(event.deltaY)
    // console.log(event.deltaY);
  }, 100)
  const handleMouseEnter = () => {
    // console.log("entered");
    carouselRef.current?.addEventListener('wheel', handleWheel)
    setUserPos(true)
  }
  const handleMouseLeave = () => {
    setUserPos(false)
    carouselRef.current?.removeEventListener('wheel', handleWheel)
    // console.log("left");
  }
  useEffect(() => {
    // console.log("selected: ", selected);
    // console.log("#children: ", children.length);
    if (scrollPos.b === 1 && selected < children.length - 1 && userPos) {
      // console.log("useEffect: pos ", scrollPos.b);
      setSelected((current: any) => current + 1)
      return
    } else if (scrollPos.b === -1 && selected > 0 && userPos) {
      setSelected((current: any) => current - 1)
      // console.log("useEffect: neg ", scrollPos.b);
    } else if (scrollPos.b === 1 && selected === children.length - 1) {
      // console.log("end of line");
      carouselRef.current?.removeEventListener('wheel', handleWheel)
      // setSelected(0);
    } else if (scrollPos.b === -1 && selected === 0) {
      // console.log("end of line");
      carouselRef.current?.removeEventListener('wheel', handleWheel)
      // setSelected(0);
    }
  }, [scrollPos])
  // useEffect(() => {
  //   // console.log(userPos);
  //   if (userPos && selected === children.length - 1 && scrollPos.b === 1) {
  //     carouselRef.current?.removeEventListener("wheel", handleWheel);
  //     console.log("eventlistener unmount");
  //   } else if (
  //     userPos &&
  //     selected === children.length - 1 &&
  //     scrollPos.b === -1
  //   ) {
  //     console.log("eventlistener mount");
  //     carouselRef.current?.addEventListener("wheel", handleWheel);
  //   } else if (userPos && selected === 0 && scrollPos.b === -1) {
  //     console.log("eventlistener unmount");
  //     carouselRef.current?.removeEventListener("wheel", handleWheel);
  //   } else if (userPos && selected === 0 && scrollPos.b === 1) {
  //     console.log("eventlistener mount");
  //     carouselRef.current?.addEventListener("wheel", handleWheel);
  //   } else {
  //     console.log("");
  //   }
  // }, [userPos, selected]);
  return (
    <div
      className=" z-30 text-white w-full top-0 sm:mx-auto mb-2 sm:mb-0 sm:h-[60vh] sm:max-h-[30em] flex flex-row overflow-x-hidden items-center justify-center"
      ref={carouselRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
