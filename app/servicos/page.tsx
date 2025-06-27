import { FallbackPage } from "@/components/fallback-page"

export default function ServicosPage() {
  return (
    <FallbackPage
      title="Serviços"
      description="Visão geral de todos os serviços oferecidos pelo Porto Itapoá para atender às necessidades logísticas."
      expectedFeatures={[
        "Catálogo Completo de Serviços",
        "Serviços Marítimos",
        "Serviços Terrestres",
        "Soluções Logísticas",
        "Serviços Especializados",
        "Consultoria Técnica"
      ]}
    />
  )
}