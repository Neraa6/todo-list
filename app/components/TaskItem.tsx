// app/components/TaskItem.tsx
'use client'
import { motion } from 'framer-motion'
import { Eye, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Task } from '../types'

type Props = { task: Task; onToggle: (id: string) => void; onDelete: (id: string) => void }

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  const router = useRouter()
  return (
    <motion.div layout initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
      className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${task.completed ? 'bg-slate-200 dark:bg-slate-700/40 border-slate-300 dark:border-slate-700' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md'}`}>
      <div className="flex items-center gap-3 flex-1" onClick={() => onToggle(task.id)}>
        {task.completed ? <CheckCircle2 className="text-green-500" /> : <Circle className="text-slate-400 dark:text-slate-500" />}
        <div>
          <div className={`font-medium ${task.completed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-100'}`}>
            {task.title}
          </div>
          {task.dueDate && <div className="text-xs text-slate-500 dark:text-slate-400">📅 {new Date(task.dueDate).toLocaleDateString('id-ID')}</div>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => router.push(`/tasks/${task.id}`)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
          <Eye size={16} />
        </button>
        <button onClick={() => router.push(`/tasks/edit/${task.id}`)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
          <Pencil size={16} />
        </button>
        <button onClick={() => onDelete(task.id)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-red-500">
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  )
}
