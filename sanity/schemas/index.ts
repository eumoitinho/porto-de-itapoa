import { defineType } from 'sanity'

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

export const schemaTypes = [
  homepage,
  stats,
  terminal,
  maritimeServices,
  otherServices,
  whyChoose,
  sustainability,
  contact,
]
