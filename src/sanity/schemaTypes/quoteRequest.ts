import { defineField, defineType } from 'sanity'

export const quoteRequestType = defineType({
  name: 'quoteRequest',
  title: 'Quote Requests',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    }),
    defineField({
      name: 'paperGsm',
      title: 'Paper GSM',
      type: 'string',
    }),
    defineField({
      name: 'colorSpace',
      title: 'Color Space',
      type: 'string',
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Lead Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'New' },
          { title: 'Reviewed', value: 'Reviewed' },
          { title: 'Contacted', value: 'Contacted' },
        ],
      },
      initialValue: 'New',
    }),
  ],
})
