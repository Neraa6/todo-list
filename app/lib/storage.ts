// app/lib/storage.ts
import { Task } from '../types'

const STORAGE_KEY = 'todo_tasks_v2'

export function loadTasks(): Task[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (!raw) return []
    const parsed = JSON.parse(raw) as Task[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (err) {
    console.warn('loadTasks error', err)
    return []
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (err) {
    console.warn('saveTasks error', err)
  }
}
