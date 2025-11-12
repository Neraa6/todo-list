'use client';
import React, { useState } from 'react';
import { Task } from '../../types';
import { Edit, Trash, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TaskCard({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="p-3 bg-white rounded-md shadow-sm border dark:bg-gray-800">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h5 className="font-medium">{task.title}</h5>
            <p className="text-xs text-muted-foreground">{task.assignee} • {task.deadline ? <><Calendar size={12}/> {new Date(task.deadline).toLocaleDateString()}</> : 'No deadline'}</p>
          </div>
          <div className="flex gap-2">
            <button title="Edit" className="p-1"><Edit size={16} /></button>
            <button title="Delete" className="p-1 text-rose-500"><Trash size={16} /></button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
