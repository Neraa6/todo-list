// app/components/TaskInput.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

type Props = { onAdd: (title: string, dueDate: string) => void }

export default function TaskInput({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    onAdd(t, dueDate)
    setTitle(''); setDueDate('')
  }

  return (
    <motion.form onSubmit={submit} layout className="card flex flex-col sm:flex-row gap-3 items-center">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="✍️ Tambah tugas baru..."
        className="flex-1"
      />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <motion.button whileTap={{ scale: .97 }} type="submit" className="btn-primary">
        Tambah
      </motion.button>
    </motion.form>
  )
}
