'use client'
import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import TaskGroup from './components/TaskGroup'
import { Task } from './types'
import { v4 as uuidv4 } from 'uuid'
import { loadTasks, saveTasks } from './lib/storage'

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => setTasks(loadTasks()), [])

  const addTask = () => {
    const now = new Date().toISOString()
    const t: Task = {
      id: uuidv4(),
      title: 'New task',
      owner: undefined,
      status: 'working',
      priority: 'low',
      notes: '',
      files: 0,
      timeline: null,
      createdAt: now,
      updatedAt: now,
      completed: false
    }
    const upd = [t, ...tasks]
    setTasks(upd); saveTasks(upd)
  }

  const updateTask = (task: Task) => {
    const upd = tasks.map(t => t.id === task.id ? task : t)
    setTasks(upd); saveTasks(upd)
  }

  const toggleTask = (id: string) => {
    const upd = tasks.map(t => t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t)
    setTasks(upd); saveTasks(upd)
  }

  const deleteTask = (id: string) => {
    const upd = tasks.filter(t => t.id !== id)
    setTasks(upd); saveTasks(upd)
  }

  const todo = useMemo(() => tasks.filter(t => !t.completed), [tasks])
  const done = useMemo(() => tasks.filter(t => t.completed), [tasks])

  // deadline notification (once at mount)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dueToday = (tasks || []).filter(t => t.dueDate === today && !t.completed)
    if (dueToday.length) alert(`⚠️ Kamu punya ${dueToday.length} tugas jatuh tempo hari ini!`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex-1">
        <Topbar onNew={addTask} />

        <main className="p-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600 dark:text-slate-400">Main table</div>
              <div className="text-sm text-slate-400">Cards</div>
              <div className="text-sm text-slate-400">+</div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400"> {/* dummy icons/action */} </div>
          </div>

          <TaskGroup title="To-Do" color="bg-blue-500" tasks={todo} onToggle={toggleTask} onUpdate={updateTask} onDelete={deleteTask} onAdd={addTask} />
          <TaskGroup title="Completed" color="bg-green-500" tasks={done} onToggle={toggleTask} onUpdate={updateTask} onDelete={deleteTask} onAdd={addTask} />

          <div className="mt-6">
            <button className="px-3 py-2 border border-slate-200 rounded-md">+ Add new group</button>
          </div>
        </main>
      </div>
    </div>
  )
}
