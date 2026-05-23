import {buildQueryFromFilter} from './buildQueryFromFilter'

/**
 * Builds the full gallery URL query (filters + optional shared item slug).
 */
export const buildGalleryQuery = (
  filter: {countries: string[]; dates: string[]},
  item?: string | null,
): Record<string, string> => {
  const query = buildQueryFromFilter(filter)
  if (item) {
    query.item = item
  }
  return query
}

export const buildGalleryShareUrl = (slug: string): string => {
  const encoded = encodeURIComponent(slug)
  if (typeof window === 'undefined') {
    return `/gallery?item=${encoded}`
  }
  return `${window.location.origin}/gallery?item=${encoded}`
}

export const copyGalleryShareLink = async (
  slug: string,
  onCopied?: () => void,
): Promise<void> => {
  await navigator.clipboard.writeText(buildGalleryShareUrl(slug))
  onCopied?.()
}

/** Reads ?item=slug from the URL, with legacy ?itemId= support for old links. */
export const getShareKeyFromQuery = (query: Record<string, string | string[] | undefined>) => {
  if (typeof query.item === 'string') return query.item
  if (typeof query.itemId === 'string') return query.itemId
  return undefined
}
