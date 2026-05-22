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
