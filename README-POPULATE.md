# Script de População do Sanity

## ⚠️ IMPORTANTE: Configurar Variáveis de Ambiente

Antes de executar o script, certifique-se de ter um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-token-aqui
```

## Como obter as credenciais:

1. **Project ID**: Acesse https://sanity.io/manage e copie o Project ID do seu projeto
2. **Dataset**: Geralmente é `production` ou `development`
3. **API Token**: 
   - Vá em Settings > API > Tokens
   - Crie um novo token com permissões de escrita (Editor)

## Executar o script:

```bash
npm run populate-sanity
```

Ou diretamente:

```bash
npx tsx scripts/populate-sanity.ts
```

## O que o script faz:

O script popula o Sanity com dados iniciais em **4 idiomas** (pt, en, es, zh) para:

- ✅ Porto Itapoá (História, Linha do Tempo, Localização)
- ✅ Acionistas (Estrutura acionária, Governança)
- ✅ Certificações
- ✅ Premiações
- ✅ Programação de Navios
- ✅ Portal de Compras
- ✅ Tabela de Preços

## Notas:

- Se um documento já existir, ele será **atualizado**
- Se não existir, será **criado**
- O script é **idempotente** - pode ser executado múltiplas vezes com segurança

