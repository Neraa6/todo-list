// types.ts
export type Status = 'working' | 'done' | 'stuck'
export type Priority = 'low' | 'medium' | 'high'

export type Timeline = { start: string; end: string } | null

export type Task = {
  id: string
  title: string
  owner?: string
  status: Status
  dueDate?: string // yyyy-mm-dd
  priority?: Priority
  notes?: string
  files?: number
  timeline?: Timeline
  updatedAt: string // ISO
  createdAt: string // ISO
  completed?: boolean
}
