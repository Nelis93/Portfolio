import {groq} from 'next-sanity'
import {sanityClient} from '../lib/sanity'
import {LogbookEntry} from '../../typings'

const query = groq`
    *[_type == "logbookEntry"]
`
export const fetchLogbookEntries = async () => {
  const logbookEntries: LogbookEntry[] = await sanityClient.fetch(query)
  return logbookEntries
}
