'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [project, setProject] = useState<string>('')
  const router = useRouter()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setStatus('Iniciando upload…')
    setProgress(5)

    const sigRes = await fetch('/api/sign-cloudinary', { method: 'POST', body: JSON.stringify({ project }) })
    const sig = await sigRes.json()

    const form = new FormData()
    form.append('file', file)
    form.append('api_key', sig.apiKey)
    form.append('timestamp', String(sig.timestamp))
    form.append('signature', sig.signature)
    form.append('folder', sig.folder)
    form.append('tags', sig.tag)
    if (sig.context) form.append('context', sig.context)
    const endpoint = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`

    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint, true)

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) setProgress(Math.round((evt.loaded / evt.total) * 100))
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        setStatus('Upload concluído!')
        setTimeout(() => router.push(project ? `/projetos/${encodeURIComponent(project)}` : '/galeria'), 800)
      } else {
        setStatus('Falha no upload. Verifique credenciais da Cloudinary.')
      }
    }
    xhr.onerror = () => setStatus('Erro de rede no upload.')
    xhr.send(form)
  }

  return (
    <section className="container py-14 max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin — Upload de mídia</h1>
        <form action="/api/logout" method="post">
          <button className="text-sm text-gray-500 underline">Sair</button>
        </form>
      </div>
      <p className="text-gray-600 mt-2">
        Envie fotos (.jpg, .png) ou vídeos (.mp4). Eles aparecerão automaticamente na <strong>Galeria</strong>.
        Se preencher <strong>Projeto</strong>, ficarão organizados por pasta.
      </p>

      <form onSubmit={handleUpload} className="mt-6 space-y-4 card p-6">
        <label className="block text-sm font-medium">Projeto (nome da pasta)</label>
        <input type="text" placeholder="Ex.: Residencial Cranford — Cozinha" value={project} onChange={e => setProject(e.target.value)} className="w-full border rounded-md px-3 py-2" />
        <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button className="btn" type="submit" disabled={!file}>Enviar</button>
        {progress > 0 && <div className="w-full bg-gray-200 rounded h-2"><div className="bg-green-600 h-2 rounded" style={{width: progress + '%'}}/></div>}
        {status && <p className="text-sm text-gray-700">{status}</p>}
      </form>
    </section>
  )
}
