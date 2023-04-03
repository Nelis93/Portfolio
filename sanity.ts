import { createClient } from "../portfolio/node_modules/next-sanity";
import createImageUrlBuilder from "../portfolio/node_modules/@sanity/image-url";

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pdxb9c80",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2022-11-16",
  useCdn: process.env.NODE_ENV === "production",
};

// set up the client for fetching data in the getProps page funcitons
export const sanityClient = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
