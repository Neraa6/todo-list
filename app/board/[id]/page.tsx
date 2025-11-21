// app/board/[id]/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTodo } from '../../context/TodoContext';
import Column from '../../components/BoardView/Column';
import TaskForm from '../../components/BoardView/TaskForm';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Task, Status } from '../../types';
import { Trash2 } from "lucide-react";



// ⬇️ Tambahkan import ProgressBar
import ProgressBar from '../../components/ProgressBar';

export default function BoardPage() {
  const params = useParams();
  const router = useRouter();
  const boardId = String(params.id);  
const { getBoard, addTask, updateTask, deleteTask, moveTask, deleteBoard } = useTodo();
  const board = getBoard(boardId);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  if (!board) return <div>Board not found</div>;

  const grouped = useMemo(() => ({
    'todo': board.tasks.filter(t => t.status === 'todo'),
    'in-progress': board.tasks.filter(t => t.status === 'in-progress'),
    'done': board.tasks.filter(t => t.status === 'done'),
  }), [board.tasks]);

  const openNew = (status: Status) => {
    setEditing({
      id: '',
      title: '',
      description: '',
      status,
      createdAt: new Date().toISOString(),
      assignedTo: '',
      deadline: ''
    });
    setFormOpen(true);
  };

  const handleSave = (payload: Omit<Task, 'id'|'createdAt'>) => {
    if (editing && editing.id) {
      updateTask(boardId, editing.id, payload);
    } else {
      addTask(boardId, payload);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleEdit = (task: Task) => {
    setEditing(task);
    setFormOpen(true);
  };

  const handleDelete = (taskId: string) => {
    if (!confirm('Delete task?')) return;
    deleteTask(boardId, taskId);
  };

  const onDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/taskId', taskId);
  };

  const onDropTask = (taskId: string, newStatus: Status) => {
    moveTask(boardId, taskId, newStatus);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ x: -12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 shadow-sm"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div>
            <h2 className="text-2xl font-bold">{board.title}</h2>
            <p className="text-sm text-gray-500">{board.description}</p>
          </div>
        </motion.div>

       <div className="flex items-center gap-2">
  <button
    onClick={() => openNew('todo')}
    className="px-3 py-1 rounded bg-indigo-500 text-white"
  >
    Add Task
  </button>

  {/* Delete Board Button */}
  <button
    onClick={() => {
      if (confirm("Delete this board permanently?")) {
        deleteBoard(boardId);
        router.push("/");
      }
    }}
    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
  >
    <Trash2 size={16} />
  </button>
</div>

      </div>

      <ProgressBar tasks={board.tasks} />

      {/* BOARD COLUMNS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['todo','in-progress','done'] as Status[]).map(status => (
          <Column
            key={status}
            status={status}
            tasks={grouped[status]}
            onAdd={() => openNew(status)}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDragStart={onDragStart}
            onDropTask={onDropTask}
          />
        ))}
      </section>

      {/* FORM */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TaskForm
              initial={editing ?? undefined}
              onCancel={() => { setFormOpen(false); setEditing(null); }}
              onSave={handleSave}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
