import { FallbackPage } from "@/components/fallback-page"

export default function LocalizacaoPage() {
  return (
    <FallbackPage
      title="Localização"
      description="Descubra a localização estratégica do Porto Itapoá e suas vantagens logísticas para o comércio internacional."
      expectedFeatures={[
        "Mapa Interativo",
        "Coordenadas Geográficas",
        "Acessos Rodoviários",
        "Distâncias para Principais Cidades",
        "Vantagens Logísticas",
        "Conexões Multimodais"
      ]}
    />
  )
}