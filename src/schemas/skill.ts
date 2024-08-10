// import {defineField, defineType} from 'sanity/lib/exports'
// import {defineField, defineType} from 'sanity'
import { defineField, defineType } from "@sanity/types";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Title of skill",
      type: "string",
    }),
    defineField({
      name: "progress",
      title: "Progress",
      type: "number",
      description: "Progress of skill from 0 to 100%",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "webdev",
      title: "Webdev",
      type: "boolean",
    }),
  ],
});
