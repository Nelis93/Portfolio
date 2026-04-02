import {groq} from 'next-sanity'
import {sanityClient} from '../lib/sanity'
import {GalleryVideo} from '../types'

const query = groq`
    *[_type == "galleryVideo"]
`

export const fetchGalleryVideos = async () => {
  try {
    const galleryVideos: GalleryVideo[] = await sanityClient.fetch(query)
    return galleryVideos
  } catch (error) {
    console.error('Failed to fetch gallery videos:', error)
    throw error
  }
}

// Fetch a single video by ID
export const fetchGalleryVideoById = async (id: string) => {
  const query = groq`
    *[_type == "galleryVideo" && _id == $id][0]
  `

  try {
    const video: GalleryVideo = await sanityClient.fetch(query, {id})
    return video
  } catch (error) {
    console.error(`Failed to fetch gallery video with ID ${id}:`, error)
    throw error
  }
}

// Fetch videos by location
export const fetchGalleryVideosByLocation = async (location: string) => {
  const query = groq`
    *[_type == "galleryVideo" && location == $location]
  `

  try {
    const videos: GalleryVideo[] = await sanityClient.fetch(query, {location})
    return videos
  } catch (error) {
    console.error(`Failed to fetch gallery videos from location ${location}:`, error)
    throw error
  }
}

// Fetch videos by year
export const fetchGalleryVideosByYear = async (year: number) => {
  const query = groq`
    *[_type == "galleryVideo" && dateTime(dateTaken) >= dateTime($startOfYear) && dateTime(dateTaken) < dateTime($startOfNextYear)]
  `

  try {
    const videos: GalleryVideo[] = await sanityClient.fetch(query, {
      startOfYear: `${year}-01-01T00:00:00Z`,
      startOfNextYear: `${year + 1}-01-01T00:00:00Z`,
    })
    return videos
  } catch (error) {
    console.error(`Failed to fetch gallery videos from year ${year}:`, error)
    throw error
  }
}
