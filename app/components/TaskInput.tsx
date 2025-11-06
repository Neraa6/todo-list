// app/components/TaskInput.tsx
'use client'
import { useState, FormEvent } from 'react'

type Props = {
  onAdd: (title: string, dueDate: string) => void
}

export default function TaskInput({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed, dueDate)
    setTitle('')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Tambah tugas baru..."
        className="flex-1 px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button type="submit" className="btn btn-primary">Tambah</button>
    </form>
  )
}
