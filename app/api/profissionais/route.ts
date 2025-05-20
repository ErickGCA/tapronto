import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Interface para os dados do profissional
interface ProfissionalData {
  nomeProfissional: string
  telefoneProfissional: string
  tipoServico: string
  descricaoHabilidades: string
  bairroFuncionario: string
  cidadeFuncionario: string
}

export async function GET() {
    try {
      const profissionais = await prisma.profissional.findMany()
      return NextResponse.json(profissionais)
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error)
      return NextResponse.json({ error: 'Erro ao buscar profissionais' }, { status: 500 })
    }
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
    const profissional = await prisma.profissional.create({
      data: {
        nomeProfissional: data.nomeProfissional,
        telefoneProfissional: data.telefoneProfissional,
        tipoServico: data.tipoServico,
        descricaoHabilidades: data.descricaoHabilidades,
        bairroFuncionario: data.bairroFuncionario,
        cidadeFuncionario: data.cidadeFuncionario
      }
    })

    return NextResponse.json(
      { 
        message: 'Cadastro recebido com sucesso',
        id: profissional.id,
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