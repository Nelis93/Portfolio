/**
 * Matches the slugify logic used in Sanity schemas (e.g. logbookEntry).
 */
export function slugifyTitle(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200)
}

export function slugifyTitleOrFallback(title: string | undefined, id: string): string {
  if (title) {
    const slug = slugifyTitle(title)
    if (slug) return slug
  }
  return `item-${id.replace(/[^a-z0-9]/gi, '').slice(-8).toLowerCase()}`
}
