const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const fullPath = path.resolve(p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
};

write('src/sanity/env.ts', `
export const apiVersion = '2024-05-22'
export const dataset = 'production'
export const projectId = 'nnaztfc9'
export const useCdn = false
`);

write('src/sanity/lib/client.ts', `
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})
`);

write('src/sanity/lib/image.ts', `
import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
`);

write('src/sanity/schemaTypes/heroType.ts', `
import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
`);

write('src/sanity/schemaTypes/servicesType.ts', `
import { defineField, defineType } from 'sanity'

export const servicesType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (SVG/Text)',
      type: 'string',
    }),
    defineField({
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
`);

write('src/sanity/schemaTypes/machineryType.ts', `
import { defineField, defineType } from 'sanity'

export const machineryType = defineType({
  name: 'machinery',
  title: 'Machinery',
  type: 'document',
  fields: [
    defineField({
      name: 'pressName',
      title: 'Press Name',
      type: 'string',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
    }),
    defineField({
      name: 'technicalSpecs',
      title: 'Technical Specs',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'placeholderImage',
      title: 'Placeholder Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
`);

write('src/sanity/schema.ts', `
import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './schemaTypes/heroType'
import { servicesType } from './schemaTypes/servicesType'
import { machineryType } from './schemaTypes/machineryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, servicesType, machineryType],
}
`);

write('sanity.config.ts', `
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
`);

write('sanity.cli.ts', `
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'nnaztfc9',
    dataset: 'production'
  }
})
`);

write('src/app/studio/[[...tool]]/page.tsx', `
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
export { viewport, metadata } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
`);

console.log("Sanity files generated.");
