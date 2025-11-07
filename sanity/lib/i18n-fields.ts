/**
 * Helpers para criar campos de internacionalização no Sanity
 * Usa a estrutura padrão do Sanity para objetos aninhados
 */

import { defineField, defineType } from 'sanity'

/**
 * Cria um campo de string traduzido
 */
export function createLocalizedStringField(name: string, title: string, options: any = {}) {
  return {
    name,
    title,
    type: 'object',
    fieldsets: [
      {
        name: 'translations',
        title: 'Traduções',
        options: { collapsible: true, collapsed: false },
      },
    ],
    fields: [
      {
        name: 'pt',
        title: 'Português',
        type: 'string',
        fieldset: 'translations',
        validation: (Rule: any) => Rule.required(),
        ...options.pt,
      },
      {
        name: 'en',
        title: 'English',
        type: 'string',
        fieldset: 'translations',
        ...options.en,
      },
      {
        name: 'es',
        title: 'Español',
        type: 'string',
        fieldset: 'translations',
        ...options.es,
      },
      {
        name: 'zh',
        title: '中文 (简体)',
        type: 'string',
        fieldset: 'translations',
        ...options.zh,
      },
    ],
    preview: {
      select: {
        title: 'pt',
        subtitle: 'en',
      },
    },
  }
}

/**
 * Cria um campo de texto traduzido
 */
export function createLocalizedTextField(name: string, title: string, options: any = {}) {
  return {
    name,
    title,
    type: 'object',
    fieldsets: [
      {
        name: 'translations',
        title: 'Traduções',
        options: { collapsible: true, collapsed: false },
      },
    ],
    fields: [
      {
        name: 'pt',
        title: 'Português',
        type: 'text',
        fieldset: 'translations',
        validation: (Rule: any) => Rule.required(),
        ...options.pt,
      },
      {
        name: 'en',
        title: 'English',
        type: 'text',
        fieldset: 'translations',
        ...options.en,
      },
      {
        name: 'es',
        title: 'Español',
        type: 'text',
        fieldset: 'translations',
        ...options.es,
      },
      {
        name: 'zh',
        title: '中文 (简体)',
        type: 'text',
        fieldset: 'translations',
        ...options.zh,
      },
    ],
    preview: {
      select: {
        title: 'pt',
        subtitle: 'en',
      },
    },
  }
}

/**
 * Cria um campo de conteúdo PortableText traduzido
 */
export function createLocalizedBlockContentField(name: string, title: string, options: any = {}) {
  return {
    name,
    title,
    type: 'object',
    fieldsets: [
      {
        name: 'translations',
        title: 'Traduções',
        options: { collapsible: true, collapsed: false },
      },
    ],
    fields: [
      {
        name: 'pt',
        title: 'Português',
        type: 'array',
        of: [{ type: 'block' }],
        fieldset: 'translations',
        validation: (Rule: any) => Rule.required(),
        ...options.pt,
      },
      {
        name: 'en',
        title: 'English',
        type: 'array',
        of: [{ type: 'block' }],
        fieldset: 'translations',
        ...options.en,
      },
      {
        name: 'es',
        title: 'Español',
        type: 'array',
        of: [{ type: 'block' }],
        fieldset: 'translations',
        ...options.es,
      },
      {
        name: 'zh',
        title: '中文 (简体)',
        type: 'array',
        of: [{ type: 'block' }],
        fieldset: 'translations',
        ...options.zh,
      },
    ],
    preview: {
      select: {
        title: 'pt',
        subtitle: 'en',
      },
    },
  }
}

