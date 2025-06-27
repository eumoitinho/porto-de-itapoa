import { FallbackPage } from "@/components/fallback-page"

export default function DownloadsPage() {
  return (
    <FallbackPage
      title="Downloads"
      description="Baixe documentos importantes, formulários, manuais e outros materiais relevantes do Porto Itapoá."
      expectedFeatures={[
        "Formulários Operacionais",
        "Manuais de Procedimentos",
        "Certificações",
        "Relatórios Técnicos",
        "Apresentações Institucionais",
        "Documentos Regulatórios"
      ]}
    />
  )
}