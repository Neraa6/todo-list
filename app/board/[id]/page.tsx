'use client';
import { useParams } from 'next/navigation';
import { useTodo } from '../../context/TodoContext';
import Column from '../../components/BoardView/Column';
import { DndContext } from '@dnd-kit/core';

export default function BoardPage() {
  const params = useParams();
  const { boards } = useTodo();
  const board = boards.find((b) => b.id === params.id);

  if (!board) return <div>Board not found</div>;

  const grouped = {
    todo: board.tasks.filter((t) => t.status === 'todo'),
    inprogress: board.tasks.filter((t) => t.status === 'inprogress'),
    done: board.tasks.filter((t) => t.status === 'done'),
  };

  return (
    <div className="flex gap-4">
      <DndContext>
        <Column status="todo" tasks={grouped.todo} onAdd={() => {}} />
        <Column status="inprogress" tasks={grouped.inprogress} onAdd={() => {}} />
        <Column status="done" tasks={grouped.done} onAdd={() => {}} />
      </DndContext>
    </div>
  );
}
