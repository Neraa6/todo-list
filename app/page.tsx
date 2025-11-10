// app/page.tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import { Task } from './types'
import { v4 as uuidv4 } from 'uuid'
import { loadTasks, saveTasks } from './lib/storage'
import ThemeToggle from './components/ThemeToggle'


type Filter = 'all' | 'active' | 'completed'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  // load tasks sekali saat mount
  useEffect(() => {
    const data = loadTasks()
    setTasks(data)
     const today = new Date().toISOString().split('T')[0]
  const nearDeadline = data.filter(t => t.dueDate === today && !t.completed)
  if (nearDeadline.length > 0) {
    alert(`⚠️ Kamu punya ${nearDeadline.length} tugas jatuh tempo hari ini!`)
  }
  }, [])

  // ADD: tambah task dan langsung save
  function addTask(title: string, dueDate: string) {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate,
    }

    setTasks(prev => {
      const updated = [newTask, ...prev]
      saveTasks(updated) // langsung simpan
      return updated
    })
  }

  // TOGGLE: toggle completed + langsung save
  function toggleTask(id: string) {
    setTasks(prev => {
      const updated = prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
      saveTasks(updated)
      return updated
    })
  }

  // DELETE: hapus + langsung save
  function deleteTask(id: string) {
    setTasks(prev => {
      const updated = prev.filter(t => t.id !== id)
      saveTasks(updated)
      return updated
    })
  }

  // Ini berguna kalau ada operasi lain yang mengubah tasks secara global
  function replaceAllTasks(newList: Task[]) {
    setTasks(newList)
    saveTasks(newList)
  }

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = tasks.slice()
    if (filter === 'active') arr = arr.filter(t => !t.completed)
    if (filter === 'completed') arr = arr.filter(t => t.completed)
    if (q) arr = arr.filter(t => t.title.toLowerCase().includes(q))
    return arr
  }, [tasks, filter, query])

  return (
   <main className="max-w-2xl mx-auto p-6 space-y-5">
  <div className="flex justify-between items-center">
    <h1 className="text-3xl font-bold text-sky-700 dark:text-sky-300">
      To-Do List Harian Siswa
    </h1>
    <ThemeToggle />
  </div>
  <p className="text-slate-500 dark:text-slate-400 text-sm text-center sm:text-left">
    Catat tugas, atur prioritas, dan selesaikan dengan semangat ✨
  </p>
  ...

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
