# Porto Itapoá - CMS com Sanity

Este projeto integra o Sanity CMS ao site do Porto Itapoá, permitindo que o conteúdo da homepage seja editável através de uma interface administrativa.

## 🚀 Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-api-token
```

### 2. Criar Projeto no Sanity

1. Acesse [sanity.io](https://sanity.io)
2. Crie uma nova conta ou faça login
3. Crie um novo projeto
4. Copie o Project ID e configure no arquivo `.env.local`

### 3. Instalar Dependências

```bash
npm install
```

### 4. Executar o Projeto

```bash
npm run dev
```

## 📝 Acessando o CMS

Após configurar o projeto, você pode acessar o Sanity Studio em:

```
http://localhost:3000/studio
```

## 🏗️ Estrutura do CMS

O CMS está organizado nas seguintes seções editáveis:

### Homepage
- Título principal
- Subtítulo
- Imagem/vídeo do hero
- Textos dos botões CTA

### Estatísticas
- Título da seção
- Descrição
- Lista de estatísticas (valor, rótulo, descrição)

### Terminal
- Título
- Descrição principal
- Descrição adicional
- Missão, Visão e Valores

### Serviços Marítimos
- Título da seção
- Descrição
- Lista de serviços por região
- Texto do botão CTA

### Outros Serviços
- Título da seção
- Descrição
- Lista de serviços com ícones e links

### Por que Escolher
- Título da seção
- Descrição
- Lista de benefícios
- Texto do botão CTA

### Sustentabilidade
- Título
- Descrição
- Texto do botão CTA

### Contato
- Título
- Descrição
- Endereço, telefone, e-mail
- Textos dos botões

## 🔧 Funcionalidades

- **Fallbacks**: Se não houver dados no Sanity, o site usa conteúdo padrão
- **Cache**: Os dados são cacheados por 5 minutos para melhor performance
- **Responsivo**: Interface administrativa funciona em desktop e mobile
- **Validação**: Campos obrigatórios são validados no CMS

## 📱 Como Editar Conteúdo

1. Acesse `/studio` no seu site
2. Faça login com suas credenciais do Sanity
3. Selecione a seção que deseja editar
4. Faça as alterações necessárias
5. Clique em "Publish" para salvar
6. As alterações aparecerão automaticamente no site

## 🚀 Deploy

Para fazer deploy do Sanity Studio:

```bash
cd sanity
npm run deploy
```

Isso criará uma URL pública para o seu CMS que pode ser compartilhada com outros editores.

## 📚 Documentação

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
