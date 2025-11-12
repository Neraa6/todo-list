'use client';
import React from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';
import { Board } from '../types';

export default function BoardCard({ board }: { board: Board }) {
  const total = board.tasks.length;
  const done = board.tasks.filter((t) => t.status === 'done').length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Link
      href={`/board/${board.id}`}
      className="block p-4 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow hover:scale-[1.01] transition"
    >
      <h3 className="font-semibold">{board.title}</h3>
      <p className="text-sm text-gray-500">{board.description}</p>
      <div className="mt-3">
        <ProgressBar value={percent} />
      </div>
    </Link>
  );
}
