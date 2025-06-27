import { FallbackPage } from "@/components/fallback-page"

export default function LinhaTempoPage() {
  return (
    <FallbackPage
      title="Linha do Tempo"
      description="Acompanhe a evolução do Porto Itapoá desde sua concepção até os dias atuais, marcos importantes e conquistas."
      expectedFeatures={[
        "História da Construção",
        "Marcos Operacionais",
        "Expansões e Melhorias",
        "Certificações Obtidas",
        "Recordes de Movimentação",
        "Eventos Importantes"
      ]}
    />
  )
}