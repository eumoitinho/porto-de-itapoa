    # Guia de Internacionalização (i18n) no Sanity

## Estrutura de Dados Traduzidos

Todos os campos que precisam ser traduzidos seguem a estrutura:

```typescript
{
  pt: "Texto em Português",
  en: "Text in English", 
  es: "Texto en Español",
  zh: "中文文本"
}
```

## Padrão de Schema

Para campos de string/texto simples:
```typescript
createLocalizedStringField('fieldName', 'Display Name')
createLocalizedTextField('fieldName', 'Display Name')
createLocalizedBlockContentField('fieldName', 'Display Name')
```

Para arrays com itens traduzidos, cada item tem seus próprios campos traduzidos:
```typescript
{
  name: 'items',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      createLocalizedStringField('title', 'Title'),
      createLocalizedTextField('description', 'Description'),
      // campos não traduzidos
      { name: 'date', type: 'date' }
    ]
  }]
}
```

## Uso nos Hooks

Os hooks usam a função `getTranslatedField` para acessar o campo no idioma correto:

```typescript
const { language } = useI18n()
const title = getTranslatedField(data.title, language, 'Fallback')
```

## Queries GROQ

Para queries GROQ, use:
```groq
"title": title.${language} ?? title.pt ?? title
```

Isso busca no idioma atual, depois português como fallback, depois o campo direto.

