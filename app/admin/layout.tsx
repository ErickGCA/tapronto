import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Painel Administrativo - Ta Pronto?",
  description: "Painel administrativo para gerenciar solicitações e profissionais",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Ta Pronto? - Admin</h1>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
} 