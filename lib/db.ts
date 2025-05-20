import { sql } from '@vercel/postgres';

export async function createTables() {
  try {
    // Criar tabela de solicitações
    await sql`
      CREATE TABLE IF NOT EXISTS solicitacoes (
        id SERIAL PRIMARY KEY,
        nome_cliente VARCHAR(255) NOT NULL,
        telefone_cliente VARCHAR(20) NOT NULL,
        cidade_cliente VARCHAR(100) NOT NULL,
        bairro_cliente VARCHAR(100) NOT NULL,
        descricao_servico TEXT NOT NULL,
        outra_cidade VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Criar tabela de profissionais
    await sql`
      CREATE TABLE IF NOT EXISTS profissionais (
        id SERIAL PRIMARY KEY,
        nome_profissional VARCHAR(255) NOT NULL,
        telefone_profissional VARCHAR(20) NOT NULL,
        tipo_servico VARCHAR(100) NOT NULL,
        descricao_habilidades TEXT NOT NULL,
        bairro_funcionario VARCHAR(100),
        cidade_funcionario VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    throw error;
  }
} 