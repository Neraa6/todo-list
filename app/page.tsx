// app/page.tsx
'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { Task } from './types'
import { v4 as uuidv4 } from 'uuid'

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([])

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
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }
useEffect(() => {
  const raw = localStorage.getItem('tasks')
  if (raw) {
    try {
      setTasks(JSON.parse(raw))
    } catch {}
  }
}, [])

useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">To-Do List Harian Siswa</h1>
      <div className="space-y-4">
        <TaskInput onAdd={addTask} />
        <div className="bg-slate-100 p-4 rounded-md">
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
      </div>
    </main>
  )
}
