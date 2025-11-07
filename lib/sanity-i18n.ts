/**
 * Utilities para trabalhar com dados traduzidos do Sanity
 */

import { Language } from './i18n/context'

/**
 * Acessa um campo traduzido do Sanity baseado no idioma atual
 * @param field - Campo traduzido (objeto com pt, en, es, zh)
 * @param language - Idioma atual
 * @param fallback - Valor de fallback se não encontrar tradução
 */
export function getTranslatedField<T = string>(
  field: { [key: string]: T } | T | null | undefined,
  language: Language,
  fallback?: T
): T | undefined {
  if (!field) return fallback
  
  // Se é um objeto com idiomas
  if (typeof field === 'object' && !Array.isArray(field) && 'pt' in field) {
    const translatedField = field as { [key in Language]?: T }
    return translatedField[language] || translatedField.pt || fallback
  }
  
  // Se já é o valor direto (string simples, etc)
  return field as T
}

/**
 * Acessa um array traduzido do Sanity
 */
export function getTranslatedArray<T>(
  field: { [key: string]: T[] } | T[] | null | undefined,
  language: Language,
  fallback: T[] = []
): T[] {
  if (!field) return fallback
  
  // Se é um objeto com idiomas
  if (typeof field === 'object' && !Array.isArray(field) && 'pt' in field) {
    const translatedField = field as { [key in Language]?: T[] }
    return translatedField[language] || translatedField.pt || fallback
  }
  
  // Se já é um array direto
  if (Array.isArray(field)) {
    return field
  }
  
  return fallback
}

/**
 * Helper para criar query GROQ que busca campos traduzidos
 */
export function getTranslatedGroqField(fieldName: string, language: Language = 'pt'): string {
  return `${fieldName}.${language} ?? ${fieldName}.pt ?? ${fieldName}`
}

/**
 * Helper para criar query GROQ que busca array traduzido
 */
export function getTranslatedGroqArray(fieldName: string, language: Language = 'pt'): string {
  return `${fieldName}.${language} ?? ${fieldName}.pt ?? []`
}

