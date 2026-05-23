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
      name: 'customMuxThumbnailUrl',
      title: 'Custom Mux Thumbnail URL',
      type: 'string',
      description:
        'Paste a Mux thumbnail URL directly (e.g., with GIF format or custom time/dimensions). Takes precedence over image thumbnail.',
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
      title: 'Friends',
      type: 'array',
      of: [{type: 'reference', to: {type: 'friend'}}],
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'Video duration in seconds (automatically set by Mux)',
    }),
  ],
})
