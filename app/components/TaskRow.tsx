// components/TaskRow.tsx
'use client'
import { Task } from '../types'
import StatusMenu from './StatusMenu'
import TimelineBar from './TimelineBar'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TaskRow({ t, onToggle, onDelete, onUpdate }: { t: Task, onToggle: (id:string)=>void, onDelete:(id:string)=>void, onUpdate:(task:Task)=>void }) {
  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState(t.title)

  function saveTitle() {
    if (title.trim() && title !== t.title) {
      onUpdate({ ...t, title, updatedAt: new Date().toISOString() })
    }
    setEditingTitle(false)
  }

  return (
    <motion.div layout initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="flex items-center gap-4 px-3 py-2 border-b border-slate-100 dark:border-slate-800">
      <input type="checkbox" checked={t.status === 'done'} onChange={() => onToggle(t.id)} className="w-4 h-4"/>
      <div className="flex-1">
        {editingTitle ? (
          <input value={title} onChange={e => setTitle(e.target.value)} onBlur={saveTitle} onKeyDown={(e)=> e.key==='Enter' && saveTitle()} className="w-full"/>
        ) : (
          <div className="text-sm font-medium" onDoubleClick={() => setEditingTitle(true)}>{t.title}</div>
        )}
      </div>

      <div className="w-36 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">U</div>
        </div>
      </div>

      <div className="w-40">
        <StatusMenu status={t.status} onChange={(s)=> onUpdate({...t, status: s as any, updatedAt: new Date().toISOString()})} />
      </div>

      <div className="w-28 text-sm text-slate-600 dark:text-slate-300">{t.dueDate || '-'}</div>

      <div className="w-28">
        <div className={`px-2 py-1 rounded-md text-xs ${t.priority==='high' ? 'bg-purple-700 text-white' : t.priority==='medium' ? 'bg-purple-400 text-white' : 'bg-blue-300 text-white'}`}>
          {t.priority || 'Low'}
        </div>
      </div>

      <div className="w-28 text-sm text-slate-600 dark:text-slate-300">{t.notes || '-'}</div>

      <div className="w-20 text-sm text-slate-600 dark:text-slate-300">{t.files ? `${t.files} files` : '-'}</div>

      <div className="w-40"><TimelineBar start={t.timeline?.start} end={t.timeline?.end} /></div>

      <div className="w-28 text-sm text-slate-600 dark:text-slate-300">{new Date(t.updatedAt).toLocaleTimeString()}</div>

      <div className="w-12">
        <button onClick={()=> onDelete(t.id)} className="text-red-500">Delete</button>
      </div>
    </motion.div>
  )
}
