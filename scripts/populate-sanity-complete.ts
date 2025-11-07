/**
 * Script COMPLETO para popular o Sanity com TODO o conteúdo do HTML fornecido
 * Execute com: bun run scripts/populate-sanity-complete.ts
 */

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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
  console.error('❌ ERRO: NEXT_PUBLIC_SANITY_PROJECT_ID não encontrado!')
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
  token,
})

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

// PORTO ITAPOÁ - Página 1
async function populatePortoItapoa() {
  const data = {
    _type: 'portoItapoa',
    title: {
      pt: 'Porto Itapoá',
      en: 'Porto Itapoá',
      es: 'Puerto Itapoá',
    },
    description: {
      pt: 'História, Linha do Tempo e Localização',
      en: 'History, Timeline and Location',
      es: 'Historia, Línea de Tiempo y Ubicación',
    },
    historia: {
      titulo: {
        pt: 'Nossa trajetória',
        en: 'Our trajectory',
        es: 'Nuestra trayectoria',
      },
      conteudo: {
        pt: createBlockContent('A história do Porto Itapoá é marcada por planejamento estratégico, crescimento acelerado e marcos significativos que transformaram o cenário portuário brasileiro.'),
        en: createBlockContent('The history of Porto Itapoá is marked by strategic planning, accelerated growth and significant milestones that transformed the Brazilian port scenario.'),
        es: createBlockContent('La historia del Puerto Itapoá está marcada por planificación estratégica, crecimiento acelerado e hitos significativos que transformaron el escenario portuario brasileño.'),
      },
    },
    linhaTempo: {
      titulo: {
        pt: 'Uma linha do tempo de conquistas',
        en: 'A timeline of achievements',
        es: 'Una línea de tiempo de logros',
      },
      eventos: [
        {
          _key: 'evento1',
          ano: '1993',
          titulo: {
            pt: 'A visão',
            en: 'The vision',
            es: 'La visión',
          },
          descricao: {
            pt: 'O Grupo Battistella identifica o potencial da Baía da Babitonga e escolhe a cidade de Itapoá para desenvolver um terminal portuário privativo de classe mundial.',
            en: 'The Battistella Group identifies the potential of Babitonga Bay and chooses the city of Itapoá to develop a world-class private port terminal.',
            es: 'El Grupo Battistella identifica el potencial de la Bahía de Babitonga y elige la ciudad de Itapoá para desarrollar un terminal portuario privado de clase mundial.',
          },
        },
        {
          _key: 'evento2',
          ano: '2007',
          titulo: {
            pt: 'O início das obras',
            en: 'The beginning of construction',
            es: 'El inicio de las obras',
          },
          descricao: {
            pt: 'As obras do terminal têm seu início, marcando o começo da materialização do projeto.',
            en: 'The terminal construction begins, marking the start of the project materialization.',
            es: 'Las obras del terminal tienen su inicio, marcando el comienzo de la materialización del proyecto.',
          },
        },
        {
          _key: 'evento3',
          ano: '2011',
          titulo: {
            pt: 'O início das operações',
            en: 'The start of operations',
            es: 'El inicio de las operaciones',
          },
          descricao: {
            pt: 'O Porto Itapoá recebe seu primeiro navio, dando partida a uma nova era na logística do Sul do Brasil.',
            en: 'Porto Itapoá receives its first ship, starting a new era in southern Brazil logistics.',
            es: 'El Puerto Itapoá recibe su primer barco, dando inicio a una nueva era en la logística del Sur de Brasil.',
          },
        },
        {
          _key: 'evento4',
          ano: '2014',
          titulo: {
            pt: 'O primeiro milhão',
            en: 'The first million',
            es: 'El primer millón',
          },
          descricao: {
            pt: 'Antes de completar três anos de operação, o terminal alcança a impressionante marca de 1 milhão de TEUs (contêineres) movimentados.',
            en: 'Before completing three years of operation, the terminal reaches the impressive mark of 1 million TEUs (containers) handled.',
            es: 'Antes de completar tres años de operación, el terminal alcanza la impresionante marca de 1 millón de TEU (contenedores) movidos.',
          },
        },
        {
          _key: 'evento5',
          ano: '2018',
          titulo: {
            pt: 'Expansão consolidada',
            en: 'Consolidated expansion',
            es: 'Expansión consolidada',
          },
          descricao: {
            pt: 'Com a adição de 100 mil m² de pátio e 170 metros de píer, o terminal amplia sua capacidade para atender à crescente demanda.',
            en: 'With the addition of 100,000 m² of yard and 170 meters of pier, the terminal expands its capacity to meet growing demand.',
            es: 'Con la adición de 100 mil m² de patio y 170 metros de muelle, el terminal amplía su capacidad para atender la creciente demanda.',
          },
        },
        {
          _key: 'evento6',
          ano: '2019',
          titulo: {
            pt: 'Liderança nacional',
            en: 'National leadership',
            es: 'Liderazgo nacional',
          },
          descricao: {
            pt: 'O Porto Itapoá consolida sua posição, alcançando o 1º lugar entre os portos de Santa Catarina e o 3º lugar no ranking nacional.',
            en: 'Porto Itapoá consolidates its position, reaching 1st place among Santa Catarina ports and 3rd place in the national ranking.',
            es: 'El Puerto Itapoá consolida su posición, alcanzando el 1º lugar entre los puertos de Santa Catarina y el 3º lugar en el ranking nacional.',
          },
        },
        {
          _key: 'evento7',
          ano: '2021',
          titulo: {
            pt: 'Capital humano',
            en: 'Human capital',
            es: 'Capital humano',
          },
          descricao: {
            pt: 'O terminal ultrapassa a marca de 1.000 colaboradores diretos, firmando-se como um grande empregador na região.',
            en: 'The terminal exceeds the mark of 1,000 direct employees, establishing itself as a major employer in the region.',
            es: 'El terminal supera la marca de 1.000 colaboradores directos, consolidándose como un gran empleador en la región.',
          },
        },
        {
          _key: 'evento8',
          ano: '2023',
          titulo: {
            pt: 'Recorde anual',
            en: 'Annual record',
            es: 'Récord anual',
          },
          descricao: {
            pt: 'O Porto atinge um novo patamar de eficiência, movimentando mais de 1 milhão de TEUs em um único ano.',
            en: 'The Port reaches a new level of efficiency, handling more than 1 million TEUs in a single year.',
            es: 'El Puerto alcanza un nuevo nivel de eficiencia, moviendo más de 1 millón de TEU en un solo año.',
          },
        },
        {
          _key: 'evento9',
          ano: '2025',
          titulo: {
            pt: 'Marco histórico',
            en: 'Historic milestone',
            es: 'Hito histórico',
          },
          descricao: {
            pt: 'O terminal celebra a movimentação de 10 milhões de TEUs desde o início de suas operações, um testemunho de sua trajetória de sucesso e eficiência contínua.',
            en: 'The terminal celebrates the movement of 10 million TEUs since the start of its operations, a testament to its trajectory of success and continuous efficiency.',
            es: 'El terminal celebra la movimentación de 10 millones de TEU desde el inicio de sus operaciones, un testimonio de su trayectoria de éxito y eficiencia continua.',
          },
        },
      ],
    },
    localizacao: {
      titulo: {
        pt: 'Localização',
        en: 'Location',
        es: 'Ubicación',
      },
      endereco: {
        pt: 'Av. Beira Mar 5, 2900 • Itapoá/SC',
        en: 'Av. Beira Mar 5, 2900 • Itapoá/SC',
        es: 'Av. Beira Mar 5, 2900 • Itapoá/SC',
      },
      coordenadas: {
        latitude: '-26.1167',
        longitude: '-48.6167',
      },
      descricao: {
        pt: 'A localização do Porto Itapoá é um diferencial competitivo. Situado no litoral norte de Santa Catarina, o terminal serve como um portal para as regiões mais produtivas do Brasil, otimizando a logística de importadores e exportadores de múltiplos segmentos. O terminal está integrado à Baía da Babitonga, um refúgio de águas calmas e profundas que garante condições seguras e facilitadas para a atracação dos maiores navios em operação na costa, minimizando atrasos e maximizando a eficiência.',
        en: 'The location of Porto Itapoá is a competitive advantage. Located on the northern coast of Santa Catarina, the terminal serves as a gateway to the most productive regions of Brazil, optimizing logistics for importers and exporters from multiple segments. The terminal is integrated with Babitonga Bay, a refuge of calm and deep waters that ensures safe and facilitated conditions for berthing the largest ships in operation on the coast, minimizing delays and maximizing efficiency.',
        es: 'La ubicación del Puerto Itapoá es una ventaja competitiva. Ubicado en la costa norte de Santa Catarina, el terminal sirve como puerta de entrada a las regiones más productivas de Brasil, optimizando la logística de importadores y exportadores de múltiples segmentos. El terminal está integrado con la Bahía de Babitonga, un refugio de aguas tranquilas y profundas que garantiza condiciones seguras y facilitadas para el atraque de los barcos más grandes en operación en la costa, minimizando retrasos y maximizando la eficiencia.',
      },
    },
  }

  try {
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

// CERTIFICAÇÕES E PRÊMIOS - Página 2
async function populateCertificacoes() {
  const data = {
    _type: 'certificacoes',
    title: {
      pt: 'Certificações e Prêmios',
      en: 'Certifications and Awards',
      es: 'Certificaciones y Premios',
    },
    description: {
      pt: 'Excelência em qualidade, segurança e gestão',
      en: 'Excellence in quality, safety and management',
      es: 'Excelencia en calidad, seguridad y gestión',
    },
    certificacoes: [
      {
        _key: 'cert1',
        nome: {
          pt: 'OEA (Operador Econômico Autorizado)',
          en: 'AEO (Authorized Economic Operator)',
          es: 'OEA (Operador Económico Autorizado)',
        },
        codigo: 'OEA',
        orgao: {
          pt: 'Receita Federal',
          en: 'Federal Revenue',
          es: 'Receita Federal',
        },
        dataEmissao: '2017-01-01',
        categoria: 'operacional',
        descricao: {
          pt: 'Concedida pela Receita Federal desde 2017, a certificação OEA qualifica o terminal como um parceiro estratégico de baixo risco e alta conformidade, garantindo maior agilidade e segurança no fluxo do comércio internacional.',
          en: 'Granted by the Federal Revenue since 2017, the AEO certification qualifies the terminal as a strategic low-risk, high-compliance partner, ensuring greater agility and security in international trade flow.',
          es: 'Concedida por la Receita Federal desde 2017, la certificación OEA califica al terminal como un socio estratégico de bajo riesgo y alta conformidad, garantizando mayor agilidad y seguridad en el flujo del comercio internacional.',
        },
      },
      {
        _key: 'cert2',
        nome: {
          pt: 'ISO 9001 (Gestão da Qualidade)',
          en: 'ISO 9001 (Quality Management)',
          es: 'ISO 9001 (Gestión de Calidad)',
        },
        codigo: 'ISO 9001:2015',
        orgao: {
          pt: 'Inmetro',
          en: 'Inmetro',
          es: 'Inmetro',
        },
        dataEmissao: '2014-01-01',
        categoria: 'qualidade',
        descricao: {
          pt: 'Validada pelo Inmetro desde 2014, esta norma internacional comprova que os processos do Porto Itapoá são desenhados para atender e superar as expectativas dos clientes, com foco na melhoria contínua e na eficiência operacional.',
          en: 'Validated by Inmetro since 2014, this international standard proves that Porto Itapoá processes are designed to meet and exceed customer expectations, with a focus on continuous improvement and operational efficiency.',
          es: 'Validada por Inmetro desde 2014, esta norma internacional comprueba que los procesos del Puerto Itapoá están diseñados para cumplir y superar las expectativas de los clientes, con enfoque en la mejora continua y la eficiencia operacional.',
        },
      },
      {
        _key: 'cert3',
        nome: {
          pt: 'ISO 14001 (Gestão Ambiental)',
          en: 'ISO 14001 (Environmental Management)',
          es: 'ISO 14001 (Gestión Ambiental)',
        },
        codigo: 'ISO 14001:2015',
        orgao: {
          pt: 'Inmetro',
          en: 'Inmetro',
          es: 'Inmetro',
        },
        dataEmissao: '2015-01-01',
        categoria: 'meio-ambiente',
        descricao: {
          pt: 'Desde 2015, esta certificação demonstra o profundo respeito do terminal pelo meio ambiente, validando um sistema de gestão robusto que assegura o cumprimento da legislação ambiental e promove práticas sustentáveis em todas as suas atividades.',
          en: 'Since 2015, this certification demonstrates the terminal\'s deep respect for the environment, validating a robust management system that ensures compliance with environmental legislation and promotes sustainable practices in all its activities.',
          es: 'Desde 2015, esta certificación demuestra el profundo respeto del terminal por el medio ambiente, validando un sistema de gestión robusto que asegura el cumplimiento de la legislación ambiental y promueve prácticas sostenibles en todas sus actividades.',
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

// PREMIAÇÕES - Página 2
async function populatePremiacoes() {
  const data = {
    _type: 'premiacoes',
    title: {
      pt: 'Reconhecimentos que inspiram',
      en: 'Recognition that inspires',
      es: 'Reconocimientos que inspiran',
    },
    description: {
      pt: 'Reconhecimentos e prêmios',
      en: 'Recognition and awards',
      es: 'Reconocimientos y premios',
    },
    reconhecimentos: [
      {
        _key: 'rec1',
        titulo: {
          pt: 'Referência em satisfação de clientes',
          en: 'Reference in customer satisfaction',
          es: 'Referencia en satisfacción de clientes',
        },
        descricao: {
          pt: 'O Porto Itapoá foi destaque por anos consecutivos no Fórum Brasileiro de Relacionamento com o Cliente (FBRC), alcançando um dos maiores índices NPS (Net Promoter Score) do Brasil. Este resultado o posiciona como o porto com os clientes mais fiéis e satisfeitos do país.',
          en: 'Porto Itapoá has been highlighted for consecutive years at the Brazilian Customer Relationship Forum (FBRC), achieving one of the highest NPS (Net Promoter Score) indices in Brazil. This result positions it as the port with the most loyal and satisfied customers in the country.',
          es: 'El Puerto Itapoá ha sido destacado durante años consecutivos en el Foro Brasileño de Relación con el Cliente (FBRC), alcanzando uno de los mayores índices NPS (Net Promoter Score) de Brasil. Este resultado lo posiciona como el puerto con los clientes más fieles y satisfechos del país.',
        },
      },
      {
        _key: 'rec2',
        titulo: {
          pt: 'Melhores em gestão de pessoas',
          en: 'Best in people management',
          es: 'Mejores en gestión de personas',
        },
        descricao: {
          pt: 'O Porto Itapoá é o único porto do Brasil a figurar no prestigiado ranking do jornal Valor Econômico. A filosofia da empresa é que as pessoas fazem a diferença, e este reconhecimento reflete o investimento contínuo na valorização e desenvolvimento de seus colaboradores.',
          en: 'Porto Itapoá is the only port in Brazil to appear in the prestigious ranking of Valor Econômico newspaper. The company\'s philosophy is that people make the difference, and this recognition reflects the continuous investment in valuing and developing its employees.',
          es: 'El Puerto Itapoá es el único puerto de Brasil en figurar en el prestigioso ranking del periódico Valor Económico. La filosofía de la empresa es que las personas marcan la diferencia, y este reconocimiento refleja la inversión continua en la valorización y desarrollo de sus colaboradores.',
        },
      },
      {
        _key: 'rec3',
        titulo: {
          pt: 'Prêmio Empresa Cidadã (ADVB/SC)',
          en: 'Citizen Company Award (ADVB/SC)',
          es: 'Premio Empresa Ciudadana (ADVB/SC)',
        },
        descricao: {
          pt: 'O terminal foi homenageado pelo impacto positivo de seu projeto "Ampliar", que fomenta o desenvolvimento social, o empreendedorismo e a geração de renda para a comunidade de Itapoá, reforçando seu papel como agente de transformação local.',
          en: 'The terminal was honored for the positive impact of its "Ampliar" project, which fosters social development, entrepreneurship and income generation for the Itapoá community, reinforcing its role as a local transformation agent.',
          es: 'El terminal fue homenajeado por el impacto positivo de su proyecto "Ampliar", que fomenta el desarrollo social, el emprendimiento y la generación de ingresos para la comunidad de Itapoá, reforzando su papel como agente de transformación local.',
        },
      },
      {
        _key: 'rec4',
        titulo: {
          pt: 'Navis Inspire Awards',
          en: 'Navis Inspire Awards',
          es: 'Navis Inspire Awards',
        },
        descricao: {
          pt: 'O Porto Itapoá recebeu este prêmio internacional em San Francisco, Califórnia, pelo impacto comunitário de suas ações sociais, um reconhecimento global de seu compromisso em crescer junto com a sociedade.',
          en: 'Porto Itapoá received this international award in San Francisco, California, for the community impact of its social actions, a global recognition of its commitment to grow together with society.',
          es: 'El Puerto Itapoá recibió este premio internacional en San Francisco, California, por el impacto comunitario de sus acciones sociales, un reconocimiento global de su compromiso de crecer junto con la sociedad.',
        },
      },
    ],
    premios: [
      {
        _key: 'premio1',
        ano: '2024',
        titulo: {
          pt: 'Prêmio Empresa Cidadã',
          en: 'Citizen Company Award',
          es: 'Premio Empresa Ciudadana',
        },
        categoria: {
          pt: 'Responsabilidade Social',
          en: 'Social Responsibility',
          es: 'Responsabilidad Social',
        },
        orgao: {
          pt: 'ADVB/SC',
          en: 'ADVB/SC',
          es: 'ADVB/SC',
        },
        descricao: {
          pt: 'Reconhecimento pelo projeto "Ampliar"',
          en: 'Recognition for the "Ampliar" project',
          es: 'Reconocimiento por el proyecto "Ampliar"',
        },
        nivel: 'regional',
      },
      {
        _key: 'premio2',
        ano: '2023',
        titulo: {
          pt: 'Navis Inspire Awards',
          en: 'Navis Inspire Awards',
          es: 'Navis Inspire Awards',
        },
        categoria: {
          pt: 'Impacto Comunitário',
          en: 'Community Impact',
          es: 'Impacto Comunitario',
        },
        orgao: {
          pt: 'Navis',
          en: 'Navis',
          es: 'Navis',
        },
        descricao: {
          pt: 'Reconhecimento internacional por ações sociais',
          en: 'International recognition for social actions',
          es: 'Reconocimiento internacional por acciones sociales',
        },
        nivel: 'internacional',
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

// ACIONISTAS - Página 7
async function populateAcionistas() {
  const data = {
    _type: 'acionistas',
    title: {
      pt: 'Acionistas',
      en: 'Shareholders',
      es: 'Accionistas',
    },
    description: {
      pt: 'Solidez e visão de futuro',
      en: 'Solidity and vision for the future',
      es: 'Solidez y visión de futuro',
    },
    estruturaAcionaria: {
      titulo: {
        pt: 'Estrutura Acionária',
        en: 'Shareholding Structure',
        es: 'Estructura Accionaria',
      },
      acionistas: [
        {
          _key: 'acionista1',
          nome: {
            pt: 'Portinvest',
            en: 'Portinvest',
            es: 'Portinvest',
          },
          participacao: '70%',
          tipo: 'controlador',
          descricao: {
            pt: 'A Portinvest é o principal veículo societário responsável pelo controle do terminal, detendo 70% de participação.',
            en: 'Portinvest is the main corporate vehicle responsible for terminal control, holding 70% participation.',
            es: 'Portinvest es el principal vehículo societario responsable del control del terminal, con 70% de participación.',
          },
        },
        {
          _key: 'acionista2',
          nome: {
            pt: 'Aliança Navegação e Logística (Hamburg Süd / Maersk)',
            en: 'Aliança Navigation and Logistics (Hamburg Süd / Maersk)',
            es: 'Aliança Navegación y Logística (Hamburg Süd / Maersk)',
          },
          participacao: '30%',
          tipo: 'minoritario',
          descricao: {
            pt: 'Uma das maiores companhias de navegação do mundo, detém os outros 30% diretamente no Porto Itapoá.',
            en: 'One of the world\'s largest shipping companies, holds the other 30% directly in Porto Itapoá.',
            es: 'Una de las mayores compañías de navegación del mundo, detiene el otro 30% directamente en el Puerto Itapoá.',
          },
        },
        {
          _key: 'acionista3',
          nome: {
            pt: 'Porto Sul',
            en: 'Porto Sul',
            es: 'Porto Sul',
          },
          participacao: '51%',
          tipo: 'controlador',
          descricao: {
            pt: 'Dentro da Portinvest, Porto Sul detém 51% de participação.',
            en: 'Within Portinvest, Porto Sul holds 51% participation.',
            es: 'Dentro de Portinvest, Porto Sul detiene 51% de participación.',
          },
        },
        {
          _key: 'acionista4',
          nome: {
            pt: 'N.O.G.S.P.E. Empreendimentos e Participações S.A.',
            en: 'N.O.G.S.P.E. Enterprises and Participations S.A.',
            es: 'N.O.G.S.P.E. Emprendimientos y Participaciones S.A.',
          },
          participacao: '49%',
          tipo: 'minoritario',
          descricao: {
            pt: 'Dentro da Portinvest, N.O.G.S.P.E. detém 49% de participação.',
            en: 'Within Portinvest, N.O.G.S.P.E. holds 49% participation.',
            es: 'Dentro de Portinvest, N.O.G.S.P.E. detiene 49% de participación.',
          },
        },
      ],
    },
    governanca: {
      titulo: {
        pt: 'Governança',
        en: 'Governance',
        es: 'Gobernanza',
      },
      conteudo: {
        pt: createBlockContent('Essa união estratégica garante ao Porto Itapoá não apenas uma base societária sólida, mas também expertise global e visão de longo prazo, fundamentais para o desenvolvimento sustentável e competitivo do terminal.'),
        en: createBlockContent('This strategic union guarantees Porto Itapoá not only a solid corporate base, but also global expertise and long-term vision, fundamental for the sustainable and competitive development of the terminal.'),
        es: createBlockContent('Esta unión estratégica garantiza al Puerto Itapoá no solo una base societaria sólida, sino también experiencia global y visión a largo plazo, fundamentales para el desarrollo sostenible y competitivo del terminal.'),
      },
      documentos: [],
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

// INFRAESTRUTURA - Página 3
async function populateInfraestrutura() {
  const data = {
    _type: 'infraestrutura',
    title: {
      pt: 'Infraestrutura',
      en: 'Infrastructure',
      es: 'Infraestructura',
    },
    description: {
      pt: 'Espaços configurados para operações de alta performance',
      en: 'Spaces configured for high performance operations',
      es: 'Espacios configurados para operaciones de alto rendimiento',
    },
    intro: {
      pt: createBlockContent('A infraestrutura do Porto Itapoá foi meticulosamente planejada para oferecer máxima eficiência, segurança e escalabilidade. O terminal combina vantagens naturais com tecnologia de ponta para garantir que cada navio e cada contêiner sejam operados com a agilidade que o mercado global exige.'),
      en: createBlockContent('The infrastructure of Porto Itapoá was meticulously planned to offer maximum efficiency, security and scalability. The terminal combines natural advantages with cutting-edge technology to ensure that every ship and every container is operated with the agility that the global market demands.'),
      es: createBlockContent('La infraestructura del Puerto Itapoá fue meticulosamente planificada para ofrecer máxima eficiencia, seguridad y escalabilidad. El terminal combina ventajas naturales con tecnología de punta para garantizar que cada barco y cada contenedor sean operados con la agilidad que exige el mercado global.'),
    },
    especificacoes: [
      {
        _key: 'espec1',
        categoria: {
          pt: 'Estrutura Geral',
          en: 'General Structure',
          es: 'Estructura General',
        },
        itens: [
          {
            _key: 'item1',
            caracteristica: {
              pt: 'Tipo de instalação',
              en: 'Installation type',
              es: 'Tipo de instalación',
            },
            especificacao: {
              pt: 'Terminal Autorizado Privado',
              en: 'Authorized Private Terminal',
              es: 'Terminal Privado Autorizado',
            },
          },
          {
            _key: 'item2',
            caracteristica: {
              pt: 'Área total de pátio',
              en: 'Total yard area',
              es: 'Área total de patio',
            },
            especificacao: {
              pt: '455.000 m²',
              en: '455,000 m²',
              es: '455.000 m²',
            },
          },
          {
            _key: 'item3',
            caracteristica: {
              pt: 'Gates de acesso',
              en: 'Access gates',
              es: 'Puertas de acceso',
            },
            especificacao: {
              pt: '8 (com OCR e biometria)',
              en: '8 (with OCR and biometrics)',
              es: '8 (con OCR y biometría)',
            },
          },
          {
            _key: 'item4',
            caracteristica: {
              pt: 'Tomadas reefer',
              en: 'Reefer outlets',
              es: 'Tomas reefer',
            },
            especificacao: {
              pt: '3.972',
              en: '3,972',
              es: '3.972',
            },
          },
          {
            _key: 'item5',
            caracteristica: {
              pt: 'Scanners',
              en: 'Scanners',
              es: 'Escáneres',
            },
            especificacao: {
              pt: '2 (de última geração)',
              en: '2 (state-of-the-art)',
              es: '2 (de última generación)',
            },
          },
        ],
      },
      {
        _key: 'espec2',
        categoria: {
          pt: 'Estrutura Marítima',
          en: 'Maritime Structure',
          es: 'Estructura Marítima',
        },
        itens: [
          {
            _key: 'item1',
            caracteristica: {
              pt: 'Berços de atracação',
              en: 'Berthing berths',
              es: 'Muelles de atraque',
            },
            especificacao: {
              pt: '2',
              en: '2',
              es: '2',
            },
          },
          {
            _key: 'item2',
            caracteristica: {
              pt: 'Comprimento total do cais',
              en: 'Total pier length',
              es: 'Longitud total del muelle',
            },
            especificacao: {
              pt: '800 metros',
              en: '800 meters',
              es: '800 metros',
            },
          },
          {
            _key: 'item3',
            caracteristica: {
              pt: 'Largura do cais',
              en: 'Pier width',
              es: 'Ancho del muelle',
            },
            especificacao: {
              pt: '43 metros',
              en: '43 meters',
              es: '43 metros',
            },
          },
          {
            _key: 'item4',
            caracteristica: {
              pt: 'Calado máximo de operação',
              en: 'Maximum operating draft',
              es: 'Calado máximo de operación',
            },
            especificacao: {
              pt: 'Varia de 11,00m a 12,80m (conforme comprimento do navio)',
              en: 'Varies from 11.00m to 12.80m (depending on ship length)',
              es: 'Varía de 11,00m a 12,80m (según longitud del barco)',
            },
          },
        ],
      },
      {
        _key: 'espec3',
        categoria: {
          pt: 'Equipamentos de Pátio',
          en: 'Yard Equipment',
          es: 'Equipos de Patio',
        },
        itens: [
          {
            _key: 'item1',
            caracteristica: {
              pt: 'RTGs (Rubber-Tired Gantry cranes)',
              en: 'RTGs (Rubber-Tired Gantry cranes)',
              es: 'RTGs (Grúas de pórtico sobre neumáticos)',
            },
            especificacao: {
              pt: '17',
              en: '17',
              es: '17',
            },
          },
          {
            _key: 'item2',
            caracteristica: {
              pt: 'RTGs (com operação remota)',
              en: 'RTGs (with remote operation)',
              es: 'RTGs (con operación remota)',
            },
            especificacao: {
              pt: '10',
              en: '10',
              es: '10',
            },
          },
          {
            _key: 'item3',
            caracteristica: {
              pt: 'Terminal tractors (TTs)',
              en: 'Terminal tractors (TTs)',
              es: 'Tractores de terminal (TTs)',
            },
            especificacao: {
              pt: '74 (incluindo a maior frota elétrica do Brasil)',
              en: '74 (including the largest electric fleet in Brazil)',
              es: '74 (incluyendo la mayor flota eléctrica de Brasil)',
            },
          },
          {
            _key: 'item4',
            caracteristica: {
              pt: 'Reach stackers',
              en: 'Reach stackers',
              es: 'Reach stackers',
            },
            especificacao: {
              pt: '6',
              en: '6',
              es: '6',
            },
          },
          {
            _key: 'item5',
            caracteristica: {
              pt: 'Empty handlers',
              en: 'Empty handlers',
              es: 'Manejadores de vacíos',
            },
            especificacao: {
              pt: '3',
              en: '3',
              es: '3',
            },
          },
        ],
      },
      {
        _key: 'espec4',
        categoria: {
          pt: 'Equipamentos de Cais',
          en: 'Pier Equipment',
          es: 'Equipos de Muelle',
        },
        itens: [
          {
            _key: 'item1',
            caracteristica: {
              pt: 'Portêineres (Ship-to-Shore)',
              en: 'Ship-to-Shore cranes',
              es: 'Portacontenedores (Ship-to-Shore)',
            },
            especificacao: {
              pt: '7 (Super Post-Panamax)',
              en: '7 (Super Post-Panamax)',
              es: '7 (Super Post-Panamax)',
            },
          },
          {
            _key: 'item2',
            caracteristica: {
              pt: 'Alcance horizontal (Outreach)',
              en: 'Horizontal reach (Outreach)',
              es: 'Alcance horizontal (Outreach)',
            },
            especificacao: {
              pt: '4 unidades: 55m (21 rows) / 3 unidades: 65m (23 rows)',
              en: '4 units: 55m (21 rows) / 3 units: 65m (23 rows)',
              es: '4 unidades: 55m (21 filas) / 3 unidades: 65m (23 filas)',
            },
          },
          {
            _key: 'item3',
            caracteristica: {
              pt: 'Alcance vertical (sob o spreader)',
              en: 'Vertical reach (under spreader)',
              es: 'Alcance vertical (bajo el spreader)',
            },
            especificacao: {
              pt: '4 unidades: 42m / 3 unidades: 45m',
              en: '4 units: 42m / 3 units: 45m',
              es: '4 unidades: 42m / 3 unidades: 45m',
            },
          },
          {
            _key: 'item4',
            caracteristica: {
              pt: 'Spreaders',
              en: 'Spreaders',
              es: 'Spreaders',
            },
            especificacao: {
              pt: 'Twin lift (capacidade para dois contêineres simultâneos)',
              en: 'Twin lift (capacity for two containers simultaneously)',
              es: 'Twin lift (capacidad para dos contenedores simultáneos)',
            },
          },
        ],
      },
      {
        _key: 'espec5',
        categoria: {
          pt: 'Capacidade de Navios',
          en: 'Ship Capacity',
          es: 'Capacidad de Barcos',
        },
        itens: [
          {
            _key: 'item1',
            caracteristica: {
              pt: 'Comprimento Máximo (LOA)',
              en: 'Maximum Length (LOA)',
              es: 'Longitud Máxima (LOA)',
            },
            especificacao: {
              pt: '336 metros',
              en: '336 meters',
              es: '336 metros',
            },
          },
          {
            _key: 'item2',
            caracteristica: {
              pt: 'Largura Máxima (Boca)',
              en: 'Maximum Width (Beam)',
              es: 'Ancho Máximo (Manga)',
            },
            especificacao: {
              pt: '48,3 metros',
              en: '48.3 meters',
              es: '48,3 metros',
            },
          },
          {
            _key: 'item3',
            caracteristica: {
              pt: 'TPB Máximo (Tonelagem)',
              en: 'Maximum DWT (Deadweight Tonnage)',
              es: 'TPB Máximo (Tonelaje)',
            },
            especificacao: {
              pt: '150.000',
              en: '150,000',
              es: '150.000',
            },
          },
        ],
      },
    ],
    planosExpansao: {
      pt: createBlockContent('Diante do crescimento das operações e da demanda do mercado por terminais ágeis, o Porto Itapoá avança para a fase final de seu projeto de expansão. Hoje, o terminal possui dois berços que somam 800 metros de cais, permitindo a atracação simultânea de dois navios da classe Super Post-Panamax. Com o projeto de ampliação, o Porto Itapoá terá três berços, totalizando um píer de 1.200 metros, e sua capacidade de movimentação anual será elevada para 2 milhões de TEUs. Essa expansão, que quadruplicará a área inicial do empreendimento, reafirma o compromisso do terminal em se antecipar às necessidades futuras da navegação e do comércio exterior.'),
      en: createBlockContent('Given the growth of operations and market demand for agile terminals, Porto Itapoá advances to the final phase of its expansion project. Today, the terminal has two berths totaling 800 meters of pier, allowing simultaneous berthing of two Super Post-Panamax class ships. With the expansion project, Porto Itapoá will have three berths, totaling a 1,200-meter pier, and its annual handling capacity will be increased to 2 million TEUs. This expansion, which will quadruple the initial area of the venture, reaffirms the terminal\'s commitment to anticipating future needs of navigation and foreign trade.'),
      es: createBlockContent('Ante el crecimiento de las operaciones y la demanda del mercado por terminales ágiles, el Puerto Itapoá avanza hacia la fase final de su proyecto de expansión. Hoy, el terminal tiene dos muelles que suman 800 metros de muelle, permitiendo el atraque simultáneo de dos barcos de la clase Super Post-Panamax. Con el proyecto de ampliación, el Puerto Itapoá tendrá tres muelles, totalizando un muelle de 1.200 metros, y su capacidad de movimentación anual será elevada a 2 millones de TEU. Esta expansión, que cuadruplicará el área inicial del emprendimiento, reafirma el compromiso del terminal de anticiparse a las necesidades futuras de la navegación y el comercio exterior.'),
    },
    cargaRefrigerada: {
      pt: createBlockContent('O Porto Itapoá é referência no manuseio de cargas refrigeradas, uma das principais demandas de exportação da região. O terminal está equipado com 3.972 tomadas reefer, que alimentam os contêineres 24 horas por dia. As cargas são submetidas a um monitoramento contínuo e rigoroso, garantindo a integridade e a qualidade dos produtos.'),
      en: createBlockContent('Porto Itapoá is a reference in handling refrigerated cargo, one of the main export demands in the region. The terminal is equipped with 3,972 reefer outlets that power containers 24 hours a day. Cargoes are subjected to continuous and rigorous monitoring, ensuring the integrity and quality of products.'),
      es: createBlockContent('El Puerto Itapoá es referencia en el manejo de cargas refrigeradas, una de las principales demandas de exportación de la región. El terminal está equipado con 3.972 tomas reefer, que alimentan los contenedores 24 horas al día. Las cargas son sometidas a un monitoreo continuo y riguroso, garantizando la integridad y calidad de los productos.'),
    },
    acessoTerrestre: {
      pt: createBlockContent('Os oito gates do Porto Itapoá operam 24 horas por dia de forma dinâmica, com pistas reversíveis que se adaptam ao fluxo de entrada e saída. O processo é altamente automatizado. Informações do contêiner, do caminhão e do peso são coletadas instantaneamente via tecnologia OCR (Reconhecimento Óptico de Caracteres), minimizando erros e economizando tempo. O acesso biométrico para identificação do motorista torna o processo ainda mais rápido e seguro. Graças a essa configuração, o tempo médio de permanência de caminhões no terminal é um dos menores do continente.'),
      en: createBlockContent('The eight gates of Porto Itapoá operate 24 hours a day dynamically, with reversible lanes that adapt to entry and exit flow. The process is highly automated. Container, truck and weight information is collected instantly via OCR (Optical Character Recognition) technology, minimizing errors and saving time. Biometric access for driver identification makes the process even faster and safer. Thanks to this configuration, the average truck dwell time at the terminal is one of the lowest on the continent.'),
      es: createBlockContent('Las ocho puertas del Puerto Itapoá operan 24 horas al día de forma dinámica, con carriles reversibles que se adaptan al flujo de entrada y salida. El proceso es altamente automatizado. La información del contenedor, del camión y del peso se recopila instantáneamente mediante tecnología OCR (Reconocimiento Óptico de Caracteres), minimizando errores y ahorrando tiempo. El acceso biométrico para identificación del conductor hace que el proceso sea aún más rápido y seguro. Gracias a esta configuración, el tiempo promedio de permanencia de camiones en el terminal es uno de los más bajos del continente.'),
    },
  }

  try {
    const existing = await client.fetch('*[_type == "infraestrutura"][0]')
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Infraestrutura atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Infraestrutura criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Infraestrutura:', error)
    throw error
  }
}

// DIFERENCIAIS - Página 4
async function populateDiferenciais() {
  const data = {
    _type: 'diferenciais',
    title: {
      pt: 'Diferenciais',
      en: 'Differentiators',
      es: 'Diferenciadores',
    },
    description: {
      pt: 'Por que escolher o Porto Itapoá?',
      en: 'Why choose Porto Itapoá?',
      es: '¿Por qué elegir el Puerto Itapoá?',
    },
    diferenciais: [
      {
        _key: 'diff1',
        titulo: {
          pt: 'Localização estratégica',
          en: 'Strategic location',
          es: 'Ubicación estratégica',
        },
        descricao: {
          pt: 'Estamos próximos das BR-101 e BR-116, o que nos garante fácil escoamento de cargas para estados do Norte e do Sul do Brasil.',
          en: 'We are close to BR-101 and BR-116, which ensures easy cargo flow to states in the North and South of Brazil.',
          es: 'Estamos cerca de BR-101 y BR-116, lo que nos garantiza fácil flujo de carga hacia estados del Norte y Sur de Brasil.',
        },
      },
      {
        _key: 'diff2',
        titulo: {
          pt: 'Processos certificados',
          en: 'Certified processes',
          es: 'Procesos certificados',
        },
        descricao: {
          pt: 'Seguimos padrões internacionais de qualidade e sustentabilidade, com certificações ISO 9001, ISO 14001 e OEA.',
          en: 'We follow international quality and sustainability standards, with ISO 9001, ISO 14001 and AEO certifications.',
          es: 'Seguimos estándares internacionales de calidad y sostenibilidad, con certificaciones ISO 9001, ISO 14001 y OEA.',
        },
      },
      {
        _key: 'diff3',
        titulo: {
          pt: 'Atendimento de excelência',
          en: 'Excellent service',
          es: 'Atención de excelencia',
        },
        descricao: {
          pt: 'Valorizamos cada relacionamento e oferecemos atendimento exclusivo a clientes, parceiros e transportadoras por WhatsApp, telefone e e-mail.',
          en: 'We value every relationship and offer exclusive service to customers, partners and carriers via WhatsApp, phone and email.',
          es: 'Valorizamos cada relación y ofrecemos atención exclusiva a clientes, socios y transportistas por WhatsApp, teléfono y correo electrónico.',
        },
      },
      {
        _key: 'diff4',
        titulo: {
          pt: 'Equipamentos modernos',
          en: 'Modern equipment',
          es: 'Equipos modernos',
        },
        descricao: {
          pt: 'Operamos com portêineres, RTGs, TTs, Reach Stackers e Scanner de última geração para garantir eficiência e qualidade nas operações.',
          en: 'We operate with ship-to-shore cranes, RTGs, TTs, Reach Stackers and state-of-the-art scanners to ensure efficiency and quality in operations.',
          es: 'Operamos con portacontenedores, RTGs, TTs, Reach Stackers y Escáneres de última generación para garantizar eficiencia y calidad en las operaciones.',
        },
      },
      {
        _key: 'diff5',
        titulo: {
          pt: 'Ferramentas online',
          en: 'Online tools',
          es: 'Herramientas online',
        },
        descricao: {
          pt: 'Disponibilizamos acesso digital a relatórios e dados das cargas, proporcionando maior controle e transparência para clientes e despachantes.',
          en: 'We provide digital access to reports and cargo data, providing greater control and transparency for customers and forwarders.',
          es: 'Proporcionamos acceso digital a informes y datos de carga, proporcionando mayor control y transparencia para clientes y despachantes.',
        },
      },
      {
        _key: 'diff6',
        titulo: {
          pt: 'Transit Time (Linha Ásia)',
          en: 'Transit Time (Asia Line)',
          es: 'Tiempo de Tránsito (Línea Asia)',
        },
        descricao: {
          pt: 'Com arranjo realizado por Maersk/HSG, oferecemos o melhor tempo de trânsito entre os terminais do Sul e o mercado asiático na importação.',
          en: 'With an arrangement made by Maersk/HSG, we offer the best transit time between terminals in the South and the Asian market for imports.',
          es: 'Con un arreglo realizado por Maersk/HSG, ofrecemos el mejor tiempo de tránsito entre los terminales del Sur y el mercado asiático en la importación.',
        },
      },
      {
        _key: 'diff7',
        titulo: {
          pt: 'Portfólio de serviços',
          en: 'Service portfolio',
          es: 'Portafolio de servicios',
        },
        descricao: {
          pt: 'Atendemos importação e exportação com as principais rotas de navegação para Europa, Américas, Ásia e África.',
          en: 'We serve import and export with the main shipping routes to Europe, Americas, Asia and Africa.',
          es: 'Atendemos importación y exportación con las principales rutas de navegación hacia Europa, Américas, Asia y África.',
        },
      },
      {
        _key: 'diff8',
        titulo: {
          pt: 'Valores de pedágio',
          en: 'Toll values',
          es: 'Valores de peaje',
        },
        descricao: {
          pt: 'Estamos em uma região com um dos melhores custos de pedágio do país, aliados à alta qualidade das rodovias catarinenses.',
          en: 'We are in a region with one of the best toll costs in the country, combined with the high quality of Santa Catarina highways.',
          es: 'Estamos en una región con uno de los mejores costos de peaje del país, junto con la alta calidad de las carreteras de Santa Catarina.',
        },
      },
      {
        _key: 'diff9',
        titulo: {
          pt: 'Estudo THC',
          en: 'THC Study',
          es: 'Estudio THC',
        },
        descricao: {
          pt: 'Possibilitamos operações até 20% mais rentáveis ao considerar custos de THC (Terminal Handling Charge) em comparação a outros terminais.',
          en: 'We enable operations up to 20% more profitable when considering THC (Terminal Handling Charge) costs compared to other terminals.',
          es: 'Posibilitamos operaciones hasta un 20% más rentables al considerar costos de THC (Terminal Handling Charge) en comparación con otros terminales.',
        },
      },
      {
        _key: 'diff10',
        titulo: {
          pt: 'Qualidade reconhecida',
          en: 'Recognized quality',
          es: 'Calidad reconocida',
        },
        descricao: {
          pt: 'Somos um dos terminais mais ágeis e eficientes da América Latina e referência nacional na movimentação de cargas conteinerizadas.',
          en: 'We are one of the most agile and efficient terminals in Latin America and a national reference in containerized cargo handling.',
          es: 'Somos uno de los terminales más ágiles y eficientes de América Latina y referencia nacional en la movimentación de cargas conteinerizadas.',
        },
      },
    ],
  }

  try {
    const existing = await client.fetch('*[_type == "diferenciais"][0]')
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Diferenciais atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Diferenciais criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Diferenciais:', error)
    throw error
  }
}

// DOWNLOADS - Página 5
async function populateDownloads() {
  const data = {
    _type: 'downloads',
    title: {
      pt: 'Central de Downloads',
      en: 'Download Center',
      es: 'Centro de Descargas',
    },
    description: {
      pt: 'A transparência é um dos valores fundamentais do Porto Itapoá. Nesta seção, é possível acessar documentos importantes sobre sua gestão financeira, operacional e de sustentabilidade.',
      en: 'Transparency is one of the fundamental values of Porto Itapoá. In this section, you can access important documents about its financial, operational and sustainability management.',
      es: 'La transparencia es uno de los valores fundamentales del Puerto Itapoá. En esta sección, es posible acceder a documentos importantes sobre su gestión financiera, operacional y de sostenibilidad.',
    },
    categorias: [
      {
        _key: 'cat1',
        nome: {
          pt: 'Tabela de Preços',
          en: 'Price Table',
          es: 'Tabla de Precios',
        },
        arquivos: [
          {
            _key: 'file1',
            nome: {
              pt: 'Preços e Serviços 2025',
              en: 'Prices and Services 2025',
              es: 'Precios y Servicios 2025',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2024/12/Tabela-Publica-2025-Final-6.pdf',
            tipo: 'PDF',
          },
        ],
      },
      {
        _key: 'cat2',
        nome: {
          pt: 'Demonstrações financeiras',
          en: 'Financial statements',
          es: 'Estados financieros',
        },
        arquivos: [
          {
            _key: 'file2',
            nome: {
              pt: 'Arquivos financeiros 2013',
              en: 'Financial files 2013',
              es: 'Archivos financieros 2013',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/2012-2013.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file3',
            nome: {
              pt: 'Arquivos financeiros 2014',
              en: 'Financial files 2014',
              es: 'Archivos financieros 2014',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/2013-2014.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file4',
            nome: {
              pt: 'Arquivos financeiros 2015',
              en: 'Financial files 2015',
              es: 'Archivos financieros 2015',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/2014-2015.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file5',
            nome: {
              pt: 'Arquivos financeiros 2016',
              en: 'Financial files 2016',
              es: 'Archivos financieros 2016',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/2015-2016.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file6',
            nome: {
              pt: 'Arquivos financeiros 2017',
              en: 'Financial files 2017',
              es: 'Archivos financieros 2017',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/2017.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file7',
            nome: {
              pt: 'Arquivos financeiros 2018',
              en: 'Financial files 2018',
              es: 'Archivos financieros 2018',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/2018.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file8',
            nome: {
              pt: 'Arquivos financeiros 2019',
              en: 'Financial files 2019',
              es: 'Archivos financieros 2019',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/2019.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file9',
            nome: {
              pt: 'Arquivos financeiros 2020',
              en: 'Financial files 2020',
              es: 'Archivos financieros 2020',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2021/03/DF-Porto-Itapoa-31.12.2020.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file10',
            nome: {
              pt: 'Arquivos financeiros 2021',
              en: 'Financial files 2021',
              es: 'Archivos financieros 2021',
            },
            url: 'https://www.portoitapoa.com/files/DF%20Porto%20Itapo%C3%A1%2031.12.2021.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file11',
            nome: {
              pt: 'Arquivos financeiros 2022',
              en: 'Financial files 2022',
              es: 'Archivos financieros 2022',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/03/1148948_DF-Porto-Itapoa-31.12.2022-e-2021.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file12',
            nome: {
              pt: 'Arquivos financeiros 2023',
              en: 'Financial files 2023',
              es: 'Archivos financieros 2023',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2024/03/DF-Porto-Itapoa-31.12.2023-e-2022.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file13',
            nome: {
              pt: 'Arquivos financeiros 2024',
              en: 'Financial files 2024',
              es: 'Archivos financieros 2024',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2025/04/1409276_DF-Porto-Itapoa-31.12.2024-e-2023_CLIENTE.pdf',
            tipo: 'PDF',
          },
        ],
      },
      {
        _key: 'cat3',
        nome: {
          pt: 'Formulários',
          en: 'Forms',
          es: 'Formularios',
        },
        arquivos: [
          {
            _key: 'file14',
            nome: {
              pt: 'Remoção Cancelamento de Embarque (Exportação)',
              en: 'Removal Cancellation of Shipment (Export)',
              es: 'Remoción Cancelación de Embarque (Exportación)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RemocaoCancelamentoEmbarque-Exportacao.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file15',
            nome: {
              pt: 'Requisição Cross Docking (Exportação)',
              en: 'Cross Docking Request (Export)',
              es: 'Requisición Cross Docking (Exportación)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoCrossDockingExportacao.xls',
            tipo: 'XLS',
          },
          {
            _key: 'file16',
            nome: {
              pt: 'Requisição Cross Docking (Importação)',
              en: 'Cross Docking Request (Import)',
              es: 'Requisición Cross Docking (Importación)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoCrossDockingImportacao.xls',
            tipo: 'XLS',
          },
          {
            _key: 'file17',
            nome: {
              pt: 'Requisição Entrega (Carga Solta)',
              en: 'Delivery Request (Loose Cargo)',
              es: 'Requisición Entrega (Carga Suelta)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoEntregaCargaSolta.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file18',
            nome: {
              pt: 'Requisição Entrega (Carga Consolidada)',
              en: 'Delivery Request (Consolidated Cargo)',
              es: 'Requisición Entrega (Carga Consolidada)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoRetiradaCargaConsolidada.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file19',
            nome: {
              pt: 'Requisição Entrega (Carga Consolidada DTA)',
              en: 'Delivery Request (Consolidated Cargo DTA)',
              es: 'Requisición Entrega (Carga Consolidada DTA)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoRetiradaCargaConsolidadaDTA.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file20',
            nome: {
              pt: 'Requisição Retirada Excesso',
              en: 'Excess Removal Request',
              es: 'Requisición Retirada Exceso',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoRetiradaExcesso.xls',
            tipo: 'XLS',
          },
          {
            _key: 'file21',
            nome: {
              pt: 'Requisição Segregação DTC',
              en: 'DTC Segregation Request',
              es: 'Requisición Segregación DTC',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoSegregacaoDTC.xls',
            tipo: 'XLS',
          },
          {
            _key: 'file22',
            nome: {
              pt: 'Requisição Serviço Inspeção',
              en: 'Inspection Service Request',
              es: 'Requisición Servicio Inspección',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RequisicaoServicoInspecao.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file23',
            nome: {
              pt: 'Retirada (Importação)',
              en: 'Withdrawal (Import)',
              es: 'Retirada (Importación)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/RetiradaImportacao.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file24',
            nome: {
              pt: 'Retirada DUIMP',
              en: 'DUIMP Withdrawal',
              es: 'Retirada DUIMP',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2025/01/RetiradaImportacao-DUIMP-1-2.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file25',
            nome: {
              pt: 'Solicitação Presença Carga (Exportação)',
              en: 'Cargo Presence Request (Export)',
              es: 'Solicitud Presencia Carga (Exportación)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/SolicitacaoPresencaCarga-Exportacao.xlsx',
            tipo: 'XLSX',
          },
          {
            _key: 'file26',
            nome: {
              pt: 'Retirada de Importação - Processo Administrativo (Leilão)',
              en: 'Import Withdrawal - Administrative Process (Auction)',
              es: 'Retirada de Importación - Proceso Administrativo (Subasta)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/10/RETIRADA_DE_IMPORTACAO_-_PROCESSO_ADMINISTRATIVO_LEILAO.xlsx',
            tipo: 'XLSX',
          },
        ],
      },
      {
        _key: 'cat4',
        nome: {
          pt: 'Materiais publicitários',
          en: 'Promotional materials',
          es: 'Materiales promocionales',
        },
        arquivos: [
          {
            _key: 'file27',
            nome: {
              pt: 'Canais Ouvidoria',
              en: 'Ombudsman Channels',
              es: 'Canales Ombudsman',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/CanaisOuvidoria-12.04.19.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file28',
            nome: {
              pt: 'Cartilha Orientações COVID',
              en: 'COVID Guidelines Brochure',
              es: 'Cartilla Orientaciones COVID',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/CartilhaOrientacoesCovid19-01.03.2020.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file29',
            nome: {
              pt: 'Diferenciais (Porto Itapoá)',
              en: 'Differentiators (Porto Itapoá)',
              es: 'Diferenciadores (Puerto Itapoá)',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/DiferenciaisPortoItapoa-30.04.2020.pdf',
            tipo: 'PDF',
          },
        ],
      },
      {
        _key: 'cat5',
        nome: {
          pt: 'Procedimentos',
          en: 'Procedures',
          es: 'Procedimientos',
        },
        arquivos: [
          {
            _key: 'file30',
            nome: {
              pt: 'Cartas e Protestos',
              en: 'Letters and Protests',
              es: 'Cartas y Protestos',
            },
            url: 'https://www.portoitapoa.com/files/Cartas%20Protestos.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file31',
            nome: {
              pt: 'Política de Gestão Integrada',
              en: 'Integrated Management Policy',
              es: 'Política de Gestión Integrada',
            },
            url: 'https://www.portoitapoa.com/files/politica_gest%C3%A3ointegrada_final.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file32',
            nome: {
              pt: 'Glossário LGPD Final',
              en: 'LGPD Glossary Final',
              es: 'Glosario LGPD Final',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2021/07/Glossario-LGPD-Final.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file33',
            nome: {
              pt: 'Princípios da LGPD',
              en: 'LGPD Principles',
              es: 'Principios de la LGPD',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2021/07/Principios-da-LGPD.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file34',
            nome: {
              pt: 'Direito dos Titulares',
              en: 'Data Subject Rights',
              es: 'Derecho de los Titulares',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2021/07/Direito-dos-Titulares.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file35',
            nome: {
              pt: 'Manual Básico da LGPD',
              en: 'LGPD Basic Manual',
              es: 'Manual Básico de la LGPD',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2021/07/Manual-Basico-da-LGPD.pdf',
            tipo: 'PDF',
          },
          {
            _key: 'file36',
            nome: {
              pt: 'Cartilha Política de Privacidade',
              en: 'Privacy Policy Brochure',
              es: 'Cartilla Política de Privacidad',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2021/02/JOB03_Cartilha-politica-de-privacidade_EXTERNO_virtual.pdf',
            tipo: 'PDF',
          },
        ],
      },
      {
        _key: 'cat6',
        nome: {
          pt: 'Relatórios',
          en: 'Reports',
          es: 'Informes',
        },
        arquivos: [
          {
            _key: 'file37',
            nome: {
              pt: 'Pacto Global 2021',
              en: 'Global Compact 2021',
              es: 'Pacto Global 2021',
            },
            url: 'https://www.portoitapoa.com/files/PactoGlobal_PortoItapoa2021.pdf',
            tipo: 'PDF',
          },
        ],
      },
    ],
  }

  try {
    const existing = await client.fetch('*[_type == "downloads"][0]')
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Downloads atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Downloads criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Downloads:', error)
    throw error
  }
}

// LGPD - Página 6
async function populateLGPD() {
  const data = {
    _type: 'lgpd',
    title: {
      pt: 'LGPD',
      en: 'LGPD',
      es: 'LGPD',
    },
    description: {
      pt: 'O compromisso do Porto Itapoá com a privacidade de dados',
      en: 'Porto Itapoá\'s commitment to data privacy',
      es: 'El compromiso del Puerto Itapoá con la privacidad de datos',
    },
    intro: {
      pt: createBlockContent('O Porto Itapoá valoriza e respeita a privacidade de dados. Em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/18), adota as mais rigorosas práticas para garantir que o tratamento de dados pessoais seja realizado de forma ética, segura e transparente. O objetivo é proteger os direitos fundamentais de liberdade e privacidade dos titulares.'),
      en: createBlockContent('Porto Itapoá values and respects data privacy. In full compliance with the General Data Protection Law (LGPD - Law No. 13.709/18), it adopts the most rigorous practices to ensure that personal data processing is carried out ethically, safely and transparently. The objective is to protect the fundamental rights of freedom and privacy of data subjects.'),
      es: createBlockContent('El Puerto Itapoá valora y respeta la privacidad de datos. En total conformidad con la Ley General de Protección de Datos (LGPD - Ley nº 13.709/18), adopta las prácticas más rigurosas para garantizar que el tratamiento de datos personales se realice de forma ética, segura y transparente. El objetivo es proteger los derechos fundamentales de libertad y privacidad de los titulares.'),
    },
    dpo: {
      descricao: {
        pt: createBlockContent('O terminal disponibiliza um Encarregado de Proteção de Dados (DPO), profissional responsável por atuar como o principal canal de comunicação entre os titulares dos dados, o Porto Itapoá e a Autoridade Nacional de Proteção de Dados (ANPD), assegurando a gestão segura e transparente das informações e o pronto atendimento a quaisquer solicitações.'),
        en: createBlockContent('The terminal provides a Data Protection Officer (DPO), a professional responsible for acting as the main communication channel between data subjects, Porto Itapoá and the National Data Protection Authority (ANPD), ensuring secure and transparent information management and prompt response to any requests.'),
        es: createBlockContent('El terminal proporciona un Encargado de Protección de Datos (DPO), profesional responsable de actuar como el principal canal de comunicación entre los titulares de datos, el Puerto Itapoá y la Autoridad Nacional de Protección de Datos (ANPD), asegurando la gestión segura y transparente de la información y la pronta respuesta a cualquier solicitud.'),
      },
    },
    documentacao: [
      {
        _key: 'doc1',
        titulo: {
          pt: 'Princípios da LGPD',
          en: 'LGPD Principles',
          es: 'Principios de la LGPD',
        },
        url: 'https://www.portoitapoa.com/wp-content/uploads/2021/07/Principios-da-LGPD.pdf',
      },
      {
        _key: 'doc2',
        titulo: {
          pt: 'Manual básico da LGPD',
          en: 'LGPD Basic Manual',
          es: 'Manual básico de la LGPD',
        },
        url: 'https://www.portoitapoa.com/wp-content/uploads/2021/07/Manual-Basico-da-LGPD.pdf',
      },
      {
        _key: 'doc3',
        titulo: {
          pt: 'Política de Privacidade e Proteção de Dados Pessoais',
          en: 'Privacy and Personal Data Protection Policy',
          es: 'Política de Privacidad y Protección de Datos Personales',
        },
        url: 'https://www.portoitapoa.com/wp-content/uploads/2021/02/JOB03_Cartilha-politica-de-privacidade_EXTERNO_virtual.pdf',
      },
      {
        _key: 'doc4',
        titulo: {
          pt: 'Glossário (LGPD)',
          en: 'Glossary (LGPD)',
          es: 'Glosario (LGPD)',
        },
        url: 'https://www.portoitapoa.com/wp-content/uploads/2021/07/Glossario-LGPD-Final.pdf',
      },
    ],
  }

  try {
    const existing = await client.fetch('*[_type == "lgpd"][0]')
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ LGPD atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ LGPD criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular LGPD:', error)
    throw error
  }
}

// CANAL DE DENÚNCIAS - Página 8
async function populateCanalDenuncias() {
  const data = {
    _type: 'canalDenuncias',
    title: {
      pt: 'Canal de Denúncias',
      en: 'Whistleblowing Channel',
      es: 'Canal de Denuncias',
    },
    description: {
      pt: 'Ética e compromisso com a integridade',
      en: 'Ethics and commitment to integrity',
      es: 'Ética y compromiso con la integridad',
    },
    intro: {
      pt: createBlockContent('A integridade é a base de todas as relações do Porto Itapoá. O terminal mantém um Canal de Denúncias seguro e confidencial para que seu público interno e externo (colaboradores, clientes, fornecedores e comunidade) possam relatar qualquer conduta que considerem suspeita ou que viole o Código de Ética, as políticas internas ou a legislação. Este canal é um pilar da governança do Porto Itapoá. Seu uso responsável é encorajado para fortalecer um ambiente de negócios cada vez mais ético e transparente.'),
      en: createBlockContent('Integrity is the foundation of all Porto Itapoá relationships. The terminal maintains a secure and confidential Whistleblowing Channel so that its internal and external audience (employees, customers, suppliers and community) can report any conduct they consider suspicious or that violates the Code of Ethics, internal policies or legislation. This channel is a pillar of Porto Itapoá governance. Its responsible use is encouraged to strengthen an increasingly ethical and transparent business environment.'),
      es: createBlockContent('La integridad es la base de todas las relaciones del Puerto Itapoá. El terminal mantiene un Canal de Denuncias seguro y confidencial para que su público interno y externo (colaboradores, clientes, proveedores y comunidad) puedan reportar cualquier conducta que consideren sospechosa o que viole el Código de Ética, las políticas internas o la legislación. Este canal es un pilar de la gobernanza del Puerto Itapoá. Se alienta su uso responsable para fortalecer un ambiente de negocios cada vez más ético y transparente.'),
    },
    garantias: [
      {
        _key: 'gar1',
        titulo: {
          pt: 'Operação independente',
          en: 'Independent operation',
          es: 'Operación independiente',
        },
        descricao: {
          pt: 'O canal é administrado por uma empresa terceirizada e especializada, garantindo o anonimato absoluto para quem não deseja se identificar.',
          en: 'The channel is managed by a specialized third-party company, ensuring absolute anonymity for those who do not wish to be identified.',
          es: 'El canal es administrado por una empresa tercerizada y especializada, garantizando el anonimato absoluto para quienes no desean identificarse.',
        },
      },
      {
        _key: 'gar2',
        titulo: {
          pt: 'Análise criteriosa',
          en: 'Thorough analysis',
          es: 'Análisis criterioso',
        },
        descricao: {
          pt: 'Cada relato é analisado de forma imparcial pelo Comitê de Ética do Porto Itapoá. Membros do comitê que sejam citados em denúncias são imediatamente afastados da análise do caso.',
          en: 'Each report is analyzed impartially by the Porto Itapoá Ethics Committee. Committee members who are mentioned in complaints are immediately removed from the case analysis.',
          es: 'Cada relato es analizado de forma imparcial por el Comité de Ética del Puerto Itapoá. Los miembros del comité que sean citados en denuncias son inmediatamente apartados del análisis del caso.',
        },
      },
      {
        _key: 'gar3',
        titulo: {
          pt: 'Transparência e retorno',
          en: 'Transparency and feedback',
          es: 'Transparencia y retorno',
        },
        descricao: {
          pt: 'Ao registrar um relato, o usuário recebe um número de protocolo que permite acompanhar o andamento e a resolução do caso. Todas as denúncias recebem uma resposta.',
          en: 'When registering a report, the user receives a protocol number that allows them to track the progress and resolution of the case. All complaints receive a response.',
          es: 'Al registrar un relato, el usuario recibe un número de protocolo que permite seguir el progreso y la resolución del caso. Todas las denuncias reciben una respuesta.',
        },
      },
    ],
    links: {
      codigoEtica: 'https://www.portoitapoa.com/wp-content/uploads/2020/10/C_GDP_01_CODIGO_DE_ETICA_E_CONDUTA.pdf',
      registrarDenuncia: 'https://canaldedenuncias.compliancebox.com.br/ocorrencia/denuncia',
      registrarDuvida: 'https://canaldedenuncias.compliancebox.com.br/ocorrencia/duvida',
      consultarOcorrencias: 'https://canaldedenuncias.compliancebox.com.br/ocorrencia/buscar',
      telefone: '0800-880-5555',
    },
  }

  try {
    const existing = await client.fetch('*[_type == "canalDenuncias"][0]')
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Canal de Denúncias atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Canal de Denúncias criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Canal de Denúncias:', error)
    throw error
  }
}

// PROCEDIMENTOS OPERACIONAIS - Página 9
async function populateProcedimentosOperacionais() {
  const data = {
    _type: 'procedimentosOperacionais',
    title: {
      pt: 'Procedimentos Operacionais',
      en: 'Operational Procedures',
      es: 'Procedimientos Operacionales',
    },
    description: {
      pt: 'Diretrizes de segurança e meio ambiente',
      en: 'Safety and environmental guidelines',
      es: 'Directrices de seguridad y medio ambiente',
    },
    procedimentos: [
      {
        _key: 'proc1',
        titulo: {
          pt: 'Gestão de Resíduos de Embarcações',
          en: 'Ship Waste Management',
          es: 'Gestión de Residuos de Embarcaciones',
        },
        descricao: {
          pt: createBlockContent('Em conformidade com a legislação ambiental brasileira, o Porto Itapoá estabelece um procedimento rigoroso para a retirada, transporte e destinação de resíduos de embarcações. O objetivo é garantir a correta gestão ambiental e a segurança das operações no cais. O terminal não executa diretamente este serviço, mas disciplina e fiscaliza a atuação de empresas especializadas.'),
          en: createBlockContent('In compliance with Brazilian environmental legislation, Porto Itapoá establishes a rigorous procedure for the removal, transport and disposal of ship waste. The objective is to ensure proper environmental management and safety of operations at the pier. The terminal does not directly perform this service, but regulates and monitors the work of specialized companies.'),
          es: createBlockContent('En conformidad con la legislación ambiental brasileña, el Puerto Itapoá establece un procedimiento riguroso para la retirada, transporte y destino de residuos de embarcaciones. El objetivo es garantizar la correcta gestión ambiental y la seguridad de las operaciones en el muelle. El terminal no ejecuta directamente este servicio, pero disciplina y fiscaliza la actuación de empresas especializadas.'),
        },
        condicoes: [
          {
            _key: 'cond1',
            titulo: {
              pt: 'Segurança',
              en: 'Safety',
              es: 'Seguridad',
            },
            descricao: {
              pt: 'Todas as operações devem ser acompanhadas por uma empresa de emergência ambiental marítima e utilizar cercos de contenção.',
              en: 'All operations must be accompanied by a maritime environmental emergency company and use containment barriers.',
              es: 'Todas las operaciones deben ser acompañadas por una empresa de emergencia ambiental marítima y utilizar cercos de contención.',
            },
          },
          {
            _key: 'cond2',
            titulo: {
              pt: 'Horários',
              en: 'Hours',
              es: 'Horarios',
            },
            descricao: {
              pt: 'A retirada de resíduos por bombeamento é permitida das 8h às 16h. A retirada de resíduos sólidos pode ocorrer em qualquer período, seguindo as mesmas normas de segurança.',
              en: 'Waste removal by pumping is allowed from 8am to 4pm. Solid waste removal can occur at any time, following the same safety standards.',
              es: 'La retirada de residuos por bombeo está permitida de 8h a 16h. La retirada de residuos sólidos puede ocurrir en cualquier período, siguiendo las mismas normas de seguridad.',
            },
          },
          {
            _key: 'cond3',
            titulo: {
              pt: 'Restrições',
              en: 'Restrictions',
              es: 'Restricciones',
            },
            descricao: {
              pt: 'O uso de caminhões bitrem é vetado para qualquer tipo de remoção de resíduo. As atividades podem ser interrompidas a qualquer momento por condições climáticas adversas ou riscos à segurança, ao meio ambiente ou às pessoas.',
              en: 'The use of bitrem trucks is prohibited for any type of waste removal. Activities may be interrupted at any time due to adverse weather conditions or risks to safety, the environment or people.',
              es: 'El uso de camiones bitrem está vetado para cualquier tipo de remoción de residuo. Las actividades pueden ser interrumpidas en cualquier momento por condiciones climáticas adversas o riesgos a la seguridad, al medio ambiente o a las personas.',
            },
          },
        ],
        documentos: [
          {
            _key: 'doc1',
            nome: {
              pt: 'Solicitação para Retirada de Resíduos de Embarcações',
              en: 'Request for Ship Waste Removal',
              es: 'Solicitud para Retirada de Residuos de Embarcaciones',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/08/SOLICITACAO_DE_RETIRADA_DE_RESIDUOS.docx.pdf',
          },
          {
            _key: 'doc2',
            nome: {
              pt: 'Formulário de Cadastro de Prestador de Serviços',
              en: 'Service Provider Registration Form',
              es: 'Formulario de Registro de Prestador de Servicios',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/08/CADASTRO_DE_PRESTADOR_DE_SERVICOS_PARA_RETIRADA_DE_RESIDUOS_SOL_E_LIQ.docx.pdf',
          },
          {
            _key: 'doc3',
            nome: {
              pt: 'Credenciamento de Empresas Coletoras de Resíduos de Embarcação',
              en: 'Accreditation of Ship Waste Collection Companies',
              es: 'Acreditación de Empresas Colectoras de Residuos de Embarcación',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/08/CREDENCIAMENTO_DE_EMPRESAS_COLETORAS_DE_RESIDUOS_DE_EMBARCACAO.docx.pdf',
          },
          {
            _key: 'doc4',
            nome: {
              pt: 'Modelo de Certificado de Retirada de Resíduos',
              en: 'Waste Removal Certificate Template',
              es: 'Modelo de Certificado de Retirada de Residuos',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/08/CERTIFICADO_DE_RETIRADA_DE_RESIDUOS.docx.pdf',
          },
          {
            _key: 'doc5',
            nome: {
              pt: 'Termo de Responsabilidade para Retirada de Resíduos',
              en: 'Waste Removal Responsibility Term',
              es: 'Término de Responsabilidad para Retirada de Residuos',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/08/TERMO_DE_RESPONSABILIDADE_PARA_RETIRADA_DE_RESIDUOS_DE_EMBARCACOES.docx.pdf',
          },
        ],
        empresasHabilitadas: [
          {
            _key: 'emp1',
            nome: {
              pt: 'Valle Ambiental LTDA',
              en: 'Valle Ambiental LTDA',
              es: 'Valle Ambiental LTDA',
            },
            cnpj: '18.739.642/0001-72',
            contato: 'Joselito Gonçalves de Lima',
            telefone: '+55 (47) 3349-1037',
            servicos: {
              pt: 'Resíduos Sólidos e Oleosos',
              en: 'Solid and Oily Waste',
              es: 'Residuos Sólidos y Oleosos',
            },
          },
          {
            _key: 'emp2',
            nome: {
              pt: 'Paraná Oil – Comércio de Óleos LTDA',
              en: 'Paraná Oil – Oil Trade LTDA',
              es: 'Paraná Oil – Comercio de Aceites LTDA',
            },
            cnpj: '13.719.165/0004-02',
            contato: 'Ivo Alexandre Brzezinski de Julio',
            telefone: '+55 (41) 99641-1100',
            servicos: {
              pt: 'Resíduos Sólidos e Oleosos',
              en: 'Solid and Oily Waste',
              es: 'Residuos Sólidos y Oleosos',
            },
          },
          {
            _key: 'emp3',
            nome: {
              pt: 'Vale Indústria e Comércio de Óleo Combustível EPP',
              en: 'Vale Industry and Fuel Oil Trade EPP',
              es: 'Vale Industria y Comercio de Aceite Combustible EPP',
            },
            cnpj: '82.179.193/0001-54',
            contato: 'Francine Vidal',
            telefone: '+55 (47) 3348-9947',
            servicos: {
              pt: 'Resíduos Oleosos',
              en: 'Oily Waste',
              es: 'Residuos Oleosos',
            },
          },
        ],
        contato: {
          email: 'meioambiente@portoitapoa.com',
          telefone: '+55 (47) 3441-8000',
        },
      },
      {
        _key: 'proc2',
        titulo: {
          pt: 'Fornecimento de bordo e acesso de equipes',
          en: 'Onboard supply and team access',
          es: 'Suministro de a bordo y acceso de equipos',
        },
        descricao: {
          pt: createBlockContent('Este procedimento orienta a solicitação de fornecimento de materiais (peças, mantimentos, etc.) e o acesso de equipes de prestadores de serviço (manutenção, limpeza, serviços médicos, etc.) às embarcações atracadas no Porto Itapoá. O objetivo é padronizar e agilizar o acesso de bens e serviços às embarcações de forma segura e controlada. Qualquer resíduo gerado durante a prestação de serviço a bordo deve seguir o procedimento específico de retirada de resíduos de embarcação.'),
          en: createBlockContent('This procedure guides the request for supply of materials (parts, supplies, etc.) and access of service provider teams (maintenance, cleaning, medical services, etc.) to vessels berthed at Porto Itapoá. The objective is to standardize and expedite access of goods and services to vessels in a safe and controlled manner. Any waste generated during onboard service must follow the specific ship waste removal procedure.'),
          es: createBlockContent('Este procedimiento orienta la solicitud de suministro de materiales (piezas, suministros, etc.) y el acceso de equipos de prestadores de servicio (mantenimiento, limpieza, servicios médicos, etc.) a las embarcaciones atracadas en el Puerto Itapoá. El objetivo es estandarizar y agilizar el acceso de bienes y servicios a las embarcaciones de forma segura y controlada. Cualquier residuo generado durante la prestación de servicio a bordo debe seguir el procedimiento específico de retirada de residuos de embarcación.'),
        },
        condicoes: [],
        documentos: [
          {
            _key: 'doc1',
            nome: {
              pt: 'Procedimento para Fornecimento de Bordo ou Acesso de Equipes',
              en: 'Procedure for Onboard Supply or Team Access',
              es: 'Procedimiento para Suministro de a Bordo o Acceso de Equipos',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/08/Fornecimento-de-Bordo-ou-Acesso-de-Equipes-para-Prestacao-de-Servicos-em-Embarcacao.pdf',
          },
          {
            _key: 'doc2',
            nome: {
              pt: 'Termo de Responsabilidade e Compliance',
              en: 'Responsibility and Compliance Term',
              es: 'Término de Responsabilidad y Cumplimiento',
            },
            url: 'https://www.portoitapoa.com/wp-content/uploads/2023/08/Termo-de-Responsabilidade-e-Compliance.pdf',
          },
        ],
        empresasHabilitadas: [],
        contato: {
          email: 'meioambiente@portoitapoa.com',
          telefone: '+55 (47) 3441-8000',
        },
      },
    ],
  }

  try {
    const existing = await client.fetch('*[_type == "procedimentosOperacionais"][0]')
    if (existing) {
      const result = await client.patch(existing._id).set(data).commit()
      console.log('✅ Procedimentos Operacionais atualizado:', result._id)
      return result
    } else {
      const result = await client.create(data)
      console.log('✅ Procedimentos Operacionais criado:', result._id)
      return result
    }
  } catch (error) {
    console.error('❌ Erro ao popular Procedimentos Operacionais:', error)
    throw error
  }
}

// Função principal
async function populateAll() {
  console.log('🚀 Iniciando população COMPLETA do Sanity com conteúdo do HTML...\n')

  try {
    console.log('📄 Página 1: Porto Itapoá')
    await populatePortoItapoa()
    
    console.log('\n📄 Página 2: Certificações e Prêmios')
    await populateCertificacoes()
    await populatePremiacoes()
    
    console.log('\n📄 Página 3: Infraestrutura')
    await populateInfraestrutura()
    
    console.log('\n📄 Página 4: Diferenciais')
    await populateDiferenciais()
    
    console.log('\n📄 Página 5: Downloads')
    await populateDownloads()
    
    console.log('\n📄 Página 6: LGPD')
    await populateLGPD()
    
    console.log('\n📄 Página 7: Acionistas')
    await populateAcionistas()
    
    console.log('\n📄 Página 8: Canal de Denúncias')
    await populateCanalDenuncias()
    
    console.log('\n📄 Página 9: Procedimentos Operacionais')
    await populateProcedimentosOperacionais()

    console.log('\n✅ População COMPLETA concluída com sucesso!')
    console.log('\n📝 TODAS as páginas foram populadas:')
    console.log('   ✅ Porto Itapoá (História, Linha do Tempo, Localização)')
    console.log('   ✅ Certificações e Prêmios')
    console.log('   ✅ Infraestrutura')
    console.log('   ✅ Diferenciais')
    console.log('   ✅ Downloads')
    console.log('   ✅ LGPD')
    console.log('   ✅ Acionistas')
    console.log('   ✅ Canal de Denúncias')
    console.log('   ✅ Procedimentos Operacionais')
    console.log('\n🎉 Todo o conteúdo do HTML foi importado para o Sanity!')
  } catch (error) {
    console.error('\n❌ Erro durante a população:', error)
    process.exit(1)
  }
}

populateAll().catch((error) => {
  console.error('❌ Erro fatal:', error)
  process.exit(1)
})

