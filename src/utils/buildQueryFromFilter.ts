/**
 * Builds a query object from the given filter.
 * @param filter - The filter object containing countries and dates.
 * @returns A query object with countries and dates as strings.
 */
export const buildQueryFromFilter = (filter: {countries: string[]; dates: string[]}) => {
  const query: Record<string, string> = {}
  if (filter.countries?.length) query.countries = filter.countries.join('-')
  if (filter.dates?.length) query.dates = filter.dates.join('-')
  return query
}
