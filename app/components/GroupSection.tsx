// components/GroupSection.tsx
'use client'
import TaskRow from './TaskRow'
import { Task } from '../types'

export default function GroupSection({ title, tasks, onToggle, onDelete, onUpdate, onAdd }: {
  title: string,
  tasks: Task[],
  onToggle: (id:string)=>void,
  onDelete: (id:string)=>void,
  onUpdate: (t:Task)=>void,
  onAdd?: ()=>void
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-6 rounded-sm bg-emerald-500"></div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-100 dark:border-slate-700">
        {/* header row */}
        <div className="flex items-center gap-4 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700">
          <div className="w-6"></div>
          <div className="flex-1">Task</div>
          <div className="w-36">Owner</div>
          <div className="w-40">Status</div>
          <div className="w-28">Due date</div>
          <div className="w-28">Priority</div>
          <div className="w-28">Notes</div>
          <div className="w-20">Files</div>
          <div className="w-40">Timeline</div>
          <div className="w-28">Last updated</div>
          <div className="w-12"></div>
        </div>

        {/* body rows */}
        <div>
          {tasks.map(t => (
            <TaskRow key={t.id} t={t} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
          ))}
        </div>

        <div className="p-3 border-t border-slate-100 dark:border-slate-700">
          <button onClick={onAdd} className="text-sky-600">+ Add task</button>
        </div>
      </div>
    </section>
  )
}
