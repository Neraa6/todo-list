// app/tasks/edit/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Task } from '../../../types'
import { loadTasks, saveTasks } from '../../../lib/storage'
import { ArrowLeft } from 'lucide-react'

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    const list = loadTasks()
    const found = list.find(t => t.id === id)
    if (found) {
      setTask(found); setTitle(found.title); setDueDate(found.dueDate || '')
    }
  }, [id])

  function handleSave() {
    if (!task) return
    const list = loadTasks()
    const idx = list.findIndex(t => t.id === task.id)
    if (idx !== -1) {
      list[idx] = { ...task, title, dueDate }
      saveTasks(list)
      alert('✅ Perubahan disimpan')
      router.push('/')
    } else {
      alert('Tugas tidak ditemukan')
    }
  }

  if (!task) return <main className="p-6 text-center text-slate-500 dark:text-slate-400">Tugas tidak ditemukan.</main>

  return (
    <main className="max-w-lg mx-auto p-6 space-y-4">
      <button onClick={() => router.back()} className="text-slate-500 hover:text-sky-500 flex items-center gap-1">
        <ArrowLeft size={16}/> Kembali
      </button>

      <div className="card space-y-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Edit Tugas</h2>
        <div>
          <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Judul</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full" />
        </div>
        <div>
          <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Tanggal</label>
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full" />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={() => router.back()} className="btn-ghost">Batal</button>
          <button onClick={handleSave} className="btn-primary">Simpan Perubahan</button>
        </div>
      </div>
    </main>
  )
}
