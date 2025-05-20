import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Interface para os dados da solicitação
interface SolicitacaoData {
  nomeCliente: string
  telefoneCliente: string
  cidadeCliente: string
  bairroCliente: string
  descricaoServico: string
  outraCidade?: string
}



export async function GET() {
    try {
      const solicitacoes = await prisma.solicitacao.findMany()
      return NextResponse.json(solicitacoes)
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error)
      return NextResponse.json({ error: 'Erro ao buscar solicitações' }, { status: 500 })
    }
  }
  
  // ... mantém sua função POST aqui
  
  
export async function POST(request: NextRequest) {
  try {
    const data: SolicitacaoData = await request.json()

    // Validação dos dados
    if (!data.nomeCliente || !data.telefoneCliente || !data.descricaoServico) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Inserir no banco de dados
    const solicitacao = await prisma.solicitacao.create({
      data: {
        nomeCliente: data.nomeCliente,
        telefoneCliente: data.telefoneCliente,
        cidadeCliente: data.cidadeCliente,
        bairroCliente: data.bairroCliente,
        descricaoServico: data.descricaoServico,
        outraCidade: data.outraCidade
      }
    })

    return NextResponse.json(
      { 
        message: 'Solicitação recebida com sucesso',
        id: solicitacao.id,
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao processar solicitação:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
} 