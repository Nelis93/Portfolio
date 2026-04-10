import {useRef, useEffect} from 'react'
import {motion, useInView} from 'framer-motion'
import {getMuxPlaybackUrl} from '../../lib/mux'
import {GalleryVideo} from '../../types'
import {TfiClose} from 'react-icons/tfi'
import {IconContext} from 'react-icons'

type Props = {
  video: GalleryVideo
  uniqueId: number
  selected: number
  setSelected: any
  galleryRefs: any
  manualFocus: boolean
  setManualFocus: any
}

export default function FocusedVideoCard({
  video,
  galleryRefs,
  selected,
  setSelected,
  uniqueId,
  manualFocus,
  setManualFocus,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Track if each video is in view
  const isInView = useInView(ref, {
    amount: 0.5,
    once: false,
  })

  // Update the currentIndex based on which video is in view
  useEffect(() => {
    if (isInView && !manualFocus) {
      setSelected(uniqueId)
      return
    }
    setTimeout(() => setManualFocus(false), 2000)
  }, [isInView, uniqueId, manualFocus, setSelected, setManualFocus])

  const handleButtonClick = (event: any) => {
    event.stopPropagation()
    setManualFocus(false)
    setSelected(-1)
    // Pause video on close
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const playbackUrl = getMuxPlaybackUrl(video.muxPlaybackId)

  return (
    <motion.div
      className="relative flex justify-center items-center snap-start flex-shrink-0 w-screen sm:w-[70vw] z-50 sm:mx-auto border-4 rounded-xl border-gray-500 overflow-hidden h-full"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      ref={(el) => {
        ref.current = el
        galleryRefs.current[uniqueId] = el
        console.log('FocusedVideoCard mounted at uniqueId:', uniqueId, 'video title:', video.title)
      }}
      exit={{opacity: 0}}
    >
      {/* Close button */}
      <IconContext.Provider
        value={{
          className:
            'social-icon sm:size-[2em] lg:size-[1.2em] absolute right-2 top-2 z-40 bg-black hover:bg-gray-500 hover:fill-black rounded-full hover:cursor-pointer',
          attr: {
            onClick: handleButtonClick,
            onSelect: handleButtonClick,
          },
        }}
      >
        <TfiClose />
      </IconContext.Provider>

      {/* Full-screen Video Player */}
      <motion.video ref={videoRef} className="w-full h-full object-contain" controls autoPlay>
        <source src={playbackUrl} type="application/x-mpegURL" />
        Your browser does not support the video tag.
      </motion.video>
    </motion.div>
  )
}
