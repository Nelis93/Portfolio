import {groq} from 'next-sanity'
import {sanityClient} from '../lib/sanity'
import {Skill} from '../../typings'

const query = groq`
    *[_type == "skill"]
`

export const fetchSkills = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`);
  // const data = await res.json();
  // const skills: Skill[] = data.skills;
  const skills: Skill[] = await sanityClient.fetch(query)
  return skills
}
