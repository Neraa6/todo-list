// app/components/TaskItem.tsx
'use client'
import { Task } from '../types'
import React from 'react'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4"
        />
        <div className={task.completed ? 'line-through text-slate-400' : ''}>
          {task.title}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        aria-label="hapus"
        className="text-sm text-red-500 hover:text-red-700"
      >
        Hapus
      </button>
    </div>
  )
}
