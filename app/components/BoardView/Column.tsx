// components/BoardView/Column.tsx
'use client';

import React from 'react';
import { Task, Status } from '../../types';
import TaskCard from './TaskCard';
import { motion } from 'framer-motion';

type Props = {
  status: Status;
  tasks: Task[];
  onAdd: () => void;
  onEdit: (t: Task)=>void;
  onDelete: (taskId: string)=>void;
  onDropTask: (taskId: string, newStatus: Status)=>void;
  onDragStart: (e: React.DragEvent, taskId: string)=>void;
};

export default function Column({ status, tasks, onAdd, onEdit, onDelete, onDropTask, onDragStart }: Props) {
  const statusLabel = status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Done';
  return (
    <div className="p-3 bg-transparent">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{statusLabel} <span className="text-xs text-gray-400">({tasks.length})</span></h4>
        <button onClick={onAdd} className="text-sm px-2 py-1 rounded bg-indigo-50">Add</button>
      </div>

      <div
        onDragOver={(e)=> e.preventDefault()}
        onDrop={(e)=>{
          e.preventDefault();
          const taskId = e.dataTransfer.getData('text/taskId');
          if (taskId) onDropTask(taskId, status);
        }}
        className="min-h-[120px] p-2 rounded-2xl bg-white/40 dark:bg-gray-800/40 space-y-3 transition"
      >
        <motion.div layout className="space-y-3">
          {tasks.map(t => (
            <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} onDragStart={onDragStart} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
