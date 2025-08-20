export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-gray-500 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ACMP Plumbing. Todos os direitos reservados.</p>
        <p>Servindo NJ e região • Licenciamento sob responsabilidade técnica associada.</p>
      </div>
    </footer>
  )
}
