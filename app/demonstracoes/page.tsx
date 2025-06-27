import { FallbackPage } from "@/components/fallback-page"

export default function DemonstracoesFPage() {
  return (
    <FallbackPage
      title="Demonstrações Financeiras"
      description="Acesse nossas demonstrações financeiras auditadas, relatórios contábeis e informações sobre performance econômica."
      expectedFeatures={[
        "Balanço Patrimonial",
        "Demonstração de Resultados",
        "Fluxo de Caixa",
        "Notas Explicativas",
        "Relatório dos Auditores",
        "Histórico Financeiro"
      ]}
    />
  )
}