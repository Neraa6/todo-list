// components/ProgressBar.tsx
import React from 'react';

export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div style={{ width: `${value}%` }} className="h-full bg-emerald-400 transition-all" />
    </div>
  );
}
