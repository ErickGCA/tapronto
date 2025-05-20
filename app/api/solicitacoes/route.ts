import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

// Interface para os dados da solicitação
interface SolicitacaoData {
  nomeCliente: string
  telefoneCliente: string
  cidadeCliente: string
  bairroCliente: string
  descricaoServico: string
  outraCidade?: string
}

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
    const result = await sql`
      INSERT INTO solicitacoes (
        nome_cliente,
        telefone_cliente,
        cidade_cliente,
        bairro_cliente,
        descricao_servico,
        outra_cidade
      ) VALUES (
        ${data.nomeCliente},
        ${data.telefoneCliente},
        ${data.cidadeCliente},
        ${data.bairroCliente},
        ${data.descricaoServico},
        ${data.outraCidade}
      )
      RETURNING id;
    `

    return NextResponse.json(
      { 
        message: 'Solicitação recebida com sucesso',
        id: result.rows[0].id,
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