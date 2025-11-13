// app/board/[id]/page.tsx
'use client';
import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTodo } from '../../context/TodoContext';
import TaskForm from '../../components/BoardView/TaskForm';
import TaskCard from '../../components/BoardView/TaskCard';
import { AnimatePresence, motion } from 'framer-motion';

export default function BoardPage() {
  const params = useParams();
  const boardId = params.id;
  const { getBoard, addTask, updateTask, deleteTask } = useTodo();
  const board = getBoard(boardId);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<null | any>(null); // Task | null

  if (!board) return <div>Board not found</div>;

  // optional: grouped by status
  const grouped = useMemo(() => {
    return {
      todo: board.tasks.filter(t => t.status === 'todo'),
      inprogress: board.tasks.filter(t => t.status === 'inprogress'),
      done: board.tasks.filter(t => t.status === 'done'),
    };
  }, [board.tasks]);

  const handleAddClick = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleSaveNew = (payload: any) => {
    addTask(boardId, payload);
    setFormOpen(false);
  };

  const handleEdit = (task: any) => {
    setEditing(task);
    setFormOpen(true);
  };

  const handleSaveEdit = (payload: any) => {
    if (!editing) return;
    updateTask(boardId, editing.id, payload);
    setEditing(null);
    setFormOpen(false);
  };

  const handleDelete = (taskId: string) => {
    const ok = confirm('Are you sure you want to delete this task?');
    if (!ok) return;
    deleteTask(boardId, taskId);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{board.title}</h2>
          <p className="text-sm text-gray-500">{board.description}</p>
        </div>
        <div>
          <button onClick={handleAddClick} className="px-3 py-1 rounded-md bg-indigo-500 text-white">Add Task</button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['todo','inprogress','done'] as const).map(status=>(
          <div key={status} className="bg-transparent">
            <h3 className="font-semibold mb-3">{status === 'todo' ? 'To Do' : status === 'inprogress' ? 'In Progress' : 'Done'}</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {grouped[status].map(task => (
                  <motion.div key={task.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                    <TaskCard task={task} onEdit={()=>handleEdit(task)} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </section>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TaskForm
              initial={editing ?? undefined}
              onCancel={() => { setFormOpen(false); setEditing(null); }}
              onSave={(payload) => editing ? handleSaveEdit(payload) : handleSaveNew(payload)}
              submitLabel={editing ? 'Update Task' : 'Create Task'}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
