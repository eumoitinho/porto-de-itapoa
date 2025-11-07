/**
 * Helpers para campos de internacionalização no Sanity
 */

export const languages = [
  { id: 'pt', title: 'Português', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Español' },
  { id: 'zh', title: '中文 (简体)' },
]

export const defaultLanguage = 'pt'

/**
 * Cria um campo traduzido (string)
 */
export const localizedString = (name: string, title: string, options: any = {}) => ({
  name,
  title,
  type: 'object',
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'string',
    ...(lang.isDefault ? { validation: (Rule: any) => Rule.required() } : {}),
  })),
  options: {
    ...options,
  },
})

/**
 * Cria um campo traduzido (text)
 */
export const localizedText = (name: string, title: string, options: any = {}) => ({
  name,
  title,
  type: 'object',
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'text',
    ...(lang.isDefault ? { validation: (Rule: any) => Rule.required() } : {}),
  })),
  options: {
    ...options,
  },
})

/**
 * Cria um campo traduzido (array de blocks - PortableText)
 */
export const localizedBlockContent = (name: string, title: string, options: any = {}) => ({
  name,
  title,
  type: 'object',
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: [{ type: 'block' }],
    ...(lang.isDefault ? { validation: (Rule: any) => Rule.required() } : {}),
  })),
  options: {
    ...options,
  },
})

/**
 * Helper para criar array traduzido de objetos
 */
export const localizedArray = (name: string, title: string, ofType: any[]) => ({
  name,
  title,
  type: 'object',
  fields: languages.map((lang) => ({
    name: lang.id,
    title: lang.title,
    type: 'array',
    of: ofType,
    ...(lang.isDefault ? { validation: (Rule: any) => Rule.required() } : {}),
  })),
})

