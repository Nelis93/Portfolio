import {defineField, defineType} from '@sanity/types'

export default defineType({
  name: 'galleryVideo',
  title: 'Gallery Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'muxVideoId',
      title: 'Mux Video ID',
      type: 'string',
      description: 'The unique identifier of the video in Mux (e.g., "mux_video_id")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'muxPlaybackId',
      title: 'Mux Playback ID',
      type: 'string',
      description: 'The public playback ID for streaming the video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Video thumbnail (optional - Mux can generate this)',
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
      title: 'Related Logbook Entry',
      type: 'reference',
      to: [{type: 'logbookEntry'}],
    }),
    defineField({
      name: 'peopleInVideo',
      title: 'People',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'Video duration in seconds (automatically set by Mux)',
    }),
  ],
})
