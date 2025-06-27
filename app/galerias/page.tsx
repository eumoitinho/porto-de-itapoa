import { FallbackPage } from "@/components/fallback-page"

export default function GaleriasPage() {
  return (
    <FallbackPage
      title="Galerias"
      description="Explore nossa galeria de imagens e vídeos, mostrando as instalações, operações e eventos do Porto Itapoá."
      expectedFeatures={[
        "Galeria de Fotos das Instalações",
        "Vídeos Institucionais",
        "Imagens de Operações",
        "Eventos e Cerimônias",
        "Vista Aérea do Porto",
        "Arquivo Histórico"
      ]}
    />
  )
}