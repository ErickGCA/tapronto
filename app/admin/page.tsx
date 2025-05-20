"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Solicitacao {
  id: number
  nomeCliente: string
  telefoneCliente: string
  cidadeCliente: string
  bairroCliente: string
  descricaoServico: string
  outraCidade?: string
  createdAt: string
}

interface Profissional {
  id: number
  nomeProfissional: string
  telefoneProfissional: string
  tipoServico: string
  descricaoHabilidades: string
  bairroFuncionario?: string
  cidadeFuncionario: string
  createdAt: string
}

export default function AdminPage() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([])
  const [profissionais, setProfissionais] = useState<Profissional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solicitacoesRes, profissionaisRes] = await Promise.all([
          fetch('/api/solicitacoes'),
          fetch('/api/profissionais')
        ])

        if (solicitacoesRes.ok && profissionaisRes.ok) {
          const [solicitacoesData, profissionaisData] = await Promise.all([
            solicitacoesRes.json(),
            profissionaisRes.json()
          ])

          setSolicitacoes(solicitacoesData.data)
          setProfissionais(profissionaisData.data)
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo</h1>

      <Tabs defaultValue="solicitacoes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
        </TabsList>

        <TabsContent value="solicitacoes">
          <div className="grid gap-4">
            {solicitacoes.map((solicitacao) => (
              <Card key={solicitacao.id}>
                <CardHeader>
                  <CardTitle>{solicitacao.nomeCliente}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Telefone:</strong> {solicitacao.telefoneCliente}</p>
                  <p><strong>Cidade:</strong> {solicitacao.cidadeCliente}</p>
                  <p><strong>Bairro:</strong> {solicitacao.bairroCliente}</p>
                  <p><strong>Serviço:</strong> {solicitacao.descricaoServico}</p>
                  <p><strong>Data:</strong> {new Date(solicitacao.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profissionais">
          <div className="grid gap-4">
            {profissionais.map((profissional) => (
              <Card key={profissional.id}>
                <CardHeader>
                  <CardTitle>{profissional.nomeProfissional}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>Telefone:</strong> {profissional.telefoneProfissional}</p>
                  <p><strong>Tipo de Serviço:</strong> {profissional.tipoServico}</p>
                  <p><strong>Cidade:</strong> {profissional.cidadeFuncionario}</p>
                  <p><strong>Habilidades:</strong> {profissional.descricaoHabilidades}</p>
                  <p><strong>Data:</strong> {new Date(profissional.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
