// app/page.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import { Task } from './types'
import { v4 as uuidv4 } from 'uuid'

type Filter = 'all' | 'active' | 'completed'
const STORAGE_KEY = 'todo_tasks_v2'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  // load tasks
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTasks(JSON.parse(raw))
    } catch {}
  }, [])

  // save tasks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(title: string, dueDate: string) {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate,
    }
    setTasks(prev => [newTask, ...prev])
  }

  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = tasks
    if (filter === 'active') arr = arr.filter(t => !t.completed)
    if (filter === 'completed') arr = arr.filter(t => t.completed)
    if (q) arr = arr.filter(t => t.title.toLowerCase().includes(q))
    return arr
  }, [tasks, filter, query])

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-sky-700 mb-1">To-Do List Harian Siswa</h1>
        <p className="text-slate-500 text-sm">Catat tugas, atur prioritas, dan selesaikan dengan semangat ✨</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="🔍 Cari tugas..."
          className="flex-1 px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <FilterBar filter={filter} onChange={setFilter} />
      </div>

      <TaskInput onAdd={addTask} />

      <div className="bg-slate-100 p-4 rounded-xl">
        <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
      </div>
    </main>
  )
}
