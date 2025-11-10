// app/components/EditForm.tsx
'use client'
import { useState, FormEvent } from 'react'
import { Task } from '../types'

type Props = {
  task: Task
  onSave: (t: Task) => void
}

export default function EditForm({ task, onSave }: Props) {
  const [title, setTitle] = useState(task.title)
  const [dueDate, setDueDate] = useState(task.dueDate || '')
  const [completed, setCompleted] = useState(task.completed)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({ ...task, title, dueDate, completed })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Judul Tugas</label>
        <input value={title} onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400" />
      </div>
      <div>
        <label className="block text-sm font-medium">Tanggal</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-400" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
        <span>Selesai</span>
      </div>
      <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
    </form>
  )
}
