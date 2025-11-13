'use client';
import React, { useState } from 'react';
import { useTodo } from './context/TodoContext';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';

export default function DashboardPage() {
  const { boards, createBoard } = useTodo();
  const router = useRouter();
  const [name, setName] = useState('');

  const handleCreateBoard = () => {
    if (!name.trim()) return;
    createBoard(name.trim());
    setName('');
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Board Name"
          className="px-3 py-2 rounded-lg border bg-white/70"
        />
        <button
          onClick={handleCreateBoard}
          className="px-3 py-2 rounded-lg bg-indigo-500 text-white"
        >
          + Add Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map((b) => (
          <div
            key={b.id}
            onClick={() => router.push(`/board/${b.id}`)}
            className="cursor-pointer p-4 bg-white rounded-2xl shadow-md hover:scale-[1.02] transition-transform"
          >
            <h3 className="font-semibold">{b.name}</h3>
            <p className="text-sm text-gray-500">{b.tasks.length} tasks</p>
          </div>
        ))}
      </div>
    </section>
  );
}
