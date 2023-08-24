// import { Experience } from "../../typings";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { Experience } from "../../typings";

const query = groq`
    *[_type == "experience"] {
        ...,
        technologies[]->
    }
`;
export const fetchExperiences = async () => {
  //Thanks to the help of icyJoseph (vercel) I found out that the sanity api is a feature that inhibits the build in Vercel. The data should be fetched directly from Sanity via the groq query language, using sanityClient(query)
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/getExperience`
  // );
  // const data = await res.json();
  // const experiences: Experience[] = data.experiences;
  const experiences: Experience[] = await sanityClient.fetch(query);
  // console.log(experiences);
  return experiences;
};
//Old code

// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   experiences: Experience[];
// };
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ experiences });
// }
