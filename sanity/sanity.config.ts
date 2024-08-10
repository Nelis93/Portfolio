import {defineConfig} from '../node_modules/sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '../src/schemas'

export default defineConfig({
  name: 'default',
  title: 'Sanity',

  projectId: 'pdxb9c80',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
