// import {defineField, defineType} from 'sanity/lib/exports'
// import {defineField, defineType} from 'sanity'
// import { defineField, defineType } from "sa";
import { defineField, defineType } from "@sanity/types";

export default defineType({
  name: "social",
  title: "Social",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "platform for social media",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Url",
      type: "url",
    }),
  ],
});