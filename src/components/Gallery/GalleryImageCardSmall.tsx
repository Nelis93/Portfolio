import {motion} from 'framer-motion'
import {GalleryImage} from '../../types'
import {urlFor} from '../../lib/sanity'
import {FiShare2} from 'react-icons/fi'
import {IconContext} from 'react-icons'

type Props = {
  image: GalleryImage
  uniqueId: number
  setSelected: any
}

export default function GalleryImageCardSmall({image, uniqueId, setSelected}: Props) {
  const handleCardClick = (event: any) => {
    event.stopPropagation()
    setSelected(uniqueId)
  }

  const handleShareClick = (event: any) => {
    event.stopPropagation()
    const shareUrl = `${window.location.origin}${window.location.pathname}?itemId=${image._id}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!')
    })
  }

  return (
    <div key={image._id} className="group relative w-full h-full" onClick={handleCardClick}>
      {/* Front side of the card: Image */}
      <motion.img
        className="relative z-20 w-full h-auto rounded-lg"
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
      />
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
