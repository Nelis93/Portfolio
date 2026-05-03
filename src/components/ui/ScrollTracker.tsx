import {useEffect, useState} from 'react'

const ScrollProgressButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = document.getElementById('main')
      if (!scrollElement) return

      let scrollTop = scrollElement.scrollTop
      let scrollHeight = scrollElement.scrollHeight
      let clientHeight = scrollElement.clientHeight

      // Calculate scroll percentage
      const totalScroll = scrollHeight - clientHeight
      const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0

      setScrollProgress(progress)
      setIsVisible(scrollTop > 100)
    }

    // Listen to both scroll events
    const scrollElement = document.getElementById('main')

    console.log('scrollElement', scrollElement)
    scrollElement?.addEventListener('scroll', handleScroll)
    console.log('Added scroll listener to #main')

    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    console.log('visible changed:', isVisible)
  }, [isVisible])
  const scrollToTop = () => {
    const scrollElement = document.getElementById('main')
    if (scrollElement) {
      scrollElement.scrollTo({top: 0, behavior: 'smooth'})
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  return (
    <button
      onClick={scrollToTop}
      className={`rounded-full fixed bottom-[2.5dvh] right-3 w-16 h-16 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        background: `conic-gradient(rgb(194, 255, 63) ${scrollProgress}%, rgb(30, 30, 40) ${scrollProgress}%, rgb(30, 30, 40) 100%)`,
      }}
      aria-label="Scroll to top"
    >
      {/* Arrow SVG */}
      <svg
        className="absolute bg-black rounded-full inset-0 m-auto w-12 h-12 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="-5 -5 35 35"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}
export default ScrollProgressButton
