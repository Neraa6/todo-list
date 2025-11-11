// app/page.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import GroupSection from './components/GroupSection'
import { Task } from './types'
import { v4 as uuidv4 } from 'uuid'
import { loadTasks, saveTasks } from './lib/storage'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => { setTasks(loadTasks()) }, [])

  // add new task into "To-Do" group
  function addNewTask() {
    const n: Task = {
      id: uuidv4(),
      title: 'New task',
      status: 'working',
      priority: 'low',
      dueDate: undefined,
      notes: '',
      files: 0,
      timeline: null,
      owner: undefined,
      updatedAt: new Date().toISOString()
    }
    setTasks(prev => { const upd = [n, ...prev]; saveTasks(upd); return upd })
  }

  function toggleDone(id:string) {
    setTasks(prev => {
      const upd = prev.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'working' : 'done', updatedAt: new Date().toISOString() } : t)
      saveTasks(upd); return upd
    })
  }

  function deleteTask(id:string) {
    setTasks(prev => { const upd = prev.filter(t=> t.id !== id); saveTasks(upd); return upd })
  }

  function updateTask(task: Task) {
    setTasks(prev => {
      const idx = prev.findIndex(p => p.id === task.id)
      if (idx === -1) return prev
      const copy = [...prev]; copy[idx] = task; saveTasks(copy); return copy
    })
  }

  // split to groups
  const todo = useMemo(()=> tasks.filter(t => t.status !== 'done'), [tasks])
  const completed = useMemo(()=> tasks.filter(t => t.status === 'done'), [tasks])

  // deadline notification (simple)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dueToday = tasks.filter(t => t.dueDate === today && t.status !== 'done')
    if (dueToday.length) {
      // for now use alert; you can replace with a toast UI lib
      alert(`⚠️ Kamu punya ${dueToday.length} tugas jatuh tempo hari ini!`)
    }
    // run once on mount (only)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar onNew={addNewTask} />

        <main className="p-6 max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-500">Main table</div>
              <div className="text-sm text-slate-400">Cards</div>
            </div>
          </div>

          <GroupSection title="To-Do" tasks={todo} onToggle={toggleDone} onDelete={deleteTask} onUpdate={updateTask} onAdd={addNewTask} />
          <GroupSection title="Completed" tasks={completed} onToggle={toggleDone} onDelete={deleteTask} onUpdate={updateTask} onAdd={addNewTask} />

          <div className="mt-6">
            <button className="px-3 py-2 border border-slate-200 rounded-md" onClick={() => { /* add group - dummy */ }}>+ Add new group</button>
          </div>
        </main>
      </div>
    </div>
  )
}
