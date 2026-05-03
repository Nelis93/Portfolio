import {useCallback} from 'react'
import {motion} from 'framer-motion'
import {GalleryVideo} from '../../types'
import {getMuxThumbnailUrl} from '../../lib/mux'
import {urlFor} from '../../lib/sanity'
import {MdPlayArrow} from 'react-icons/md'
import {IconContext} from 'react-icons'

type Props = {
  video: GalleryVideo
  uniqueId: number
  cardCount: any
  setSelected: any
  focus: any
  setFocus: any
  maxHeight: any
  onVideoData: (
    videoId: string,
    data: {height: number; naturalHeight: number; width: number; title: string},
  ) => void
  selectedFilter: any
  setManualFocus?: any
}

export default function GalleryVideoCard({
  video,
  uniqueId,
  // cardCount,
  setSelected,
  // focus,
  // setFocus,
  setManualFocus,
  maxHeight,
  onVideoData,
}: Props) {
  // const [iconPosition, setIconPosition] = useState({
  //   distance: 0,
  //   transform: 'none',
  // })

  // Use custom Mux URL if provided, otherwise use custom thumbnail image, otherwise use auto-generated Mux thumbnail
  const thumbnailUrl = video.customMuxThumbnailUrl
    ? video.customMuxThumbnailUrl
    : video.thumbnail
      ? urlFor(video.thumbnail).url()
      : getMuxThumbnailUrl(video.muxPlaybackId)

  // const handlePosition = (event: any) => {
  //   const intendedFlipWidth =
  //     event.target.parentElement.parentElement.offsetWidth -
  //     event.target.parentElement.parentElement.firstChild.clientWidth
  //   setIconPosition((current) => {
  //     return {distance: intendedFlipWidth, transform: current.transform}
  //   })
  // }

  // useEffect(() => {
  //   if (focus == uniqueId) {
  //     setIconPosition((current) => {
  //       return {
  //         distance: current.distance,
  //         transform: `rotateY(180deg) translateX(${current.distance}px)`,
  //       }
  //     })
  //     return
  //   }
  //   setIconPosition((current) => {
  //     return {distance: current.distance, transform: 'none'}
  //   })
  //   return
  // }, [focus])

  const handleVideoLoad = useCallback(
    (event: any) => {
      const offsetHeight = event.target.offsetHeight
      const heightInVH = (offsetHeight / window.innerHeight) * 100
      const naturalWidth = event.target.naturalWidth
      const naturalHeight = event.target.naturalHeight
      const title = video.title

      onVideoData(video._id, {
        height: heightInVH,
        naturalHeight: naturalHeight,
        width: naturalWidth,
        title: title,
      })
    },
    [video._id, video.title, onVideoData],
  )

  const getHeight = () => {
    const heightObj = maxHeight?.find((h: any) => h.id === video._id)
    return heightObj?.value ?? 'auto'
  }

  const handleCardClick = () => {
    console.log('GVC - uniqueId:', uniqueId, 'video title:', video.title)
    setSelected(uniqueId)
    setManualFocus(true)
  }

  return (
    <div
      style={{
        height: `${getHeight()}dvh`,
        perspective: '1000px',
        boxShadow: 'inset 0em 1em black',
      }}
      className="relative w-full max-h-[75dvh] border-black border-8 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Card container with shadow and rounded corners */}
      <motion.div
        className="relative h-full w-full shadow-lg shadow-gray-700 rounded-lg overflow-y-clip"
        initial={false}
        id={video._id}
      >
        {/* Thumbnail Image */}
        <motion.img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover rounded-lg"
          onLoad={handleVideoLoad}
          loading="lazy"
        />

        {/* Dark overlay on hover */}
        <motion.div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />

        {/* Play button - always visible, scales on hover */}
        <IconContext.Provider
          value={{
            className:
              'size-12 sm:size-16 text-white drop-shadow-lg group-hover:scale-125 transition-transform duration-300',
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointerEvents-none"
            whileHover={{scale: 1.1}}
          >
            <MdPlayArrow />
          </motion.div>
        </IconContext.Provider>

        {/* Video metadata overlay (appears on hover) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-full group-hover:translate-y-0">
          <h3 className="text-xs sm:text-sm font-bold text-white truncate">{video.title}</h3>
          <p className="text-xs text-gray-200 truncate">{video.location}</p>
          {video.duration && (
            <p className="text-xs text-gray-300 mt-1">
              {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
            </p>
          )}
        </div>

        {/* Duration badge in corner */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
          </div>
        )}
      </motion.div>
    </div>
  )
}
