// app/components/TaskInput.tsx
'use client'
import { useState, FormEvent } from 'react'

type Props = {
  onAdd: (title: string) => void
}

export default function TaskInput({ onAdd }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Tambah tugas baru..."
        className="flex-1 px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
      >
        Tambah
      </button>
    </form>
  )
}
