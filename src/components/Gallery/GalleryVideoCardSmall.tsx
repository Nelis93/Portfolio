import {motion} from 'framer-motion'
import {GalleryVideo} from '../../types'
import {urlFor} from '../../lib/sanity'
import {getMuxThumbnailUrl} from '../../lib/mux'
import {MdPlayArrow} from 'react-icons/md'
import {IconContext} from 'react-icons'

type Props = {
  video: GalleryVideo
  uniqueId: number
  setSelected: any
  setManualFocus: any
}

export default function GalleryVideoCardSmall({
  video,
  uniqueId,
  setSelected,
  setManualFocus,
}: Props) {
  const handleCardClick = (event: any) => {
    event.stopPropagation()
    setSelected(uniqueId)
    setManualFocus(true)
  }
  const thumbnailUrl = video.customMuxThumbnailUrl
    ? video.customMuxThumbnailUrl
    : video.thumbnail
      ? urlFor(video.thumbnail).url()
      : getMuxThumbnailUrl(video.muxPlaybackId)

  return (
    <div key={video._id} className="group relative w-full h-full" onClick={handleCardClick}>
      {/* Front side of the card: Image */}
      <motion.img
        className="relative z-20 w-full h-auto rounded-lg"
        src={thumbnailUrl}
        alt={video.title}
      />
      {/* Play button - always visible, scales on hover */}
      <IconContext.Provider
        value={{
          className:
            'relative z-30 size-12 sm:size-16 text-white drop-shadow-lg group-hover:scale-125 transition-transform duration-300',
        }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointerEvents-none"
          whileHover={{scale: 1.1}}
        >
          <MdPlayArrow />
        </motion.div>
      </IconContext.Provider>
    </div>
  )
}
