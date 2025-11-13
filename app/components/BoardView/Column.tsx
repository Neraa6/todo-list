'use client';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { Task } from '../../types';

export default function Column({
  boardId,
  status,
  tasks,
  onAdd,
}: {
  boardId: string;
  status: string;
  tasks: Task[];
  onAdd: () => void;
}) {
  const droppableId = `${boardId}-${status}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });
  const activeStyle = isOver ? 'ring-2 ring-indigo-200' : '';

  return (
    <div ref={setNodeRef} className={`w-80 p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-sm ${activeStyle} transition`}>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-sm">{status === 'todo' ? 'To Do' : status === 'inprogress' ? 'In Progress' : 'Done'}</h4>
        <button onClick={onAdd} className="text-xs px-2 py-1 rounded bg-indigo-50">Add</button>
      </div>
      <div className="space-y-3">
        {tasks.map((t) => (
          <TaskCard key={t.id} boardId={boardId} task={t} />
        ))}
      </div>
    </div>
  );
}
