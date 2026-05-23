import {buildQueryFromFilter} from './buildQueryFromFilter'

/**
 * Builds the full gallery URL query (filters + optional shared item).
 */
export const buildGalleryQuery = (
  filter: {countries: string[]; dates: string[]},
  itemId?: string | null,
): Record<string, string> => {
  const query = buildQueryFromFilter(filter)
  if (itemId) {
    query.itemId = itemId
  }
  return query
}

export const buildGalleryShareUrl = (itemId: string): string => {
  if (typeof window === 'undefined') {
    return `/gallery?itemId=${itemId}`
  }
  return `${window.location.origin}/gallery?itemId=${itemId}`
}

export const copyGalleryShareLink = async (
  itemId: string,
  onCopied?: () => void,
): Promise<void> => {
  await navigator.clipboard.writeText(buildGalleryShareUrl(itemId))
  onCopied?.()
}
