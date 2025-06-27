import { FallbackPage } from "@/components/fallback-page"

export default function CertificacoesPage() {
  return (
    <FallbackPage
      title="Certificações"
      description="Conheça nossas certificações internacionais que atestam a qualidade e excelência de nossos serviços."
      expectedFeatures={[
        "ISO 9001 - Qualidade",
        "ISO 14001 - Meio Ambiente",
        "OHSAS 18001 - Segurança",
        "ISPS Code - Segurança Portuária",
        "OEA - Operador Econômico Autorizado",
        "Outras Certificações"
      ]}
    />
  )
}