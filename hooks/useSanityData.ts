import { client } from '@/lib/sanity'
import { useQuery } from '@tanstack/react-query'

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
