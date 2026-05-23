import {defineField, defineType} from '@sanity/types'

export default defineType({
  name: 'galleryImage',
  title: 'GalleryImage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 200),
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'actualImage',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'linkToPost',
      title: 'LinkToPost',
      type: 'reference',
      to: {type: 'logbookEntry'},
    }),
    defineField({
      name: 'peopleInPicture',
      title: 'Friends',
      type: 'array',
      of: [{type: 'reference', to: {type: 'friend'}}],
    }),
  ],
})
