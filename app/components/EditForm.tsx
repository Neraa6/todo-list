// app/components/EditForm.tsx
'use client'
import { useState, FormEvent } from 'react'
import { Task } from '../types'

type Props = { task: Task; onSave: (t: Task) => void }

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
        <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Judul Tugas</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full" />
      </div>
      <div>
        <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Tanggal</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full" />
      </div>
      <div className="flex items-center gap-2">
        <input id="done" type="checkbox" checked={completed} onChange={() => setCompleted(prev => !prev)} />
        <label htmlFor="done" className="text-sm text-slate-700 dark:text-slate-300">Selesai</label>
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => history.back()} className="btn-ghost">Batal</button>
        <button type="submit" className="btn-primary">Simpan</button>
      </div>
    </form>
  )
}
