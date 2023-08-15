import {defineConfig} from 'sanity/lib/exports'
import {deskTool} from 'sanity/desk'
import {visionTool} from './node_modules/@sanity/vision'

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
// C:\Users\nelis\Documents\Syntra\Final_Project\portfolio\sanity\node_modules\@sanity\vision
