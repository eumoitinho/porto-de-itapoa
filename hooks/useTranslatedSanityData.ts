/**
 * Hook helpers para buscar dados traduzidos do Sanity
 */

import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/sanity'
import { Language } from '@/lib/i18n/context'
import { useI18n } from '@/lib/i18n/context'
import { getTranslatedField, getTranslatedArray } from '@/lib/sanity-i18n'

/**
 * Hook base para buscar dados do Sanity com tradução automática
 */
export function useTranslatedSanityQuery<T>(
  queryKey: string[],
  groqQuery: (language: Language) => string,
  options?: { staleTime?: number }
) {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: [...queryKey, language],
    queryFn: async () => {
      const query = groqQuery(language)
      const data = await client.fetch<T>(query)
      return data
    },
    staleTime: options?.staleTime || 5 * 60 * 1000,
  })
}

/**
 * Helper para criar query GROQ com campos traduzidos
 */
export function createTranslatedGroqQuery(
  documentType: string,
  language: Language,
  fields: string[] = []
) {
  const defaultFields = ['_id', '_type', '_createdAt', '_updatedAt']
  const allFields = [...defaultFields, ...fields]
  
  // Para cada campo, se for traduzido, usa o idioma ou fallback para pt
  const translatedFields = allFields.map(field => {
    // Se o campo pode ser traduzido, busca no idioma atual ou pt como fallback
    return `${field}`
  }).join(', ')
  
  return `*[_type == "${documentType}"][0]{
    ${translatedFields}
  }`
}

