import {motion} from 'framer-motion'
import {GalleryImage} from '../../types'
import {urlFor} from '../../lib/sanity'

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

  return (
    <div key={image._id} className="group relative w-full h-full" onClick={handleCardClick}>
      {/* Front side of the card: Image */}
      <motion.img
        className="relative z-20 w-full h-auto rounded-lg"
        src={urlFor(image.actualImage)?.url()}
        alt={image.title}
      />
    </div>
  )
}
