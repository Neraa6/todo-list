// app/components/TaskList.tsx
'use client'
import { Task } from '../types'
import TaskItem from './TaskItem'

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (!tasks.length) {
    return <div className="text-center text-slate-500">Belum ada tugas.</div>
  }
  return (
    <div className="flex flex-col gap-2">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  )
}
