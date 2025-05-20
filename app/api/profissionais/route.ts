import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

// Interface para os dados do profissional
interface ProfissionalData {
  nomeProfissional: string
  telefoneProfissional: string
  tipoServico: string
  descricaoHabilidades: string
  bairroFuncionario: string
  cidadeFuncionario: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ProfissionalData = await request.json()

    // Validação dos dados
    if (!data.nomeProfissional || !data.telefoneProfissional || !data.tipoServico || !data.descricaoHabilidades) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Inserir no banco de dados
    const result = await sql`
      INSERT INTO profissionais (
        nome_profissional,
        telefone_profissional,
        tipo_servico,
        descricao_habilidades,
        bairro_funcionario,
        cidade_funcionario
      ) VALUES (
        ${data.nomeProfissional},
        ${data.telefoneProfissional},
        ${data.tipoServico},
        ${data.descricaoHabilidades},
        ${data.bairroFuncionario},
        ${data.cidadeFuncionario}
      )
      RETURNING id;
    `

    return NextResponse.json(
      { 
        message: 'Cadastro recebido com sucesso',
        id: result.rows[0].id,
        data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao processar cadastro:', error)
    return NextResponse.json(
      { error: 'Erro ao processar cadastro' },
      { status: 500 }
    )
  }
} 