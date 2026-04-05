import {GalleryImage, GalleryVideo} from '../types'

/**
 * Type guards for distinguishing between images and videos
 */

export const isGalleryImage = (item: GalleryImage | GalleryVideo): item is GalleryImage => {
  return item._type === 'galleryImage'
}

export const isGalleryVideo = (item: GalleryImage | GalleryVideo): item is GalleryVideo => {
  return item._type === 'galleryVideo'
}

/**
 * Combine and sort gallery items (images and videos) by date
 */
export const combineGalleryItems = (
  images: GalleryImage[],
  videos: GalleryVideo[],
): (GalleryImage | GalleryVideo)[] => {
  return [...images, ...videos].sort((a, b) => {
    const dateA = new Date(a.dateTaken).getTime()
    const dateB = new Date(b.dateTaken).getTime()
    return dateB - dateA
  })
}

/**
 * Filter gallery items (images and videos) by location and date
 */
export const filterGalleryItems = (
  items: (GalleryImage | GalleryVideo)[],
  selectedFilter: {countries: string[]; dates: string[]},
): (GalleryImage | GalleryVideo)[] => {
  return items
    .filter((item) => {
      const countries = selectedFilter?.countries
      if (countries.length === 0) return true
      let locationParts = item.location.split(' ')
      return countries.includes(locationParts[locationParts.length - 1])
    })
    .filter((item) => {
      const dates = selectedFilter?.dates
      if (dates.length === 0) return true
      return dates.includes(item?.dateTaken?.toString().split('-')[0])
    })
}
