import {defineField, defineType} from '@sanity/types'

export default defineType({
  name: 'friend',
  title: 'Friend',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
