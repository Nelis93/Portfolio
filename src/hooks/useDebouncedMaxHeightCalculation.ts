import {useEffect} from 'react'
import debounce from '@/utils/debounce'

export const useDebouncedMaxHeightCalculation = (
  loading: boolean,
  displayedImages: any[],
  setMaxHeight: React.Dispatch<React.SetStateAction<{id: string; value: number}[]>>,
  setLoading: (value: boolean) => void,
) => {
  const debounceMaxHeightCalculation = debounce(() => {
    setMaxHeight((prevMaxHeight) => {
      const newMaxArray: {id: string; value: number}[] = []
      for (let i = 0; i < displayedImages.length; i += 3) {
        const triplet = displayedImages.slice(i, i + 3)
        const heights = triplet.map((img) => {
          const found = prevMaxHeight.find((item) => item.id === img._id)
          return found ? found.value : undefined
        })
        if (heights.every((h) => typeof h === 'number')) {
          const maxTripletHeight = Math.max(...heights)
          triplet.forEach((img) => {
            newMaxArray.push({id: img._id, value: maxTripletHeight})
          })
        } else {
          triplet.forEach((img) => {
            newMaxArray.push({id: img._id, value: 0})
          })
        }
      }
      return newMaxArray
    })
    setLoading(false)
  }, 300)

  useEffect(() => {
    if (loading) {
      debounceMaxHeightCalculation()
    }
  }, [loading])
}
