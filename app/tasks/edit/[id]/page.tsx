// app/tasks/edit/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Task } from '../../../types'
import EditForm from '../../../components/EditForm'
import { loadTasks, saveTasks } from '../../../lib/storage'

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const list = loadTasks()
    const found = list.find(t => t.id === id)
    setTask(found || null)
  }, [id])

  function handleSave(updated: Task) {
    const list = loadTasks()
    const idx = list.findIndex(t => t.id === updated.id)
    if (idx !== -1) {
      list[idx] = updated
      saveTasks(list)
      alert('Perubahan disimpan!')
      router.push('/')
    } else {
      alert('Tugas tidak ditemukan (saat menyimpan).')
    }
  }

  if (!task) return <main className="p-6 text-center text-slate-500">Tugas tidak ditemukan.</main>

  return (
    <main className="max-w-lg mx-auto p-6 space-y-3">
      <h1 className="text-2xl font-bold text-sky-700">Edit Tugas</h1>
      <EditForm task={task} onSave={handleSave} />
    </main>
  )
}
