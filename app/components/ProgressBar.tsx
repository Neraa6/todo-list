// components/ProgressBar.tsx
'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';

type Props = {
  tasks: Task[];
  className?: string;
  // optional: control height
  height?: number;
};

export default function ProgressBar({ tasks, className = '', height = 10 }: Props) {
  const { total, inProgress, done, todo, pctDone } = useMemo(() => {
    const safeTasks = tasks ?? []; // fallback jika undefined

const total = safeTasks.length;
const inProgress = safeTasks.filter(t => t.status === "in-progress").length;
const done = safeTasks.filter(t => t.status === "done").length;
const todo = total - inProgress - done;

    const pctDone = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, inProgress, done, todo, pctDone };
  }, [tasks]);

  // compute width percentages for segments (sum should be 100)
  const widths = useMemo(() => {
    if (total === 0) return { doneW: 0, inProgW: 0, todoW: 100 };
    const doneW = (done / total) * 100;
    const inProgW = (inProgress / total) * 100;
    const todoW = 100 - doneW - inProgW;
    return { doneW, inProgW, todoW };
  }, [total, done, inProgress]);

  return (
    <div className={`w-full ${className}`}>
      {/* Top row: counts + percent */}
      <div className="flex items-center justify-between mb-2 gap-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Total</span>
            <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium">{total}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">In Progress</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">{inProgress}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Done</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">{done}</span>
          </div>
        </div>

        <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {pctDone}% Done
        </div>
      </div>

      {/* Progress bar container */}
      <div
        className="w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden"
        style={{ height }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(widths.doneW)}
      >
        <div className="relative w-full h-full flex">
          {/* Done segment (green pastel) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${widths.doneW}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="h-full"
            style={{ background: 'linear-gradient(90deg,#C6F6D5,#9AE6B4)' }}
          />

          {/* In Progress segment (blue pastel) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${widths.inProgW}%` }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
            className="h-full"
            style={{ background: 'linear-gradient(90deg,#BEE3F8,#90CDF4)' }}
          />

          {/* To Do segment (remaining, gray soft) */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${widths.todoW}%` }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="h-full"
            style={{ background: 'transparent' }}
          />
        </div>
      </div>
    </div>
  );
}
