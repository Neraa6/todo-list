// components/BoardView/TaskForm.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Task, Status } from '../../types';
import { X } from 'lucide-react';

type Props = {
  initial?: Partial<Task>;
  onCancel: () => void;
  onSave: (payload: Omit<Task, 'id'|'createdAt'>) => void;
  submitLabel?: string;
};

export default function TaskForm({ initial, onCancel, onSave, submitLabel = 'Save' }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [status, setStatus] = useState<Status>(initial?.status ?? 'todo');
  const [deadline, setDeadline] = useState(initial?.deadline ?? '');
  const [assignedTo, setAssignedTo] = useState(initial?.assignedTo ?? '');

  useEffect(() => {
    setTitle(initial?.title ?? '');
    setDescription(initial?.description ?? '');
    setStatus(initial?.status ?? 'todo');
    setDeadline(initial?.deadline ?? '');
    setAssignedTo(initial?.assignedTo ?? '');
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title is required');
    onSave({ title: title.trim(), description: description.trim(), status, deadline, assignedTo });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onCancel} className="absolute inset-0 bg-black/40" />
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{initial ? 'Edit Task' : 'Add Task'}</h3>
          <button type="button" onClick={onCancel} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 rounded-md border" />
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="w-full p-2 rounded-md border" rows={3} />
          <div className="flex gap-2">
            <select value={status} onChange={(e)=>setStatus(e.target.value as Status)} className="p-2 rounded-md border">
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <input type="date" value={deadline ?? ''} onChange={(e)=>setDeadline(e.target.value)} className="p-2 rounded-md border" />
            <input value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)} placeholder="Assigned to" className="p-2 rounded-md border flex-1" />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-3 py-1 rounded-md border">Cancel</button>
          <button type="submit" className="px-4 py-1 rounded-md bg-indigo-500 text-white">{submitLabel}</button>
        </div>
      </form>
    </div>
  );
}
