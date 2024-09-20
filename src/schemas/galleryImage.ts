import { defineField, defineType } from "@sanity/types";

export default defineType({
  name: "galleryImage",
  title: "GalleryImage",
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
      type: "text",
    }),
    defineField({
      name: "actualImage",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "dateTaken",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "peopleInPicture",
      title: "Friends",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
