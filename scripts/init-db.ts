import { createTables } from '../lib/db'

async function main() {
  try {
    await createTables()
    console.log('Banco de dados inicializado com sucesso!')
    process.exit(0)
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error)
    process.exit(1)
  }
}

main() 