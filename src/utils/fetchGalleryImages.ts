import {groq} from 'next-sanity'
import {sanityClient} from '../lib/sanity'
import {GalleryImage} from '../../typings'

const query = groq`
    *[_type == "galleryImage"]
`
export const fetchGalleryImages = async () => {
  const galleryImages: GalleryImage[] = await sanityClient.fetch(query)
  return galleryImages
}
