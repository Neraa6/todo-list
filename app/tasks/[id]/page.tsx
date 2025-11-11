// app/tasks/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Task } from '../../types'
import { loadTasks } from '../../lib/storage'
import { ArrowLeft, Pencil } from 'lucide-react'

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const list = loadTasks()
    const found = list.find(t => t.id === id)
    setTask(found || null)
  }, [id])

  if (!task) return <main className="p-6 text-center text-slate-500 dark:text-slate-400">Tugas tidak ditemukan.</main>

  return (
    <main className="max-w-lg mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-slate-500 hover:text-sky-500 flex items-center gap-1">
          <ArrowLeft size={16}/> Kembali
        </button>
        <button onClick={() => router.push(`/tasks/edit/${task.id}`)} className="text-slate-500 hover:text-amber-500 flex items-center gap-1">
          <Pencil size={16}/> Edit
        </button>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{task.title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Tanggal: {task.dueDate || 'Tidak ditentukan'}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Status: {task.completed ? '✅ Selesai' : '❌ Belum'}</p>
      </div>
    </main>
  )
}
