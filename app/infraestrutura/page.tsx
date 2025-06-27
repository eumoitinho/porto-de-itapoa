import { FallbackPage } from "@/components/fallback-page"

export default function InfraestruturaPage() {
  return (
    <FallbackPage
      title="Infraestrutura"
      description="Conheça nossa moderna infraestrutura portuária, equipamentos de última geração e capacidades operacionais."
      expectedFeatures={[
        "Especificações Técnicas do Porto",
        "Equipamentos e Guindastes",
        "Capacidade de Armazenagem",
        "Sistemas de Segurança",
        "Tecnologia Aplicada",
        "Planos de Expansão"
      ]}
    />
  )
}