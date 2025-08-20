'use client'

import Link from 'next/link'

import Image from 'next/image'

import { usePathname } from 'next/navigation'



export default function Nav() {

  const pathname = usePathname()

  const nav = [

    { href: '/', label: 'Início' },

    { href: '/servicos', label: 'Serviços' },

    { href: '/galeria', label: 'Galeria' },

    { href: '/projetos', label: 'Projetos' },

    { href: '/contato', label: 'Contato' },

  ]

  return (

    <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">

      <div className="container flex items-center justify-between py-3">

        <Link href="/" className="flex items-center gap-2">

          <Image src="/logo.svg" alt="ACMP Plumbing" width={160} height={40} priority />

        </Link>

        <nav className="flex gap-6 text-sm font-medium">

          {nav.map(i => (

            <Link key={i.href} href={i.href}

              className={`hover:text-green-600 ${pathname === i.href ? 'text-green-700' : 'text-gray-700'}`}>

              {i.label}

            </Link>

          ))}

          <Link href="/admin/login" className="text-gray-400 hover:text-gray-600">Admin</Link>

        </nav>

      </div>

    </header>

  )

}

