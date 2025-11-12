'use client';
import React, { useState } from 'react';
import { Status } from '../../types';

export default function TaskForm({ onSubmit, initial }: { onSubmit: (payload:any)=>void, initial?: any }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [desc, setDesc] = useState(initial?.description ?? '');
  const [status, setStatus] = useState<Status>(initial?.status ?? 'todo');
  const [assignee, setAssignee] = useState(initial?.assignee ?? '');
  const [deadline, setDeadline] = useState(initial?.deadline ?? '');

  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit({ title, description: desc, status, assignee, deadline }); }}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" className="w-full mb-2" />
      <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Short description" className="w-full mb-2" />
      <div className="flex gap-2">
        <select value={status} onChange={(e)=>setStatus(e.target.value as Status)}>
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input type="date" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
      </div>
      <div className="mt-2 flex justify-end">
        <button className="px-3 py-1 rounded bg-indigo-500 text-white">Save</button>
      </div>
    </form>
  );
}
