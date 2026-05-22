import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schema} from './src/sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId: 'nnaztfc9',
  dataset: 'production',
  title: 'Aurora Fine Arts Studio',
  schema,
  plugins: [structureTool()],
})
