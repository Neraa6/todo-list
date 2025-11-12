'use client';
import React from 'react';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
 // simplified concept (actual API differs — see dnd-kit docs)

export default function Column({ status, tasks, onAdd }: { status: string; tasks: Task[]; onAdd: ()=>void }) {
  return (
    <div className="w-80 p-3 bg-white/60 dark:bg-gray-900/60 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium">{status === 'todo' ? 'To Do' : status === 'inprogress' ? 'In Progress' : 'Done'}</h4>
        <button onClick={onAdd} className="text-sm px-2 py-1 rounded bg-indigo-50">Add</button>
      </div>
      <div className="space-y-3">
        {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      </div>
    </div>
  );
}
