// components/BoardGrid.tsx
'use client';

import React from 'react';
import BoardCard from './BoardCard';
import { Board } from '../types';

export default function BoardGrid({ boards }: { boards: Board[] }) {
  if (!boards.length) return <div className="text-center text-gray-500">No boards yet. Create one!</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards.map(b => <BoardCard key={b.id} board={b} />)}
    </div>
  );
}
