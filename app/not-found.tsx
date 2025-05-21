export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Página não encontrada</h2>
      <p className="mb-4">A página que você está procurando não existe.</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Voltar para a página inicial
      </a>
    </div>
  )
} 