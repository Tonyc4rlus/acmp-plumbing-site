import type { Metadata } from 'next'
import './globals.css'
import Nav from './Nav'
import Footer from './Footer'

export const metadata: Metadata = {
  title: 'ACMP Plumbing — Serviços profissionais de encanamento',
  description: 'Instalações e reparos em NJ. Orçamento rápido e atendimento profissional.',
  icons: [{ rel: 'icon', url: '/logo.svg' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Nav />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
