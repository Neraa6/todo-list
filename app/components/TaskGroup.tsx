'use client'
import TaskRow from './TaskRow'
import { Task } from '../types'
import { motion } from 'framer-motion'

export default function TaskGroup({ title, color, tasks, onToggle, onUpdate, onDelete, onAdd }: {
  title: string
  color: string
  tasks: Task[]
  onToggle: (id: string) => void
  onUpdate: (t: Task) => void
  onDelete: (id: string) => void
  onAdd?: () => void
}) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-2 h-6 rounded-sm ${color}`} />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-10 gap-2 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
          <div></div>
          <div>Task</div>
          <div className="text-center">Owner</div>
          <div className="text-center">Status</div>
          <div className="text-center">Due date</div>
          <div className="text-center">Priority</div>
          <div className="text-center">Notes</div>
          <div className="text-center">Files</div>
          <div className="text-center">Timeline</div>
          <div className="text-center">Last updated</div>
        </div>

        <motion.div layout>
          {tasks.map(t => (
            <TaskRow key={t.id} task={t} onToggle={onToggle} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </motion.div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          <button onClick={onAdd} className="text-sky-600">+ Add task</button>
        </div>
      </div>
    </section>
  )
}
