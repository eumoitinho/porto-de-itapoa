import { defineType } from 'sanity'
import { createLocalizedStringField, createLocalizedTextField, createLocalizedBlockContentField } from '../lib/i18n-fields'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Imagem do Hero',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroVideo',
      title: 'Vídeo do Hero',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'ctaButtonText',
      title: 'Texto do Botão CTA',
      type: 'string',
      initialValue: 'CONHEÇA NOSSOS SERVIÇOS',
    },
    {
      name: 'ctaButtonLink',
      title: 'Link do Botão CTA',
      type: 'string',
      initialValue: '/servicos',
    },
  ],
})

export const stats = defineType({
  name: 'stats',
  title: 'Estatísticas',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Números que Impressionam',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      initialValue: 'Conheça os números que fazem do Porto Itapoá um dos terminais mais eficientes do Brasil',
    },
    {
      name: 'statistics',
      title: 'Estatísticas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Valor',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
})

export const terminal = defineType({
  name: 'terminal',
  title: 'Terminal',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'O Terminal',
    },
    {
      name: 'description',
      title: 'Descrição Principal',
      type: 'text',
    },
    {
      name: 'additionalDescription',
      title: 'Descrição Adicional',
      type: 'text',
    },
    {
      name: 'mission',
      title: 'Missão',
      type: 'text',
    },
    {
      name: 'vision',
      title: 'Visão',
      type: 'text',
    },
    {
      name: 'values',
      title: 'Valores',
      type: 'text',
    },
  ],
})

export const maritimeServices = defineType({
  name: 'maritimeServices',
  title: 'Serviços Marítimos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Serviços Marítimos Regulares',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      initialValue: 'Conecte-se a todos os continentes com rotas de longo curso e cabotagem.',
    },
    {
      name: 'services',
      title: 'Serviços',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'routes',
              title: 'Número de Rotas',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'carriers',
              title: 'Armadores',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
    {
      name: 'ctaButtonText',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'VER PORTFÓLIO COMPLETO!',
    },
    {
      name: 'ctaButtonLink',
      title: 'Link do Botão',
      type: 'string',
      initialValue: '/portfolio',
    },
  ],
})

export const otherServices = defineType({
  name: 'otherServices',
  title: 'Outros Serviços',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Outros serviços',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      initialValue: 'O Porto de Itapoá oferece soluções logísticas locais e globais que impulsionam empresas de todos os portes.',
    },
    {
      name: 'services',
      title: 'Serviços',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  { title: 'Calendar', value: 'Calendar' },
                  { title: 'ShoppingCart', value: 'ShoppingCart' },
                  { title: 'DollarSign', value: 'DollarSign' },
                  { title: 'Calculator', value: 'Calculator' },
                  { title: 'Package', value: 'Package' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
})

export const whyChoose = defineType({
  name: 'whyChoose',
  title: 'Por que Escolher',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Seção',
      type: 'string',
      initialValue: 'Por que escolher o Porto Itapoá?',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      initialValue: 'Descubra os diferenciais que fazem do nosso terminal a melhor escolha para sua operação',
    },
    {
      name: 'benefits',
      title: 'Benefícios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: 'ctaButtonText',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'VEJA MAIS DIFERENCIAIS',
    },
    {
      name: 'ctaButtonLink',
      title: 'Link do Botão',
      type: 'string',
      initialValue: '/servicos',
    },
  ],
})

export const sustainability = defineType({
  name: 'sustainability',
  title: 'Sustentabilidade',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Compromisso com a sustentabilidade',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
    },
    {
      name: 'ctaButtonText',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'ACESSE NOSSO PORTAL DE SUSTENTABILIDADE!',
    },
    {
      name: 'ctaButtonLink',
      title: 'Link do Botão',
      type: 'string',
      initialValue: '/sustentabilidade',
    },
  ],
})

export const contact = defineType({
  name: 'contact',
  title: 'Contato',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      initialValue: 'Porto Itapoá',
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      initialValue: 'Terminal portuário de última geração, conectando o Brasil ao mundo com eficiência, tecnologia e sustentabilidade.',
    },
    {
      name: 'address',
      title: 'Endereço',
      type: 'string',
      initialValue: 'Rod. SC-415, Km 5 - Itapoá/SC',
    },
    {
      name: 'phone',
      title: 'Telefone',
      type: 'string',
      initialValue: '+55 (47) 3441-8000',
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
      initialValue: 'contato@portoitapoa.com.br',
    },
    {
      name: 'ctaButtonText',
      title: 'Texto do Botão Principal',
      type: 'string',
      initialValue: 'Entre em Contato',
    },
    {
      name: 'ctaButtonLink',
      title: 'Link do Botão Principal',
      type: 'string',
      initialValue: '/contato',
    },
    {
      name: 'secondaryButtonText',
      title: 'Texto do Botão Secundário',
      type: 'string',
      initialValue: 'Nossos Serviços',
    },
    {
      name: 'secondaryButtonLink',
      title: 'Link do Botão Secundário',
      type: 'string',
      initialValue: '/servicos',
    },
  ],
})

// Schema para Porto Itapoá (História, Linha do Tempo e Localização)
export const portoItapoa = defineType({
  name: 'portoItapoa',
  title: 'Porto Itapoá',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'description.pt',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título Principal'),
    createLocalizedTextField('description', 'Descrição'),
    {
      name: 'historia',
      title: 'História',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título da Seção'),
        createLocalizedBlockContentField('conteudo', 'Conteúdo'),
        {
          name: 'imagem',
          title: 'Imagem',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'linhaTempo',
      title: 'Linha do Tempo',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título da Seção'),
        {
          name: 'eventos',
          title: 'Eventos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'ano',
                  title: 'Ano',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                createLocalizedStringField('titulo', 'Título do Evento'),
                createLocalizedTextField('descricao', 'Descrição'),
                {
                  name: 'imagem',
                  title: 'Imagem',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'localizacao',
      title: 'Localização',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título da Seção'),
        createLocalizedStringField('endereco', 'Endereço'),
        {
          name: 'coordenadas',
          title: 'Coordenadas',
          type: 'object',
          fields: [
            {
              name: 'latitude',
              title: 'Latitude',
              type: 'string',
            },
            {
              name: 'longitude',
              title: 'Longitude',
              type: 'string',
            },
          ],
        },
        {
          name: 'mapa',
          title: 'Mapa (embed)',
          type: 'url',
        },
        createLocalizedTextField('descricao', 'Descrição'),
      ],
    },
  ],
})

// Schema para Acionistas (Estrutura acionária e governança)
export const acionistas = defineType({
  name: 'acionistas',
  title: 'Acionistas',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'description.pt',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título Principal'),
    createLocalizedTextField('description', 'Descrição'),
    {
      name: 'estruturaAcionaria',
      title: 'Estrutura Acionária',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título da Seção'),
        {
          name: 'acionistas',
          title: 'Acionistas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                createLocalizedStringField('nome', 'Nome'),
                {
                  name: 'participacao',
                  title: 'Participação (%)',
                  type: 'string',
                },
                createLocalizedTextField('descricao', 'Descrição'),
                {
                  name: 'logo',
                  title: 'Logo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: 'tipo',
                  title: 'Tipo',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Controlador', value: 'controlador' },
                      { title: 'Minoritário', value: 'minoritario' },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'governanca',
      title: 'Governança',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título da Seção'),
        createLocalizedBlockContentField('conteudo', 'Conteúdo'),
        {
          name: 'documentos',
          title: 'Documentos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                createLocalizedStringField('nome', 'Nome do Documento'),
                {
                  name: 'tipo',
                  title: 'Tipo',
                  type: 'string',
                },
                {
                  name: 'arquivo',
                  title: 'Arquivo',
                  type: 'file',
                },
                {
                  name: 'link',
                  title: 'Link Externo',
                  type: 'url',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})

// Schema para Certificações (Certificações e credenciamentos)
export const certificacoes = defineType({
  name: 'certificacoes',
  title: 'Certificações',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'description.pt',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título Principal'),
    createLocalizedTextField('description', 'Descrição'),
    {
      name: 'certificacoes',
      title: 'Certificações',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('nome', 'Nome da Certificação'),
            {
              name: 'codigo',
              title: 'Código',
              type: 'string',
            },
            createLocalizedStringField('orgao', 'Órgão Emissor'),
            {
              name: 'dataEmissao',
              title: 'Data de Emissão',
              type: 'date',
            },
            {
              name: 'dataValidade',
              title: 'Data de Validade',
              type: 'date',
            },
            createLocalizedTextField('descricao', 'Descrição'),
            {
              name: 'certificado',
              title: 'Certificado (PDF/Imagem)',
              type: 'file',
            },
            {
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'categoria',
              title: 'Categoria',
              type: 'string',
              options: {
                list: [
                  { title: 'Qualidade', value: 'qualidade' },
                  { title: 'Meio Ambiente', value: 'meio-ambiente' },
                  { title: 'Segurança', value: 'seguranca' },
                  { title: 'Operacional', value: 'operacional' },
                  { title: 'Outros', value: 'outros' },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
})

// Schema para Premiações (Reconhecimentos e prêmios)
export const premiacoes = defineType({
  name: 'premiacoes',
  title: 'Premiações',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'description.pt',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título Principal'),
    createLocalizedTextField('description', 'Descrição'),
    {
      name: 'reconhecimentos',
      title: 'Reconhecimentos Principais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('titulo', 'Título'),
            {
              name: 'valor',
              title: 'Valor/Posição',
              type: 'string',
            },
            createLocalizedTextField('descricao', 'Descrição'),
          ],
        },
      ],
    },
    {
      name: 'premios',
      title: 'Prêmios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'ano',
              title: 'Ano',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            createLocalizedStringField('titulo', 'Título do Prêmio'),
            createLocalizedStringField('categoria', 'Categoria'),
            createLocalizedStringField('orgao', 'Órgão Concedente'),
            createLocalizedTextField('descricao', 'Descrição'),
            {
              name: 'nivel',
              title: 'Nível',
              type: 'string',
              options: {
                list: [
                  { title: 'Nacional', value: 'nacional' },
                  { title: 'Internacional', value: 'internacional' },
                  { title: 'Regional', value: 'regional' },
                ],
              },
            },
            {
              name: 'imagem',
              title: 'Imagem',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
})

// Schema para Programação de Navios
export const programacaoNavios = defineType({
  name: 'programacaoNavios',
  title: 'Programação de Navios',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'description.pt',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título Principal'),
    createLocalizedTextField('description', 'Descrição'),
    createLocalizedBlockContentField('intro', 'Texto de Introdução'),
    {
      name: 'funcionalidades',
      title: 'Funcionalidades',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('titulo', 'Título'),
            createLocalizedTextField('descricao', 'Descrição'),
            {
              name: 'icone',
              title: 'Ícone',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'linkSistema',
      title: 'Link para Sistema Externo',
      type: 'url',
    },
    createLocalizedBlockContentField('instrucoes', 'Instruções de Uso'),
  ],
})

// Schema para Portal de Compras
export const portalCompras = defineType({
  name: 'portalCompras',
  title: 'Portal de Compras',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'description.pt',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título Principal'),
    createLocalizedTextField('description', 'Descrição'),
    createLocalizedBlockContentField('intro', 'Texto de Introdução'),
    {
      name: 'beneficios',
      title: 'Benefícios',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('titulo', 'Título'),
            createLocalizedTextField('descricao', 'Descrição'),
          ],
        },
      ],
    },
    {
      name: 'comoParticipar',
      title: 'Como Participar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'passo',
              title: 'Número do Passo',
              type: 'number',
            },
            createLocalizedStringField('titulo', 'Título'),
            createLocalizedTextField('descricao', 'Descrição'),
          ],
        },
      ],
    },
    {
      name: 'linkSistema',
      title: 'Link para Sistema Externo',
      type: 'url',
    },
    {
      name: 'contato',
      title: 'Contato',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'E-mail',
          type: 'string',
        },
        {
          name: 'telefone',
          title: 'Telefone',
          type: 'string',
        },
      ],
    },
  ],
})

// Schema para Tabela de Preços
export const tabelaPrecos = defineType({
  name: 'tabelaPrecos',
  title: 'Tabela de Preços',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'description.pt',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título Principal'),
    createLocalizedTextField('description', 'Descrição'),
    createLocalizedBlockContentField('intro', 'Texto de Introdução'),
    {
      name: 'anoVigencia',
      title: 'Ano de Vigência',
      type: 'string',
    },
    createLocalizedBlockContentField('informacoesImportantes', 'Informações Importantes'),
    {
      name: 'contato',
      title: 'Contato Comercial',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'E-mail',
          type: 'string',
        },
        {
          name: 'telefone',
          title: 'Telefone',
          type: 'string',
        },
        createLocalizedStringField('horario', 'Horário de Atendimento'),
      ],
    },
    {
      name: 'linkDownload',
      title: 'Link para Download da Tabela (PDF)',
      type: 'url',
    },
    {
      name: 'arquivoTabela',
      title: 'Arquivo da Tabela (PDF)',
      type: 'file',
    },
  ],
})

export const schemaTypes = [
  homepage,
  stats,
  terminal,
  maritimeServices,
  otherServices,
  whyChoose,
  sustainability,
  contact,
  portoItapoa,
  acionistas,
  certificacoes,
  premiacoes,
  programacaoNavios,
  portalCompras,
  tabelaPrecos,
]
