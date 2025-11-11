// types.ts
export type Status = 'working' | 'done' | 'stuck'
export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  owner?: string // can be avatar initials or name
  status: Status
  dueDate?: string // ISO yyyy-mm-dd
  priority?: Priority
  notes?: string
  files?: number
  timeline?: { start: string; end: string } | null
  updatedAt: string // ISO
}
