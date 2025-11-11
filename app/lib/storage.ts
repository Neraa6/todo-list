// lib/storage.ts
import { Task } from '../types'

const KEY = 'monday_clone_tasks_v1'

export function loadTasks(): Task[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.warn('loadTasks error', e)
    return []
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  } catch (e) {
    console.warn('saveTasks error', e)
  }
}
