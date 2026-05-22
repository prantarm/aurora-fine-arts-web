import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './schemaTypes/heroType'
import { servicesType } from './schemaTypes/servicesType'
import { machineryType } from './schemaTypes/machineryType'
import { quoteRequestType } from './schemaTypes/quoteRequest'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroType, servicesType, machineryType, quoteRequestType],
}
