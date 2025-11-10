// app/components/TaskItem.tsx
'use client'
import { Task } from '../types'
import { motion } from 'framer-motion'
import Link from 'next/link'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  const dateLabel = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
    : new Date(task.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
      className="card flex items-center justify-between">
      <div className="flex items-center gap-3 w-full">
        <input type="checkbox" checked={task.completed}
          onChange={() => onToggle(task.id)} className="w-5 h-5 accent-sky-500" />
        <div className="flex-1">
          <div className={`font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {task.title}
          </div>
          <div className="text-xs text-slate-500">{dateLabel}</div>
        </div>
      </div>
      <div className="flex gap-2 ml-3">
        <Link href={`/tasks/${task.id}`} className="text-sm text-sky-500 hover:underline">Lihat</Link>
        <Link href={`/tasks/edit/${task.id}`} className="text-sm text-green-500 hover:underline">Edit</Link>
        <button onClick={() => onDelete(task.id)} className="text-sm text-red-500 hover:text-red-700">Hapus</button>
      </div>
    </motion.div>
  )
}
