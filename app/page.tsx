// app/page.tsx
'use client';

import React, { useState } from 'react';
import { useTodo } from './context/TodoContext';
import BoardGrid from './components/BoardGrid';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { boards, createBoard } = useTodo();
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (!title.trim()) return alert('Title required');
    createBoard(title.trim(), '');
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Boards</h1>
          <p className="text-sm text-gray-500">Organize tasks by project</p>
        </div>

        <div className="flex items-center gap-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New board title" className="p-2 rounded-md border" />
          <button onClick={handleCreate} className="px-3 py-1 rounded-md bg-indigo-500 text-white">Create</button>
        </div>
      </header>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <BoardGrid boards={boards} />
      </motion.section>
    </div>
  );
}
