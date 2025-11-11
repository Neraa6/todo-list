// app/page.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import ThemeToggle from './components/ThemeToggle'
import { Task } from './types'
import { v4 as uuidv4 } from 'uuid'
import { loadTasks, saveTasks } from './lib/storage'

type Filter = 'all'|'active'|'completed'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => { setTasks(loadTasks()) }, [])

  function addTask(title: string, dueDate: string) {
    const n: Task = { id: uuidv4(), title, completed: false, createdAt: new Date().toISOString(), dueDate }
    setTasks(prev => { const upd = [n, ...prev]; saveTasks(upd); return upd })
  }
  function toggleTask(id: string) {
    setTasks(prev => { const upd = prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t); saveTasks(upd); return upd })
  }
  function deleteTask(id: string) {
    setTasks(prev => { const upd = prev.filter(t => t.id !== id); saveTasks(upd); return upd })
  }

  // deadline notification on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dueToday = loadTasks().filter(t => t.dueDate === today && !t.completed)
    if (dueToday.length) {
      // simple alert — optional: replace with toast lib
      alert(`⚠️ Kamu punya ${dueToday.length} tugas jatuh tempo hari ini!`)
    }
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = tasks.slice()
    if (filter === 'active') arr = arr.filter(t => !t.completed)
    if (filter === 'completed') arr = arr.filter(t => t.completed)
    if (q) arr = arr.filter(t => t.title.toLowerCase().includes(q))
    return arr
  }, [tasks, filter, query])

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400">To-Do List Harian Siswa</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Catat tugas & atur prioritas — buat harimu lebih produktif</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="🔍 Cari tugas..." className="flex-1 px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
        <div className="md:ml-3"><FilterBar filter={filter} onChange={setFilter} /></div>
      </div>

      <TaskInput onAdd={addTask} />

      <div className="mt-4 card">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total: <span className="font-medium">{tasks.length}</span> • Selesai: <span className="font-medium">{tasks.filter(t => t.completed).length}</span>
          </div>
        </div>
        <TaskList tasks={visible} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </main>
  )
}
