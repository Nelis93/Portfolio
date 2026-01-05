import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {buildQueryFromFilter} from '@/utils/buildQueryFromFilter'
import {parseFilterFromQuery} from '@/utils/parseFilterFromQuery'

export const useFilterSync = (
  selectedFilter: {countries: string[]; dates: string[]},
  setSelectedFilter: (filter: {countries: string[]; dates: string[]}) => void,
) => {
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return
    const parsed = parseFilterFromQuery(router.query)
    const same =
      parsed.countries.join('-') === selectedFilter.countries.join('-') &&
      parsed.dates.join('-') === selectedFilter.dates.join('-')
    if (!same) {
      setSelectedFilter(parsed)
    }
  }, [router.isReady])

  useEffect(() => {
    if (!router.isReady) return
    const query = buildQueryFromFilter(selectedFilter)
    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      {shallow: true},
    )
  }, [selectedFilter])
}
