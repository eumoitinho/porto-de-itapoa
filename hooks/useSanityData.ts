import { client } from '@/lib/sanity'
import { useQuery } from '@tanstack/react-query'
import { useI18n } from '@/lib/i18n/context'
import { getTranslatedField, getTranslatedArray } from '@/lib/sanity-i18n'

// Hook para buscar dados da homepage
export const useHomepageData = () => {
  return useQuery({
    queryKey: ['homepage'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "homepage"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para buscar estatísticas
export const useStatsData = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "stats"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados do terminal
export const useTerminalData = () => {
  return useQuery({
    queryKey: ['terminal'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "terminal"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar serviços marítimos
export const useMaritimeServicesData = () => {
  return useQuery({
    queryKey: ['maritimeServices'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "maritimeServices"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar outros serviços
export const useOtherServicesData = () => {
  return useQuery({
    queryKey: ['otherServices'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "otherServices"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados de "Por que escolher"
export const useWhyChooseData = () => {
  return useQuery({
    queryKey: ['whyChoose'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "whyChoose"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados de sustentabilidade
export const useSustainabilityData = () => {
  return useQuery({
    queryKey: ['sustainability'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "sustainability"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados de contato
export const useContactData = () => {
  return useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const data = await client.fetch('*[_type == "contact"][0]')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados do Porto Itapoá
export const usePortoItapoaData = () => {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: ['portoItapoa', language],
    queryFn: async () => {
      // Buscar todos os dados primeiro
      const data = await client.fetch(`
        *[_type == "portoItapoa"][0]{
          _id,
          _type,
          _createdAt,
          _updatedAt,
          title,
          description,
          historia {
            titulo,
            conteudo,
            imagem
          },
          linhaTempo {
            titulo,
            eventos[] {
              ano,
              titulo,
              descricao,
              imagem
            }
          },
          localizacao {
            titulo,
            endereco,
            descricao,
            coordenadas,
            mapa
          }
        }
      `)
      
      // Se não houver dados, retornar null
      if (!data) {
        console.warn('⚠️ Nenhum dado encontrado para portoItapoa no Sanity')
        return null
      }
      
      console.log('✅ Dados do Porto Itapoá carregados do Sanity:', data._id)
      
      // Processar traduções no cliente usando getTranslatedField
      const lang = language || 'pt'
      
      return {
        ...data,
        title: getTranslatedField(data.title, lang, 'Porto Itapoá'),
        description: getTranslatedField(data.description, lang, 'História, Linha do Tempo e Localização'),
        historia: data.historia ? {
          ...data.historia,
          titulo: getTranslatedField(data.historia.titulo, lang, 'Nossa trajetória'),
          conteudo: getTranslatedField(data.historia.conteudo, lang, data.historia.conteudo),
        } : null,
        linhaTempo: data.linhaTempo ? {
          ...data.linhaTempo,
          titulo: getTranslatedField(data.linhaTempo.titulo, lang, 'Uma linha do tempo de conquistas'),
          eventos: data.linhaTempo.eventos?.map((evento: any) => ({
            ...evento,
            titulo: getTranslatedField(evento.titulo, lang, evento.titulo),
            descricao: getTranslatedField(evento.descricao, lang, evento.descricao),
          })) || [],
        } : null,
        localizacao: data.localizacao ? {
          ...data.localizacao,
          titulo: getTranslatedField(data.localizacao.titulo, lang, 'Localização'),
          endereco: getTranslatedField(data.localizacao.endereco, lang, data.localizacao.endereco),
          descricao: getTranslatedField(data.localizacao.descricao, lang, data.localizacao.descricao),
        } : null,
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados de Acionistas
export const useAcionistasData = () => {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: ['acionistas', language],
    queryFn: async () => {
      const data = await client.fetch(`
        *[_type == "acionistas"][0]{
          _id,
          title,
          description,
          estruturaAcionaria {
            titulo,
            acionistas[] {
              nome,
              participacao,
              descricao,
              logo,
              tipo
            }
          },
          governanca {
            titulo,
            conteudo,
            documentos[] {
              nome,
              tipo,
              arquivo,
              link
            }
          }
        }
      `)

      if (!data) {
        console.warn('⚠️ Nenhum dado encontrado para acionistas no Sanity')
        return null
      }

      const lang = language || 'pt'

      return {
        ...data,
        title: getTranslatedField(data.title, lang, 'Acionistas'),
        description: getTranslatedField(data.description, lang),
        estruturaAcionaria: data.estruturaAcionaria ? {
          ...data.estruturaAcionaria,
          titulo: getTranslatedField(data.estruturaAcionaria.titulo, lang),
          acionistas: data.estruturaAcionaria.acionistas?.map((acionista: any) => ({
            ...acionista,
            nome: getTranslatedField(acionista.nome, lang),
            descricao: getTranslatedField(acionista.descricao, lang),
          })) || [],
        } : null,
        governanca: data.governanca ? {
          ...data.governanca,
          titulo: getTranslatedField(data.governanca.titulo, lang),
          conteudo: getTranslatedField(data.governanca.conteudo, lang, data.governanca.conteudo),
          documentos: data.governanca.documentos?.map((documento: any) => ({
            ...documento,
            nome: getTranslatedField(documento.nome, lang),
          })) || [],
        } : null,
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados de Certificações
export const useCertificacoesData = () => {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: ['certificacoes', language],
    queryFn: async () => {
      const data = await client.fetch(`
        *[_type == "certificacoes"][0]{
          _id,
          title,
          description,
          certificacoes[] {
            nome,
            codigo,
            orgao,
            dataEmissao,
            dataValidade,
            descricao,
            certificado,
            logo,
            categoria
          }
        }
      `)

      if (!data) {
        console.warn('⚠️ Nenhum dado encontrado para certificacoes no Sanity')
        return null
      }

      const lang = language || 'pt'

      return {
        ...data,
        title: getTranslatedField(data.title, lang, 'Certificações'),
        description: getTranslatedField(data.description, lang),
        certificacoes: data.certificacoes?.map((certificacao: any) => ({
          ...certificacao,
          nome: getTranslatedField(certificacao.nome, lang),
          orgao: getTranslatedField(certificacao.orgao, lang),
          descricao: getTranslatedField(certificacao.descricao, lang),
        })) || [],
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados de Premiações
export const usePremiacoesData = () => {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: ['premiacoes', language],
    queryFn: async () => {
      const data = await client.fetch(`
        *[_type == "premiacoes"][0]{
          _id,
          title,
          description,
          reconhecimentos[] {
            titulo,
            valor,
            descricao
          },
          premios[] {
            ano,
            titulo,
            categoria,
            orgao,
            descricao,
            nivel,
            imagem
          }
        }
      `)

      if (!data) {
        console.warn('⚠️ Nenhum dado encontrado para premiacoes no Sanity')
        return null
      }

      const lang = language || 'pt'

      return {
        ...data,
        title: getTranslatedField(data.title, lang, 'Premiações'),
        description: getTranslatedField(data.description, lang),
        reconhecimentos: data.reconhecimentos?.map((item: any) => ({
          ...item,
          titulo: getTranslatedField(item.titulo, lang),
          descricao: getTranslatedField(item.descricao, lang),
        })) || [],
        premios: data.premios?.map((premio: any) => ({
          ...premio,
          titulo: getTranslatedField(premio.titulo, lang),
          categoria: getTranslatedField(premio.categoria, lang),
          orgao: getTranslatedField(premio.orgao, lang),
          descricao: getTranslatedField(premio.descricao, lang),
        })) || [],
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados de Programação de Navios
export const useProgramacaoNaviosData = () => {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: ['programacaoNavios', language],
    queryFn: async () => {
      const data = await client.fetch(`
        *[_type == "programacaoNavios"][0]{
          _id,
          title,
          description,
          intro,
          funcionalidades[] {
            titulo,
            descricao,
            icone
          },
          linkSistema,
          instrucoes
        }
      `)

      if (!data) {
        console.warn('⚠️ Nenhum dado encontrado para programacaoNavios no Sanity')
        return null
      }

      const lang = language || 'pt'

      return {
        ...data,
        title: getTranslatedField(data.title, lang, 'Programação de Navios'),
        description: getTranslatedField(data.description, lang),
        intro: getTranslatedField(data.intro, lang, data.intro),
        funcionalidades: data.funcionalidades?.map((func: any) => ({
          ...func,
          titulo: getTranslatedField(func.titulo, lang),
          descricao: getTranslatedField(func.descricao, lang),
        })) || [],
        instrucoes: getTranslatedField(data.instrucoes, lang, data.instrucoes),
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados do Portal de Compras
export const usePortalComprasData = () => {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: ['portalCompras', language],
    queryFn: async () => {
      const data = await client.fetch(`
        *[_type == "portalCompras"][0]{
          _id,
          title,
          description,
          intro,
          beneficios[] {
            titulo,
            descricao
          },
          comoParticipar[] {
            passo,
            titulo,
            descricao
          },
          linkSistema,
          contato
        }
      `)

      if (!data) {
        console.warn('⚠️ Nenhum dado encontrado para portalCompras no Sanity')
        return null
      }

      const lang = language || 'pt'

      return {
        ...data,
        title: getTranslatedField(data.title, lang, 'Portal de Compras'),
        description: getTranslatedField(data.description, lang),
        intro: getTranslatedField(data.intro, lang, data.intro),
        beneficios: data.beneficios?.map((beneficio: any) => ({
          ...beneficio,
          titulo: getTranslatedField(beneficio.titulo, lang),
          descricao: getTranslatedField(beneficio.descricao, lang),
        })) || [],
        comoParticipar: data.comoParticipar?.map((item: any) => ({
          ...item,
          titulo: getTranslatedField(item.titulo, lang),
          descricao: getTranslatedField(item.descricao, lang),
        })) || [],
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}

// Hook para buscar dados da Tabela de Preços
export const useTabelaPrecosData = () => {
  const { language } = useI18n()
  
  return useQuery({
    queryKey: ['tabelaPrecos', language],
    queryFn: async () => {
      const data = await client.fetch(`
        *[_type == "tabelaPrecos"][0]{
          _id,
          title,
          description,
          intro,
          anoVigencia,
          informacoesImportantes,
          contato {
            email,
            telefone,
            horario
          },
          linkDownload,
          arquivoTabela
        }
      `)

      if (!data) {
        console.warn('⚠️ Nenhum dado encontrado para tabelaPrecos no Sanity')
        return null
      }

      const lang = language || 'pt'

      return {
        ...data,
        title: getTranslatedField(data.title, lang, 'Tabela de Preços'),
        description: getTranslatedField(data.description, lang),
        intro: getTranslatedField(data.intro, lang, data.intro),
        informacoesImportantes: getTranslatedField(data.informacoesImportantes, lang, data.informacoesImportantes),
        contato: data.contato ? {
          ...data.contato,
          horario: getTranslatedField(data.contato.horario, lang, data.contato.horario),
        } : null,
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}
