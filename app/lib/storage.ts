// app/lib/storage.ts
import { Task } from '../types'

const STORAGE_KEY = 'todo_tasks_v2'

export function loadTasks(): Task[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed) ? parsed : []
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
