import { defineConfig } from "./node_modules/sanity/lib/exports/index";
import { deskTool } from "sanity/desk";
import { visionTool } from "./sanity/node_modules/@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Sanity",

  projectId: "pdxb9c80",
  dataset: "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
