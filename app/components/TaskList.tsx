// app/components/TaskList.tsx
'use client'
import { AnimatePresence, motion } from 'framer-motion'
import TaskItem from './TaskItem'
import { Task } from '../types'

type Props = { tasks: Task[]; onToggle: (id: string) => void; onDelete: (id: string) => void }

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (!tasks.length) return <div className="text-center py-8 text-slate-500 dark:text-slate-400">✨ Belum ada tugas — tambahkan sekarang!</div>

  return (
    <motion.div layout className="flex flex-col gap-3">
      <AnimatePresence>
        {tasks.map(t => <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />)}
      </AnimatePresence>
    </motion.div>
  )
}
