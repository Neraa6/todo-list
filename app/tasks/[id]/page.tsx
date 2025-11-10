// app/tasks/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Task } from '../../types'
import { loadTasks } from '../../lib/storage'

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const list = loadTasks()
    const found = list.find(t => t.id === id)
    setTask(found || null)
  }, [id])

  if (!task) {
    return (
      <main className="max-w-lg mx-auto p-6">
        <p className="text-center text-slate-500">Tugas tidak ditemukan.</p>
        <button onClick={() => router.back()} className="btn btn-primary mt-4">Kembali</button>
      </main>
    )
  }

  return (
    <main className="max-w-lg mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold text-sky-700">Detail Tugas</h1>
      <div className="card">
        <p className="font-semibold">{task.title}</p>
        <p className="text-sm text-slate-500">Tanggal: {task.dueDate || 'Tidak ditentukan'}</p>
        <p className="text-sm">Status: {task.completed ? '✅ Selesai' : '❌ Belum'}</p>
      </div>
      <div className="flex gap-3">
        <button onClick={() => router.back()} className="btn btn-primary">Kembali</button>
        <button onClick={() => router.push(`/tasks/edit/${task.id}`)} className="btn btn-primary bg-green-600 hover:bg-green-700">Edit</button>
      </div>
    </main>
  )
}
