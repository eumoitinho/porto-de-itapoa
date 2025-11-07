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
      const data = await client.fetch(`
        *[_type == "portoItapoa"][0]{
          ...,
          "title": title.${language} ?? title.pt ?? title,
          "description": description.${language} ?? description.pt ?? description,
          historia {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            "conteudo": conteudo.${language} ?? conteudo.pt ?? conteudo,
            imagem
          },
          linhaTempo {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            eventos[] {
              ano,
              "titulo": titulo.${language} ?? titulo.pt ?? titulo,
              "descricao": descricao.${language} ?? descricao.pt ?? descricao,
              imagem
            }
          },
          localizacao {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            "endereco": endereco.${language} ?? endereco.pt ?? endereco,
            "descricao": descricao.${language} ?? descricao.pt ?? descricao,
            coordenadas,
            mapa
          }
        }
      `)
      
      return data
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
          ...,
          "title": title.${language} ?? title.pt ?? title,
          "description": description.${language} ?? description.pt ?? description,
          estruturaAcionaria {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            acionistas[] {
              "nome": nome.${language} ?? nome.pt ?? nome,
              participacao,
              "descricao": descricao.${language} ?? descricao.pt ?? descricao,
              logo,
              tipo
            }
          },
          governanca {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            "conteudo": conteudo.${language} ?? conteudo.pt ?? conteudo,
            documentos[] {
              "nome": nome.${language} ?? nome.pt ?? nome,
              tipo,
              arquivo,
              link
            }
          }
        }
      `)
      return data
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
          ...,
          "title": title.${language} ?? title.pt ?? title,
          "description": description.${language} ?? description.pt ?? description,
          certificacoes[] {
            "nome": nome.${language} ?? nome.pt ?? nome,
            codigo,
            "orgao": orgao.${language} ?? orgao.pt ?? orgao,
            dataEmissao,
            dataValidade,
            "descricao": descricao.${language} ?? descricao.pt ?? descricao,
            certificado,
            logo,
            categoria
          }
        }
      `)
      return data
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
          ...,
          "title": title.${language} ?? title.pt ?? title,
          "description": description.${language} ?? description.pt ?? description,
          reconhecimentos[] {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            valor,
            "descricao": descricao.${language} ?? descricao.pt ?? descricao
          },
          premios[] {
            ano,
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            "categoria": categoria.${language} ?? categoria.pt ?? categoria,
            "orgao": orgao.${language} ?? orgao.pt ?? orgao,
            "descricao": descricao.${language} ?? descricao.pt ?? descricao,
            nivel,
            imagem
          }
        }
      `)
      return data
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
          ...,
          "title": title.${language} ?? title.pt ?? title,
          "description": description.${language} ?? description.pt ?? description,
          "intro": intro.${language} ?? intro.pt ?? intro,
          funcionalidades[] {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            "descricao": descricao.${language} ?? descricao.pt ?? descricao,
            icone
          },
          linkSistema,
          "instrucoes": instrucoes.${language} ?? instrucoes.pt ?? instrucoes
        }
      `)
      return data
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
          ...,
          "title": title.${language} ?? title.pt ?? title,
          "description": description.${language} ?? description.pt ?? description,
          "intro": intro.${language} ?? intro.pt ?? intro,
          beneficios[] {
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            "descricao": descricao.${language} ?? descricao.pt ?? descricao
          },
          comoParticipar[] {
            passo,
            "titulo": titulo.${language} ?? titulo.pt ?? titulo,
            "descricao": descricao.${language} ?? descricao.pt ?? descricao
          },
          linkSistema,
          contato
        }
      `)
      return data
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
          ...,
          "title": title.${language} ?? title.pt ?? title,
          "description": description.${language} ?? description.pt ?? description,
          "intro": intro.${language} ?? intro.pt ?? intro,
          anoVigencia,
          "informacoesImportantes": informacoesImportantes.${language} ?? informacoesImportantes.pt ?? informacoesImportantes,
          contato {
            email,
            telefone,
            "horario": horario.${language} ?? horario.pt ?? horario
          },
          linkDownload,
          arquivoTabela
        }
      `)
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
