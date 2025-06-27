import { FallbackPage } from "@/components/fallback-page"

export default function Tour360Page() {
  return (
    <FallbackPage
      title="Tour 360°"
      description="Faça um tour virtual 360° pelas instalações do Porto Itapoá e conheça nossa infraestrutura moderna."
      expectedFeatures={[
        "Tour Virtual Interativo",
        "Visão 360° das Instalações",
        "Pontos de Interesse",
        "Informações Técnicas",
        "Navegação Intuitiva",
        "Compatibilidade VR"
      ]}
    />
  )
}