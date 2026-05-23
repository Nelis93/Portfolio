import {motion} from 'framer-motion'
import {GalleryVideo} from '../../types'
import {urlFor} from '../../lib/sanity'
import {getMuxThumbnailUrl} from '../../lib/mux'
import {MdPlayArrow} from 'react-icons/md'
import {FiShare2} from 'react-icons/fi'
import {copyGalleryShareLink} from '@/utils/galleryQuery'
import {useShareFeedback} from '@/components/ui/ShareFeedback'
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
  const {notifyLinkCopied} = useShareFeedback()
  const handleCardClick = (event: any) => {
    event.stopPropagation()
    setSelected(uniqueId)
    setManualFocus(true)
  }

  const handleShareClick = (event: any) => {
    event.stopPropagation()
    copyGalleryShareLink(video._id, notifyLinkCopied).catch(() => {})
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
      {/* Share button overlay */}
      <div
        className="absolute top-2 left-2 z-30 flex justify-center items-center w-[15%] rounded-[50px] bg-black text-gray-500 hover:text-white transition-colors cursor-pointer"
        onClick={handleShareClick}
      >
        <IconContext.Provider value={{className: 'size-full p-3'}}>
          <FiShare2 />
        </IconContext.Provider>
      </div>
    </div>
  )
}
