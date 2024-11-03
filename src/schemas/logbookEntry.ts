// import { defineField, defineType } from "../../node_modules/sanity";
import { defineField, defineType } from "@sanity/types";

export default defineType({
  name: "logbookEntry",
  title: "logbookEntry",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "entry",
      title: "Entry",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "number",
    }),
  ],
});
