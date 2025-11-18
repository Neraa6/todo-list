// components/BoardView/TaskCard.tsx
'use client';

import React from 'react';
import { Task } from '../../types';
import { Edit3, Trash2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

type Props = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
};

export default function TaskCard({ task, onEdit, onDelete, onDragStart }: Props) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-md border"
      draggable
      onDragStart={(e)=> onDragStart && onDragStart(e, task.id)}
    >
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold">{task.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{task.assignedTo || 'Unassigned'}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button onClick={()=>onEdit(task)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><Edit3 size={16} /></button>
            <button onClick={()=>{ if(confirm('Delete task?')) onDelete(task.id); }} className="p-1 rounded text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900"><Trash2 size={16} /></button>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={12} />
            <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</span>
          </div>
        </div>
      </div>

      {task.description ? <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{task.description}</p> : null}

      <div className="mt-3">
        <span className={`px-2 py-1 rounded-full text-xs ${task.status === 'done' ? 'bg-emerald-100 text-emerald-700' : task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-sky-100 text-sky-700'}`}>
          {task.status === 'todo' ? 'To Do' : task.status === 'in-progress' ? 'In Progress' : 'Done'}
        </span>
      </div>
    </motion.article>
  );
}
