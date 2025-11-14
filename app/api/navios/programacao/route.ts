import { NextRequest, NextResponse } from 'next/server'
import { fallbackNaviosData } from './fallback-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const de = searchParams.get('de')
    const ate = searchParams.get('ate')

    if (!de || !ate) {
      return NextResponse.json(
        { error: 'Parâmetros de data são obrigatórios (de e ate)' },
        { status: 400 }
      )
    }

    const apiUrl = `https://faturamento-n4-prod-k8s.portoitapoa.com/api/processos-n4/navios/programacao?de=${de}&ate=${ate}`
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      // Se for erro 401, retorna dados de fallback
      if (response.status === 401) {
        console.warn('API retornou 401, usando dados de fallback')
        return NextResponse.json(fallbackNaviosData, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }

      let errorMessage = `Erro ${response.status}`
      try {
        const errorText = await response.text()
        if (errorText) {
          const errorJson = JSON.parse(errorText)
          errorMessage = errorJson.error || errorJson.message || errorMessage
        }
      } catch {
        // Se não conseguir parsear, usa a mensagem padrão
      }
      
      console.error('API Error:', response.status, errorMessage)
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error in API route:', error)
    // Em caso de erro de rede, também retorna fallback
    console.warn('Erro de rede, usando dados de fallback')
    return NextResponse.json(fallbackNaviosData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
}

