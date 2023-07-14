import {defineConfig} from '../sanity/node_modules/sanity/lib/exports/index'
import {deskTool} from '../sanity/node_modules/sanity/lib/exports/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Sanity',

  projectId: 'pdxb9c80',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
