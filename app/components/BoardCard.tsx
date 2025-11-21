'use client';

import React from "react";
import { Trash2 } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useRouter } from "next/navigation";
import { Board } from "../types";
import { useTodo } from "../context/TodoContext";

interface Props {
  board: Board;
}

export default function BoardCard({ board }: Props) {
  const router = useRouter();
  const { deleteBoard } = useTodo();

  const handleDelete = () => {
    if (confirm("Delete this board? This action cannot be undone.")) {
      deleteBoard(board.id);
    }
  };

  return (
    <div
      className="relative cursor-pointer p-5 rounded-xl bg-white/80 dark:bg-gray-800/50 shadow hover:shadow-lg transition"
      onClick={() => router.push(`/board/${board.id}`)}
    >
      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // supaya click card tidak ikut buka board
          handleDelete();
        }}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
      >
        <Trash2 size={18} />
      </button>

      <h3 className="text-xl font-semibold mb-2">{board.title}</h3>

      <ProgressBar tasks={board.tasks} />
    </div>
  );
}
