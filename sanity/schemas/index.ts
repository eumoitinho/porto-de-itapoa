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
      name: 'atendimentoCliente',
      title: 'Atendimento ao Cliente',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título'),
        createLocalizedTextField('descricao', 'Descrição'),
    {
          name: 'telefone',
      title: 'Telefone',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
        },
        createLocalizedTextField('chatOnline', 'Chat Online'),
        {
          name: 'centralAjuda',
          title: 'URL da Central de Ajuda/FAQ',
          type: 'url',
        },
        createLocalizedTextField('horarios', 'Horários de Atendimento'),
      ],
    },
    {
      name: 'ouvidoriaSocial',
      title: 'Ouvidoria Social',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título'),
        createLocalizedTextField('descricao', 'Descrição'),
    {
          name: 'telefone',
          title: 'Telefone (Ligação Gratuita)',
      type: 'string',
        },
        createLocalizedTextField('disponibilidade', 'Disponibilidade'),
      ],
    },
    {
      name: 'sedeAdministrativa',
      title: 'Sede Administrativa',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título'),
        createLocalizedTextField('descricao', 'Descrição'),
        createLocalizedTextField('endereco', 'Endereço'),
        createLocalizedTextField('horario', 'Horário de Atendimento'),
        {
          name: 'cnpj',
          title: 'CNPJ',
      type: 'string',
    },
    {
          name: 'inscricaoEstadual',
          title: 'Inscrição Estadual/SC',
      type: 'string',
        },
      ],
    },
    {
      name: 'formulario',
      title: 'Formulário de Contato',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título'),
        createLocalizedTextField('descricao', 'Descrição'),
      ],
    },
  ],
})

export const carreiras = defineType({
  name: 'carreiras',
  title: 'Carreiras',
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
      name: 'protecaoDados',
      title: 'Compromisso com Proteção de Dados',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título'),
        createLocalizedBlockContentField('descricao', 'Descrição'),
        {
          name: 'usoDados',
          title: 'Uso dos Dados',
          type: 'object',
          fields: [
            createLocalizedStringField('titulo', 'Título'),
            createLocalizedTextField('descricao', 'Descrição'),
          ],
        },
        {
          name: 'retencaoDados',
          title: 'Retenção dos Dados',
          type: 'object',
          fields: [
            createLocalizedStringField('titulo', 'Título'),
            createLocalizedTextField('descricao', 'Descrição'),
          ],
        },
      ],
    },
    {
      name: 'termoConsentimento',
      title: 'Termo de Consentimento',
      type: 'object',
      fields: [
        createLocalizedStringField('titulo', 'Título'),
        createLocalizedTextField('descricao', 'Descrição'),
        createLocalizedTextField('declaracaoPEP', 'Declaração PEP'),
        createLocalizedTextField('textoConsentimento', 'Texto do Consentimento'),
      ],
    },
    {
      name: 'linkPortalVagas',
      title: 'Link para Portal de Vagas',
      type: 'url',
    },
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
    {
      name: 'cameraUrl',
      title: 'URL da Câmera Online',
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

// Schema para Infraestrutura
export const infraestrutura = defineType({
  name: 'infraestrutura',
  title: 'Infraestrutura',
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
      name: 'especificacoes',
      title: 'Especificações Técnicas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('categoria', 'Categoria'),
            {
              name: 'itens',
              title: 'Itens',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    createLocalizedStringField('caracteristica', 'Característica'),
                    createLocalizedStringField('especificacao', 'Especificação'),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    createLocalizedBlockContentField('planosExpansao', 'Planos de Expansão'),
    createLocalizedBlockContentField('cargaRefrigerada', 'Cuidado com Carga Refrigerada'),
    createLocalizedBlockContentField('acessoTerrestre', 'Agilidade e Segurança no Acesso Terrestre'),
  ],
})

// Schema para Diferenciais
export const diferenciais = defineType({
  name: 'diferenciais',
  title: 'Diferenciais',
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
      name: 'diferenciais',
      title: 'Lista de Diferenciais',
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
  ],
})

// Schema para Downloads
export const downloads = defineType({
  name: 'downloads',
  title: 'Central de Downloads',
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
      name: 'categorias',
      title: 'Categorias de Downloads',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('nome', 'Nome da Categoria'),
            {
              name: 'arquivos',
              title: 'Arquivos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    createLocalizedStringField('nome', 'Nome do Arquivo'),
                    {
                      name: 'url',
                      title: 'URL do Arquivo',
                      type: 'url',
                    },
                    {
                      name: 'arquivo',
                      title: 'Arquivo (Upload)',
                      type: 'file',
                    },
                    {
                      name: 'tipo',
                      title: 'Tipo',
                      type: 'string',
                      options: {
                        list: ['PDF', 'XLSX', 'XLS', 'DOCX', 'DOC'],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})

// Schema para LGPD
export const lgpd = defineType({
  name: 'lgpd',
  title: 'LGPD',
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
      name: 'dpo',
      title: 'Encarregado de Dados (DPO)',
      type: 'object',
      fields: [
        createLocalizedBlockContentField('descricao', 'Descrição do DPO'),
      ],
    },
    {
      name: 'documentacao',
      title: 'Documentação para Consulta',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('titulo', 'Título do Documento'),
            {
              name: 'url',
              title: 'URL do Documento',
              type: 'url',
            },
            {
              name: 'arquivo',
              title: 'Arquivo (Upload)',
              type: 'file',
            },
          ],
        },
      ],
    },
  ],
})

// Schema para Canal de Denúncias
export const canalDenuncias = defineType({
  name: 'canalDenuncias',
  title: 'Canal de Denúncias',
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
      name: 'garantias',
      title: 'Garantias de Confidencialidade',
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
      name: 'links',
      title: 'Links e Contatos',
      type: 'object',
      fields: [
        {
          name: 'codigoEtica',
          title: 'Link para Código de Ética',
          type: 'url',
        },
        {
          name: 'registrarDenuncia',
          title: 'Link para Registrar Denúncia',
          type: 'url',
        },
        {
          name: 'registrarDuvida',
          title: 'Link para Registrar Dúvida',
          type: 'url',
        },
        {
          name: 'consultarOcorrencias',
          title: 'Link para Consultar Ocorrências',
          type: 'url',
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

// Schema para Procedimentos Operacionais
export const procedimentosOperacionais = defineType({
  name: 'procedimentosOperacionais',
  title: 'Procedimentos Operacionais',
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
      name: 'procedimentos',
      title: 'Procedimentos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('titulo', 'Título do Procedimento'),
            createLocalizedBlockContentField('descricao', 'Descrição'),
            {
              name: 'condicoes',
              title: 'Condições Gerais',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    createLocalizedStringField('titulo', 'Título da Condição'),
                    createLocalizedTextField('descricao', 'Descrição'),
                  ],
                },
              ],
            },
            {
              name: 'documentos',
              title: 'Documentos para Download',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    createLocalizedStringField('nome', 'Nome do Documento'),
                    {
                      name: 'url',
                      title: 'URL do Documento',
                      type: 'url',
                    },
                    {
                      name: 'arquivo',
                      title: 'Arquivo (Upload)',
                      type: 'file',
                    },
                  ],
                },
              ],
            },
            {
              name: 'empresasHabilitadas',
              title: 'Empresas Habilitadas',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    createLocalizedStringField('nome', 'Nome da Empresa'),
                    {
                      name: 'cnpj',
                      title: 'CNPJ',
                      type: 'string',
                    },
                    {
                      name: 'contato',
                      title: 'Contato',
                      type: 'string',
                    },
                    {
                      name: 'telefone',
                      title: 'Telefone',
                      type: 'string',
                    },
                    createLocalizedTextField('servicos', 'Serviços'),
                  ],
                },
              ],
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
        },
      ],
    },
  ],
})

export const cadastroCliente = defineType({
  name: 'cadastroCliente',
  title: 'Cadastro de Cliente',
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
      name: 'linkSistema',
      title: 'Link para Sistema Externo',
      type: 'url',
      initialValue: 'https://api.portoitapoa.com/hub-frontend/public-cadastro-clientes',
    },
  ],
})

export const cadastroMotorista = defineType({
  name: 'cadastroMotorista',
  title: 'Cadastro de Motorista',
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
      name: 'linkSistema',
      title: 'Link para Sistema Externo',
      type: 'url',
      initialValue: 'https://api.portoitapoa.com/hub-frontend/public-cadastro-motoristas',
    },
  ],
})

export const linhasNavegacao = defineType({
  name: 'linhasNavegacao',
  title: 'Linhas de Navegação',
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
      name: 'armadores',
      title: 'Armadores',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'nome',
              title: 'Nome do Armador',
              type: 'string',
            },
            {
              name: 'logo',
              title: 'Logo do Armador',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    createLocalizedBlockContentField('informacoesAdicionais', 'Informações Adicionais'),
  ],
})

export const simuladoresPrecos = defineType({
  name: 'simuladoresPrecos',
  title: 'Simuladores de Preços',
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
      name: 'tabelaPdfUrl',
      title: 'URL da Tabela de Preços (PDF)',
      type: 'url',
      initialValue: 'https://www.portoitapoa.com/wp-content/uploads/2025/03/Tabela-Publica-2025-Final-Fevereiro.pdf',
    },
  ],
})

export const consultas = defineType({
  name: 'consultas',
  title: 'Consultas',
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
      name: 'linkSistema',
      title: 'Link para Sistema Externo',
      type: 'url',
      initialValue: 'https://prod.portoitapoa.com.br/apex/n4.zul',
    },
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
          ],
        },
      ],
    },
  ],
})

export const integracaoMotoristas = defineType({
  name: 'integracaoMotoristas',
  title: 'Integração de Motoristas',
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
      name: 'linkSistema',
      title: 'Link para Sistema Externo',
      type: 'url',
      initialValue: 'https://forms.office.com/Pages/ResponsePage.aspx?id=QwqdHgbzNk2eLbcz8M_rfnsK8kh9lAs1EGfbjDLbFUMTJEMFJBSUlWWFRSRDhJRDVUU0hNT0EzWS4u',
    },
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
  ],
})

export const integracaoServicos = defineType({
  name: 'integracaoServicos',
  title: 'Integração de Serviços',
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
      name: 'linkSistema',
      title: 'Link para Sistema Externo',
      type: 'url',
      initialValue: 'https://forms.office.com/Pages/ResponsePage.aspx?id=QwqdHgbzNk2eLbcz8M_rfv0DXNnoEF1DjZa7wG4kOlNUMzdJMlNIOTIwTjY0NVM2RDJGMDJEVVRLTCQlQCN0PWcu',
    },
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
  ],
})

export const tour360 = defineType({
  name: 'tour360',
  title: 'Tour 360º',
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
      name: 'tourUrl',
      title: 'URL do Tour 360º',
      type: 'url',
      initialValue: 'https://www.portoitapoa.com/tour360/index.htm',
    },
  ],
})

// Schema para Blog Posts
export const blogPost = defineType({
  name: 'blogPost',
  title: 'Post do Blog',
  type: 'document',
  preview: {
    select: {
      title: 'title.pt',
      subtitle: 'category',
      media: 'featuredImage',
    },
  },
  fields: [
    createLocalizedStringField('title', 'Título do Post', {
      pt: { validation: (Rule: any) => Rule.required() },
    }),
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title.pt',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule: any) => Rule.required(),
    },
    createLocalizedTextField('excerpt', 'Resumo/Descrição Curta', {
      pt: { validation: (Rule: any) => Rule.required().max(200) },
    }),
    createLocalizedBlockContentField('content', 'Conteúdo do Post', {
      pt: { validation: (Rule: any) => Rule.required() },
    }),
    {
      name: 'featuredImage',
      title: 'Imagem de Destaque',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Operações', value: 'operacoes' },
          { title: 'Expansão', value: 'expansao' },
          { title: 'Sustentabilidade', value: 'sustentabilidade' },
          { title: 'Infraestrutura', value: 'infraestrutura' },
          { title: 'Qualidade', value: 'qualidade' },
          { title: 'Educação', value: 'educacao' },
          { title: 'Tecnologia', value: 'tecnologia' },
          { title: 'Notícias', value: 'noticias' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Nome do Autor',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Foto do Autor',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'bio',
          title: 'Biografia',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isPublished',
      title: 'Publicado',
      type: 'boolean',
      initialValue: false,
      description: 'Marque para publicar o post',
    },
    {
      name: 'readingTime',
      title: 'Tempo de Leitura (minutos)',
      type: 'number',
      description: 'Tempo estimado de leitura em minutos',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        createLocalizedStringField('metaTitle', 'Meta Título'),
        createLocalizedTextField('metaDescription', 'Meta Descrição'),
        {
          name: 'metaImage',
          title: 'Meta Imagem (Open Graph)',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Data de Publicação, Mais Recente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Data de Publicação, Mais Antiga',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})

// Schema para Configuração do Blog
export const blogConfig = defineType({
  name: 'blogConfig',
  title: 'Configuração do Blog',
  type: 'document',
  fields: [
    createLocalizedStringField('title', 'Título da Página do Blog'),
    createLocalizedTextField('description', 'Descrição do Blog'),
    {
      name: 'postsPerPage',
      title: 'Posts por Página',
      type: 'number',
      initialValue: 12,
      validation: (Rule: any) => Rule.min(1).max(50),
    },
    {
      name: 'featuredCategories',
      title: 'Categorias em Destaque',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            createLocalizedStringField('name', 'Nome da Categoria'),
            {
              name: 'slug',
              title: 'Slug',
              type: 'string',
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
            },
          ],
        },
      ],
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
  infraestrutura,
  diferenciais,
  downloads,
  lgpd,
  canalDenuncias,
  procedimentosOperacionais,
  cadastroCliente,
  cadastroMotorista,
  linhasNavegacao,
  simuladoresPrecos,
  consultas,
  integracaoMotoristas,
  integracaoServicos,
  tour360,
  carreiras,
  blogPost,
  blogConfig,
]
