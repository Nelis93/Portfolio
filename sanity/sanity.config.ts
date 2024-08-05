//the problem with the import of defineConfig seems to be twofold
//importing it from 'sanity' leads to Vercel throwing << Module '"sanity"' has no exported member 'defineConfig' >> on deploy, whilst Sanity Studio will work fine
//Solution offered on stackoverflow is import as done below, which leads Sanity Studio to throw << [plugin:vite:import-analysis] Missing "./lib/exports" specifier in "sanity" package >> but the Vercel deploy will work without issue
//Solution offered on stackoverflow for this is import from 'sanity'

// import {  } from "sanity/lib/exports";
import { defineConfig } from "../node_modules/sanity";
// import { deskTool } from "sanity/desk";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Sanity",

  projectId: "pdxb9c80",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
// C:\Users\nelis\Documents\Syntra\Final_Project\portfolio\sanity\node_modules\@sanity\vision
