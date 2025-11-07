# Scripts de População do Sanity

Scripts para popular o Sanity CMS com dados iniciais para as páginas do site.

## Pré-requisitos

1. Configure as variáveis de ambiente no arquivo `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=seu-token-de-escrita
   ```

2. Para obter o token de escrita:
   - Acesse https://sanity.io/manage
   - Selecione seu projeto
   - Vá em "API" > "Tokens"
   - Crie um novo token com permissões de escrita

## Como Executar

### Opção 1: Executar todos os scripts
```bash
npx ts-node scripts/populate-sanity.ts
```

### Opção 2: Executar scripts individuais
```typescript
import { populatePortoItapoa } from './scripts/populate-sanity'

populatePortoItapoa()
```

## Scripts Disponíveis

- `populatePortoItapoa()` - Popula dados do Porto Itapoá (História, Linha do Tempo, Localização)
- `populateAcionistas()` - Popula dados de Acionistas (Estrutura acionária e governança)
- `populateCertificacoes()` - Popula dados de Certificações
- `populatePremiacoes()` - Popula dados de Premiações
- `populateProgramacaoNavios()` - Popula dados de Programação de Navios
- `populatePortalCompras()` - Popula dados do Portal de Compras
- `populateTabelaPrecos()` - Popula dados da Tabela de Preços
- `populateAll()` - Executa todos os scripts acima

## Notas

- Os scripts usam `createOrReplace`, então podem ser executados múltiplas vezes sem duplicar dados
- Certifique-se de ter permissões de escrita no dataset do Sanity
- Os dados são apenas exemplos iniciais - edite no Sanity Studio conforme necessário

