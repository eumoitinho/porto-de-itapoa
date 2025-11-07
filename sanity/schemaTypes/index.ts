import { type SchemaTypeDefinition } from 'sanity'
import { schemaTypes as sanitySchemas } from '../schemas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: sanitySchemas,
}
