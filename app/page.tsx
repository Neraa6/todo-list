'use client';
import { useTodo } from './context/TodoContext';
import BoardCard from './components/BoardCard';

export default function DashboardPage() {
  const { boards, createBoard } = useTodo();

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Boards</h2>
        <button
          onClick={() => createBoard('New Board')}
          className="px-3 py-1 rounded bg-indigo-500 text-white"
        >
          Create Board
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map((b) => (
          <BoardCard key={b.id} board={b} />
        ))}
      </div>
    </section>
  );
}
