// components/BoardView/BoardView.tsx
'use client';
import React from 'react';
import { useTodo } from '../../context/TodoContext';
import BoardCard from '../BoardCard';

export default function BoardView() {
  const { boards, createBoard } = useTodo();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Boards</h2>
        <button onClick={()=>createBoard('New Board')} className="px-3 py-1 rounded-xl bg-indigo-500 text-white">New Board</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map(b => <BoardCard key={b.id} board={b} />)}
      </div>
    </section>
  );
}
