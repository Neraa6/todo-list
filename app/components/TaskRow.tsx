'use client'
import { Task } from '../types'
import StatusBadge from './StatusBadge'
import TimelineBar from './TimelineBar'
import { FileText, UserCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (t: Task) => void
  onDelete: (id: string) => void
}

export default function TaskRow({ task, onToggle, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState<string | null>(null)
  const [temp, setTemp] = useState<any>({})

  const startEdit = (field: string) => {
    setEditing(field)
    setTemp((p: any) => ({ ...p, [field]: (task as any)[field] }))
  }
  const save = (field: string) => {
    if (!editing) return
    const newVal = temp[field] ?? (task as any)[field]
    onUpdate({ ...task, [field]: newVal, updatedAt: new Date().toISOString() })
    setEditing(null)
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
      className="grid grid-cols-10 gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-700 items-center table-row-hover">
      {/* checkbox */}
      <div className="flex items-center">
        <input type="checkbox" checked={task.completed} onChange={() => { onToggle(task.id); }} className="w-4 h-4 accent-sky-600"/>
      </div>

      {/* task title */}
      <div className="truncate">
        {editing === 'title' ? (
          <input autoFocus value={temp.title ?? task.title} onChange={e => setTemp({ ...temp, title: e.target.value })} onBlur={() => save('title')}
            className="w-full text-sm px-2 py-1 border rounded-md" />
        ) : (
          <div className="text-sm font-medium truncate" onDoubleClick={() => startEdit('title')}>{task.title}</div>
        )}
      </div>

      {/* owner */}
      <div className="flex items-center justify-center">
        <UserCircle size={20} className="text-slate-500" />
      </div>

      {/* status */}
      <div className="flex justify-center">
        <StatusBadge status={task.status} onChange={(s) => onUpdate({ ...task, status: s, updatedAt: new Date().toISOString() })} />
      </div>

      {/* due date */}
      <div className="text-center">
        {editing === 'dueDate' ? (
          <input type="date" value={temp.dueDate ?? task.dueDate ?? ''} onChange={e => setTemp({ ...temp, dueDate: e.target.value })} onBlur={() => save('dueDate')}
            className="text-xs px-2 py-1 rounded-md border" />
        ) : (
          <div className="text-xs text-slate-600 dark:text-slate-400" onDoubleClick={() => startEdit('dueDate')}>{task.dueDate ?? '-'}</div>
        )}
      </div>

      {/* priority */}
      <div className="text-center">
        {editing === 'priority' ? (
          <select value={temp.priority ?? task.priority ?? 'low'} onChange={e => setTemp({ ...temp, priority: e.target.value })} onBlur={() => save('priority')}
            className="text-xs rounded-md px-2 py-1">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        ) : (
          <div onDoubleClick={() => startEdit('priority')}>
            <div className={`text-xs font-semibold px-2 py-1 rounded-md inline-block ${
              task.priority === 'high' ? 'bg-purple-700 text-white' : task.priority === 'medium' ? 'bg-purple-400 text-white' : 'bg-blue-300 text-white'}`}>
              {task.priority ?? 'Low'}
            </div>
          </div>
        )}
      </div>

      {/* notes */}
      <div className="text-center">
        {editing === 'notes' ? (
          <input autoFocus value={temp.notes ?? task.notes ?? ''} onChange={e => setTemp({ ...temp, notes: e.target.value })} onBlur={() => save('notes')}
            className="text-xs px-2 py-1 rounded-md border w-full" />
        ) : (
          <div className="text-xs text-slate-600 dark:text-slate-400 truncate" onDoubleClick={() => startEdit('notes')}>{task.notes ?? '-'}</div>
        )}
      </div>

      {/* files */}
      <div className="flex items-center justify-center">
        {editing === 'files' ? (
          <input type="number" value={temp.files ?? task.files ?? 0} onChange={e => setTemp({ ...temp, files: Number(e.target.value) })} onBlur={() => save('files')}
            className="w-16 text-xs px-1 py-1 rounded-md border" />
        ) : (
          <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1" onDoubleClick={() => startEdit('files')}>
            <FileText size={14} className="text-slate-500" /> {task.files ?? 0}
          </div>
        )}
      </div>

      {/* timeline */}
      <div className="text-center">
        {editing === 'timeline' ? (
          <input type="text" value={temp.timeline ?? (task.timeline ? `${task.timeline.start} - ${task.timeline.end}` : '')} onChange={e => setTemp({ ...temp, timeline: e.target.value })} onBlur={() => {
            // For simplicity save as plain string -> you can parse to object later if needed
            onUpdate({ ...task, timeline: temp.timeline ?? task.timeline, updatedAt: new Date().toISOString() })
            setEditing(null)
          }} className="text-xs px-2 py-1 rounded-md border w-full" />
        ) : (
          task.timeline ? <TimelineBar start={task.timeline.start} end={task.timeline.end} /> : <div className="text-xs text-slate-400">-</div>
        )}
      </div>

      {/* updated */}
      <div className="text-xs text-center text-slate-500">
        {new Date(task.updatedAt || task.createdAt).toLocaleTimeString()}
      </div>
    </motion.div>
  )
}
