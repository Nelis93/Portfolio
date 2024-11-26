// import { defineField, defineType } from "../../node_modules/sanity";
import { defineField, defineType } from "@sanity/types";

// const HighlightIcon = () => (
//   <span style={{ fontWeight: 'bold' }}>H</span>
// )
// const HighlightDecorator = props => (
//   <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
// )

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
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [
                      { type: "image" },
                      // other types you may want to link to
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
        },
      ],
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "number",
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
