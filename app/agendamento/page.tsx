import { FallbackPage } from "@/components/fallback-page"

export default function AgendamentoPage() {
  return (
    <FallbackPage
      title="Agendamento"
      description="Sistema de agendamento online para entrega e retirada de contêineres, otimizando o fluxo operacional."
      expectedFeatures={[
        "Agendamento Online",
        "Calendário de Disponibilidade",
        "Confirmação Automática",
        "Gestão de Janelas",
        "Notificações por Email/SMS",
        "Histórico de Agendamentos"
      ]}
    />
  )
}