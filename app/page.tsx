// app/page.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import { Task } from './types'
import { v4 as uuidv4 } from 'uuid'

type Filter = 'all' | 'active' | 'completed'

const STORAGE_KEY = 'todo_tasks_v1' // versi key untuk kemudahan migrasi nanti

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  // load tasks from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Task[]
        // basic validation
        if (Array.isArray(parsed)) setTasks(parsed)
      }
    } catch (err) {
      console.warn('Gagal membaca tasks dari localStorage', err)
    }
  }, [])

  // sync to localStorage tiap tasks berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      console.warn('Gagal menyimpan tasks ke localStorage', err)
    }
  }, [tasks])

  function addTask(title: string) {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }

  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // derived: filtered + searched tasks
  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = tasks.slice() // copy
    if (filter === 'active') {
      arr = arr.filter(t => !t.completed)
    } else if (filter === 'completed') {
      arr = arr.filter(t => t.completed)
    }
    if (q) {
      arr = arr.filter(t => t.title.toLowerCase().includes(q))
    }
    return arr
  }, [tasks, filter, query])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">To-Do List Harian Siswa</h1>

      {/* search + info */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari tugas..."
            className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600 hidden sm:block">
            Total: <span className="font-medium">{tasks.length}</span> • Selesai:{' '}
            <span className="font-medium">{tasks.filter(t => t.completed).length}</span>
          </div>
          <FilterBar filter={filter} onChange={f => setFilter(f)} />
        </div>
      </div>

      {/* input */}
      <div className="mb-4">
        <TaskInput onAdd={addTask} />
      </div>

      {/* list */}
      <div className="bg-slate-100 p-4 rounded-md">
        <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
        {visibleTasks.length === 0 && (
          <div className="mt-3 text-sm text-slate-500">
            Tidak ada tugas yang cocok. Coba ubah filter atau kata kunci pencarian.
          </div>
        )}
      </div>
    </main>
  )
}
