// import { defineField, defineType } from "../../node_modules/sanity";
import { defineField, defineType, defineArrayMember } from "@sanity/types";
import { EnterIcon } from "@sanity/icons";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "logbookEntry",
  title: "LogbookEntry",
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
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              {
                title: "Break",
                value: "break",
                icon: EnterIcon,
              },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                icon: LinkIcon,
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          name: "image",
          title: "Image",
        }),
      ],
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "number",
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
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    }),
  ],
});
