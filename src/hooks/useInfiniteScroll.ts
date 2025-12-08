import {useCallback} from 'react'
import debounce from '@/utils/debounce'

export const useInfiniteScroll = <T>(
  loading: boolean,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setDisplayedImages: React.Dispatch<React.SetStateAction<T[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  // filteredImages: () => T[],
  filteredImages: any[],
) => {
  const loadMoreImages = useCallback(
    debounce((event: any) => {
      const distanceFromTop = event.target.clientHeight + event.target.scrollTop
      if (distanceFromTop > event.target.scrollHeight - 100) {
        if (loading) return
        // edit by claude
        // const nextImages = filteredImages().slice(page * 9, (page + 1) * 9)
        // end edit by claude
        const nextImages = filteredImages.slice(page * 9, (page + 1) * 9)

        if (nextImages.length > 0) {
          setDisplayedImages((prev) => [...prev, ...nextImages])
          setPage((prev) => prev + 1)
        }
        setLoading(true)
      }
    }, 250),
    [loading, page, filteredImages],
  )

  return loadMoreImages
}
