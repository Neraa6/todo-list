// components/BoardCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Board } from '../types';
import ProgressBar from './ProgressBar';

export default function BoardCard({ board }: { board: Board }) {
  const total = board.tasks.length;
  const done = board.tasks.filter(t => t.status === 'done').length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Link href={`/board/${board.id}`} className="block p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:scale-[1.01] transition">
      <h3 className="font-semibold text-lg">{board.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{board.description}</p>
      <div className="mt-3">
        <ProgressBar tasks={board.tasks ?? []}/>
      </div>
    </Link>
  );
}
