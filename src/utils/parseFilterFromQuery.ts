export const parseFilterFromQuery = (query: any) => {
  const countriesRaw = query?.countries
  const datesRaw = query?.dates
  const countries =
    typeof countriesRaw === 'string'
      ? countriesRaw.split('-').filter(Boolean)
      : Array.isArray(countriesRaw)
        ? countriesRaw.join('-').split('-').filter(Boolean)
        : []
  const dates =
    typeof datesRaw === 'string'
      ? datesRaw.split('-').filter(Boolean)
      : Array.isArray(datesRaw)
        ? datesRaw.join('-').split('-').filter(Boolean)
        : []
  return {countries, dates}
}
