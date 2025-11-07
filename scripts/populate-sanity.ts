/**
 * Scripts para popular o Sanity com dados iniciais
 * Execute com: bun run scripts/populate-sanity.ts
 * OU: bun scripts/populate-sanity.ts
 * 
 * Bun carrega automaticamente variáveis de .env.local e .env
 */

// Bun carrega automaticamente .env.local e .env, mas vamos garantir
// Limpar aspas das variáveis se existirem
if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.replace(/^["']|["']$/g, '')
}
if (process.env.NEXT_PUBLIC_SANITY_DATASET) {
  process.env.NEXT_PUBLIC_SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET.replace(/^["']|["']$/g, '')
}
if (process.env.SANITY_API_TOKEN) {
  process.env.SANITY_API_TOKEN = process.env.SANITY_API_TOKEN.replace(/^["']|["']$/g, '')
}

import { createClient } from '@sanity/client'

// Validar variáveis de ambiente
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ ERRO: NEXT_PUBLIC_SANITY_PROJECT_ID não encontrado nas variáveis de ambiente!')
  console.error('Por favor, crie um arquivo .env.local na raiz do projeto com:')
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id')
  console.error('NEXT_PUBLIC_SANITY_DATASET=production')
  console.error('SANITY_API_TOKEN=seu-token')
  process.exit(1)
}

if (!token) {
  console.warn('⚠️  AVISO: SANITY_API_TOKEN não encontrado. Operações de escrita podem falhar.')
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token, // Token de escrita necessário
})

// Helper para criar bloco de conteúdo PortableText
function createBlockContent(text: string, key: string = 'block1') {
  return [
    {
      _type: 'block',
      _key: key,
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: `${key}-span`,
          text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ]
}

// Script para popular Porto Itapoá
export async function populatePortoItapoa() {
  const data = {
    _type: 'portoItapoa',
    title: {
      pt: 'Porto Itapoá',
      en: 'Porto Itapoá',
      es: 'Puerto Itapoá',
      zh: '伊塔波阿港',
    },
    description: {
      pt: 'História, Linha do Tempo e Localização',
      en: 'History, Timeline and Location',
      es: 'Historia, Línea de Tiempo y Ubicación',
      zh: '历史、时间线和位置',
    },
    historia: {
      titulo: {
        pt: 'História',
        en: 'History',
        es: 'Historia',
        zh: '历史',
      },
      conteudo: {
        pt: createBlockContent('O Porto Itapoá é um dos maiores e mais eficientes terminais de contêineres do Brasil, com capacidade atual para movimentar 1,8 milhão de TEUs por ano e em expansão para 2 milhões.'),
        en: createBlockContent('Porto Itapoá is one of the largest and most efficient container terminals in Brazil, with current capacity to handle 1.8 million TEUs per year and expanding to 2 million.'),
        es: createBlockContent('El Puerto Itapoá es uno de los terminales de contenedores más grandes y eficientes de Brasil, con capacidad actual para manejar 1,8 millones de TEU por año y en expansión a 2 millones.'),
        zh: createBlockContent('伊塔波阿港是巴西最大和最有效的集装箱码头之一，目前每年可处理180万TEU，并正在扩建至200万。'),
      },
    },
    linhaTempo: {
      titulo: {
        pt: 'Linha do Tempo',
        en: 'Timeline',
        es: 'Línea de Tiempo',
        zh: '时间线',
      },
      eventos: [
        {
          _key: 'evento1',
          ano: '2010',
          titulo: {
            pt: 'Início das Operações',
            en: 'Start of Operations',
            es: 'Inicio de Operaciones',
            zh: '开始运营',
          },
          descricao: {
            pt: 'Porto Itapoá inicia suas operações comerciais.',
            en: 'Porto Itapoá starts its commercial operations.',
            es: 'Puerto Itapoá inicia sus operaciones comerciales.',
            zh: '伊塔波阿港开始商业运营。',
          },
        },
        {
          _key: 'evento2',
          ano: '2015',
          titulo: {
            pt: 'Primeira Expansão',
            en: 'First Expansion',
            es: 'Primera Expansión',
            zh: '首次扩建',
          },
          descricao: {
            pt: 'Expansão da capacidade operacional do terminal.',
            en: 'Expansion of the terminal\'s operational capacity.',
            es: 'Expansión de la capacidad operacional del terminal.',
            zh: '码头运营能力扩建。',
          },
        },
        {
          _key: 'evento3',
          ano: '2020',
          titulo: {
            pt: 'Certificações Internacionais',
            en: 'International Certifications',
            es: 'Certificaciones Internacionales',
            zh: '国际认证',
          },
          descricao: {
            pt: 'Obtidas certificações ISO 9001, ISO 14001 e OEA.',
            en: 'Obtained ISO 9001, ISO 14001 and AEO certifications.',
            es: 'Obtenidas certificaciones ISO 9001, ISO 14001 y OEA.',
            zh: '获得ISO 9001、ISO 14001和OEA认证。',
          },
        },
      ],
    },
    localizacao: {
      titulo: {
        pt: 'Localização',
        en: 'Location',
        es: 'Ubicación',
        zh: '位置',
      },
      endereco: {
        pt: 'Av. Beira Mar 5, 2900 • Itapoá/SC',
        en: 'Av. Beira Mar 5, 2900 • Itapoá/SC',
        es: 'Av. Beira Mar 5, 2900 • Itapoá/SC',
        zh: 'Av. Beira Mar 5, 2900 • Itapoá/SC',
      },
      coordenadas: {
        latitude: '-26.1167',
        longitude: '-48.6167',
      },
      descricao: {
        pt: 'Localizado estrategicamente na região sul do Brasil, o Porto Itapoá oferece fácil acesso às principais rotas comerciais.',
        en: 'Strategically located in southern Brazil, Porto Itapoá offers easy access to major trade routes.',
        es: 'Ubicado estratégicamente en el sur de Brasil, el Puerto Itapoá ofrece fácil acceso a las principales rutas comerciales.',
        zh: '位于巴西南部战略位置，伊塔波阿港可轻松进入主要贸易路线。',
      },
    },
  }

  try {
    // Verifica se já existe um documento
    const existing = await client.fetch('*[_type == "portoItapoa"][0]')
    
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Porto Itapoá atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Porto Itapoá criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Porto Itapoá:', error)
    throw error
  }
}

// Script para popular Acionistas
export async function populateAcionistas() {
  const data = {
    _type: 'acionistas',
    title: {
      pt: 'Acionistas',
      en: 'Shareholders',
      es: 'Accionistas',
      zh: '股东',
    },
    description: {
      pt: 'Estrutura acionária e governança',
      en: 'Shareholding structure and governance',
      es: 'Estructura accionaria y gobernanza',
      zh: '股权结构和治理',
    },
    estruturaAcionaria: {
      titulo: {
        pt: 'Estrutura Acionária',
        en: 'Shareholding Structure',
        es: 'Estructura Accionaria',
        zh: '股权结构',
      },
      acionistas: [
        {
          _key: 'acionista1',
          nome: {
            pt: 'Portinvest',
            en: 'Portinvest',
            es: 'Portinvest',
            zh: 'Portinvest',
          },
          participacao: '70%',
          tipo: 'controlador',
          descricao: {
            pt: 'Controlador majoritário do Porto Itapoá.',
            en: 'Majority shareholder of Porto Itapoá.',
            es: 'Accionista mayoritario de Puerto Itapoá.',
            zh: '伊塔波阿港的大股东。',
          },
        },
        {
          _key: 'acionista2',
          nome: {
            pt: 'Hamburg Süd Aliança',
            en: 'Hamburg Süd Aliança',
            es: 'Hamburg Süd Aliança',
            zh: '汉堡南美联盟',
          },
          participacao: '30%',
          tipo: 'minoritario',
          descricao: {
            pt: 'Acionista minoritário estratégico.',
            en: 'Strategic minority shareholder.',
            es: 'Accionista minoritario estratégico.',
            zh: '战略小股东。',
          },
        },
      ],
    },
    governanca: {
      titulo: {
        pt: 'Governança',
        en: 'Governance',
        es: 'Gobernanza',
        zh: '治理',
      },
      conteudo: {
        pt: createBlockContent('Nossa estrutura de governança garante transparência e boas práticas corporativas.'),
        en: createBlockContent('Our governance structure ensures transparency and good corporate practices.'),
        es: createBlockContent('Nuestra estructura de gobernanza garantiza transparencia y buenas prácticas corporativas.'),
        zh: createBlockContent('我们的治理结构确保透明度和良好的企业实践。'),
      },
      documentos: [
        {
          _key: 'doc1',
          nome: {
            pt: 'Relatório Anual 2024',
            en: 'Annual Report 2024',
            es: 'Informe Anual 2024',
            zh: '2024年度报告',
          },
          tipo: 'PDF',
        },
        {
          _key: 'doc2',
          nome: {
            pt: 'Demonstrações Financeiras Q4 2024',
            en: 'Financial Statements Q4 2024',
            es: 'Estados Financieros Q4 2024',
            zh: '2024年第四季度财务报表',
          },
          tipo: 'PDF',
        },
      ],
    },
  }

  try {
    const existing = await client.fetch('*[_type == "acionistas"][0]')
    
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Acionistas atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Acionistas criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Acionistas:', error)
    throw error
  }
}

// Script para popular Certificações
export async function populateCertificacoes() {
  const data = {
    _type: 'certificacoes',
    title: {
      pt: 'Certificações',
      en: 'Certifications',
      es: 'Certificaciones',
      zh: '认证',
    },
    description: {
      pt: 'Certificações e credenciamentos',
      en: 'Certifications and accreditations',
      es: 'Certificaciones y acreditaciones',
      zh: '认证和认可',
    },
    certificacoes: [
      {
        _key: 'cert1',
        nome: {
          pt: 'ISO 9001',
          en: 'ISO 9001',
          es: 'ISO 9001',
          zh: 'ISO 9001',
        },
        codigo: 'ISO 9001:2015',
        orgao: {
          pt: 'ISO',
          en: 'ISO',
          es: 'ISO',
          zh: 'ISO',
        },
        categoria: 'qualidade',
        descricao: {
          pt: 'Certificação de gestão da qualidade.',
          en: 'Quality management certification.',
          es: 'Certificación de gestión de calidad.',
          zh: '质量管理认证。',
        },
      },
      {
        _key: 'cert2',
        nome: {
          pt: 'ISO 14001',
          en: 'ISO 14001',
          es: 'ISO 14001',
          zh: 'ISO 14001',
        },
        codigo: 'ISO 14001:2015',
        orgao: {
          pt: 'ISO',
          en: 'ISO',
          es: 'ISO',
          zh: 'ISO',
        },
        categoria: 'meio-ambiente',
        descricao: {
          pt: 'Certificação de gestão ambiental.',
          en: 'Environmental management certification.',
          es: 'Certificación de gestión ambiental.',
          zh: '环境管理认证。',
        },
      },
      {
        _key: 'cert3',
        nome: {
          pt: 'OEA - Operador Econômico Autorizado',
          en: 'AEO - Authorized Economic Operator',
          es: 'OEA - Operador Económico Autorizado',
          zh: 'OEA - 授权经济运营商',
        },
        orgao: {
          pt: 'Receita Federal',
          en: 'Federal Revenue',
          es: 'Receita Federal',
          zh: '联邦税务局',
        },
        categoria: 'operacional',
        descricao: {
          pt: 'Credenciamento como Operador Econômico Autorizado.',
          en: 'Accreditation as Authorized Economic Operator.',
          es: 'Acreditación como Operador Económico Autorizado.',
          zh: '获得授权经济运营商资格。',
        },
      },
    ],
  }

  try {
    const existing = await client.fetch('*[_type == "certificacoes"][0]')
    
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Certificações atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Certificações criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Certificações:', error)
    throw error
  }
}

// Script para popular Premiações
export async function populatePremiacoes() {
  const data = {
    _type: 'premiacoes',
    title: {
      pt: 'Premiações',
      en: 'Awards',
      es: 'Premios',
      zh: '奖项',
    },
    description: {
      pt: 'Reconhecimentos e prêmios',
      en: 'Recognition and awards',
      es: 'Reconocimientos y premios',
      zh: '认可和奖项',
    },
    reconhecimentos: [
      {
        _key: 'rec1',
        titulo: {
          pt: '1º Lugar em Santa Catarina',
          en: '1st Place in Santa Catarina',
          es: '1er Lugar en Santa Catarina',
          zh: '圣卡塔琳娜州第一名',
        },
        valor: '#1 SC',
        descricao: {
          pt: 'Maior porto de contêineres do estado',
          en: 'Largest container port in the state',
          es: 'Mayor puerto de contenedores del estado',
          zh: '该州最大的集装箱港口',
        },
      },
      {
        _key: 'rec2',
        titulo: {
          pt: '3º Lugar no Brasil',
          en: '3rd Place in Brazil',
          es: '3er Lugar en Brasil',
          zh: '巴西第三名',
        },
        valor: '#3 BR',
        descricao: {
          pt: 'Entre os maiores terminais do país',
          en: 'Among the largest terminals in the country',
          es: 'Entre los mayores terminales del país',
          zh: '全国最大的码头之一',
        },
      },
    ],
    premios: [
      {
        _key: 'premio1',
        ano: '2024',
        titulo: {
          pt: 'Prêmio Excelência Portuária',
          en: 'Port Excellence Award',
          es: 'Premio Excelencia Portuaria',
          zh: '港口卓越奖',
        },
        categoria: {
          pt: 'Melhor Terminal de Contêineres',
          en: 'Best Container Terminal',
          es: 'Mejor Terminal de Contenedores',
          zh: '最佳集装箱码头',
        },
        orgao: {
          pt: 'Associação Brasileira dos Terminais de Contêineres (ABRATEC)',
          en: 'Brazilian Association of Container Terminals (ABRATEC)',
          es: 'Asociación Brasileña de Terminales de Contenedores (ABRATEC)',
          zh: '巴西集装箱码头协会 (ABRATEC)',
        },
        descricao: {
          pt: 'Reconhecimento pela excelência operacional e inovação tecnológica',
          en: 'Recognition for operational excellence and technological innovation',
          es: 'Reconocimiento por la excelencia operacional e innovación tecnológica',
          zh: '表彰运营卓越和技术创新',
        },
        nivel: 'nacional',
      },
    ],
  }

  try {
    const existing = await client.fetch('*[_type == "premiacoes"][0]')
    
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Premiações atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Premiações criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Premiações:', error)
    throw error
  }
}

// Script para popular Programação de Navios
export async function populateProgramacaoNavios() {
  const data = {
    _type: 'programacaoNavios',
    title: {
      pt: 'Programação de Navios',
      en: 'Ship Schedule',
      es: 'Programación de Buques',
      zh: '船舶调度',
    },
    description: {
      pt: 'Acompanhe em tempo real chegadas, atracações e saídas de navios',
      en: 'Track in real time arrivals, berthings and departures of ships',
      es: 'Seguimiento en tiempo real de llegadas, atraques y salidas de buques',
      zh: '实时跟踪船舶的到达、停泊和离港',
    },
    intro: {
      pt: createBlockContent('Acompanhe em tempo real todas as informações sobre chegadas, atracações e saídas de navios.'),
      en: createBlockContent('Track in real time all information about arrivals, berthings and departures of ships.'),
      es: createBlockContent('Seguimiento en tiempo real de toda la información sobre llegadas, atraques y salidas de buques.'),
      zh: createBlockContent('实时跟踪有关船舶到达、停泊和离港的所有信息。'),
    },
    funcionalidades: [
      {
        _key: 'func1',
        titulo: {
          pt: 'Programação em Tempo Real',
          en: 'Real-Time Schedule',
          es: 'Programación en Tiempo Real',
          zh: '实时调度',
        },
        descricao: {
          pt: 'Visualize a programação atualizada de navios.',
          en: 'View the updated ship schedule.',
          es: 'Visualice la programación actualizada de buques.',
          zh: '查看更新的船舶调度。',
        },
      },
      {
        _key: 'func2',
        titulo: {
          pt: 'Câmera 360°',
          en: '360° Camera',
          es: 'Cámara 360°',
          zh: '360°摄像头',
        },
        descricao: {
          pt: 'Acompanhe visualmente as operações portuárias.',
          en: 'Visually monitor port operations.',
          es: 'Siga visualmente las operaciones portuarias.',
          zh: '直观监控港口运营。',
        },
      },
    ],
    linkSistema: 'https://www.portoitapoa.com.br/programacao-navios',
    instrucoes: {
      pt: createBlockContent('Acesse o sistema através do link disponível para visualizar todas as informações.'),
      en: createBlockContent('Access the system through the available link to view all information.'),
      es: createBlockContent('Acceda al sistema a través del enlace disponible para visualizar toda la información.'),
      zh: createBlockContent('通过可用链接访问系统以查看所有信息。'),
    },
  }

  try {
    const existing = await client.fetch('*[_type == "programacaoNavios"][0]')
    
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Programação de Navios atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Programação de Navios criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Programação de Navios:', error)
    throw error
  }
}

// Script para popular Portal de Compras
export async function populatePortalCompras() {
  const data = {
    _type: 'portalCompras',
    title: {
      pt: 'Portal de Compras',
      en: 'Procurement Portal',
      es: 'Portal de Compras',
      zh: '采购门户',
    },
    description: {
      pt: 'Participe de cotações e forneça produtos e serviços ao Porto',
      en: 'Participate in bids and supply products and services to the Port',
      es: 'Participe en cotizaciones y suministre productos y servicios al Puerto',
      zh: '参与投标并为港口提供产品和服务',
    },
    intro: {
      pt: createBlockContent('Participe de cotações e forneça produtos e serviços ao Porto Itapoá.'),
      en: createBlockContent('Participate in bids and supply products and services to Porto Itapoá.'),
      es: createBlockContent('Participe en cotizaciones y suministre productos y servicios al Puerto Itapoá.'),
      zh: createBlockContent('参与投标并为伊塔波阿港提供产品和服务。'),
    },
    beneficios: [
      {
        _key: 'ben1',
        titulo: {
          pt: 'Acesso às Cotações',
          en: 'Access to Bids',
          es: 'Acceso a Cotizaciones',
          zh: '访问投标',
        },
        descricao: {
          pt: 'Participe de processos de compra e fornecimento.',
          en: 'Participate in procurement and supply processes.',
          es: 'Participe en procesos de compra y suministro.',
          zh: '参与采购和供应流程。',
        },
      },
      {
        _key: 'ben2',
        titulo: {
          pt: 'Transparência',
          en: 'Transparency',
          es: 'Transparencia',
          zh: '透明度',
        },
        descricao: {
          pt: 'Processo transparente e competitivo.',
          en: 'Transparent and competitive process.',
          es: 'Proceso transparente y competitivo.',
          zh: '透明和竞争的过程。',
        },
      },
    ],
    comoParticipar: [
      {
        _key: 'passo1',
        passo: 1,
        titulo: {
          pt: 'Cadastro',
          en: 'Registration',
          es: 'Registro',
          zh: '注册',
        },
        descricao: {
          pt: 'Faça seu cadastro no portal.',
          en: 'Register on the portal.',
          es: 'Regístrese en el portal.',
          zh: '在门户网站上注册。',
        },
      },
      {
        _key: 'passo2',
        passo: 2,
        titulo: {
          pt: 'Participação',
          en: 'Participation',
          es: 'Participación',
          zh: '参与',
        },
        descricao: {
          pt: 'Participe das cotações disponíveis.',
          en: 'Participate in available bids.',
          es: 'Participe en las cotizaciones disponibles.',
          zh: '参与可用的投标。',
        },
      },
    ],
    linkSistema: 'https://www.portoitapoa.com.br/portal-compras',
    contato: {
      email: 'compras@portoitapoa.com.br',
      telefone: '+55 (47) 3441-8000',
    },
  }

  try {
    const existing = await client.fetch('*[_type == "portalCompras"][0]')
    
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Portal de Compras atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Portal de Compras criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Portal de Compras:', error)
    throw error
  }
}

// Script para popular Tabela de Preços
export async function populateTabelaPrecos() {
  const data = {
    _type: 'tabelaPrecos',
    title: {
      pt: 'Tabela de Preços',
      en: 'Price Table',
      es: 'Tabla de Precios',
      zh: '价格表',
    },
    description: {
      pt: 'Consulte as tarifas atualizadas de todos os serviços disponíveis',
      en: 'Check updated rates for all available services',
      es: 'Consulte las tarifas actualizadas de todos los servicios disponibles',
      zh: '查看所有可用服务的更新费率',
    },
    intro: {
      pt: createBlockContent('Consulte nossa tabela completa de preços e serviços portuários. Valores atualizados e transparentes.'),
      en: createBlockContent('Check our complete table of port prices and services. Updated and transparent values.'),
      es: createBlockContent('Consulte nuestra tabla completa de precios y servicios portuarios. Valores actualizados y transparentes.'),
      zh: createBlockContent('查看我们完整的港口价格和服务表。更新和透明的价值。'),
    },
    anoVigencia: '2025',
    informacoesImportantes: {
      pt: createBlockContent('Todos os preços estão expressos em reais. Tabela válida por prazo indeterminado e pode sofrer alterações sem aviso prévio.'),
      en: createBlockContent('All prices are expressed in reais. Table valid for an indefinite period and may be changed without prior notice.'),
      es: createBlockContent('Todos los precios están expresados en reales. Tabla válida por tiempo indeterminado y puede sufrir cambios sin previo aviso.'),
      zh: createBlockContent('所有价格均以雷亚尔表示。表格有效期不定，可能会在未事先通知的情况下更改。'),
    },
    contato: {
      email: 'comercial@portoitapoa.com.br',
      telefone: '+55 (47) 3441-8000',
      horario: {
        pt: 'Segunda a sexta: 08h às 18h',
        en: 'Monday to Friday: 8am to 6pm',
        es: 'Lunes a viernes: 8h a 18h',
        zh: '周一至周五：上午8点至下午6点',
      },
    },
  }

  try {
    const existing = await client.fetch('*[_type == "tabelaPrecos"][0]')
    
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Tabela de Preços atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Tabela de Preços criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Tabela de Preços:', error)
    throw error
  }
}

// Função principal para executar todos os scripts
export async function populateAll() {
  console.log('🚀 Iniciando população do Sanity...\n')

  try {
    await populatePortoItapoa()
    await populateAcionistas()
    await populateCertificacoes()
    await populatePremiacoes()
    await populateProgramacaoNavios()
    await populatePortalCompras()
    await populateTabelaPrecos()

    console.log('\n✅ População concluída com sucesso!')
  } catch (error) {
    console.error('\n❌ Erro durante a população:', error)
    process.exit(1)
  }
}

// Executar automaticamente quando o script for chamado
populateAll().catch((error) => {
  console.error('❌ Erro fatal:', error)
  process.exit(1)
})

