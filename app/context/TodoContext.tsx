'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Board, Task } from '../types';
import { v4 as uuid } from 'uuid';

type TodoContextType = {
  boards: Board[];
  createBoard: (title: string, desc?: string) => void;
  deleteBoard: (id: string) => void;
  addTask: (boardId: string, task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (boardId: string, taskId: string, patch: Partial<Task>) => void;
  moveTask: (fromBoardId: string, toBoardId: string, taskId: string, newStatus?: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodo must be used inside TodoProvider');
  return ctx;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>(() => {
    try {
      const raw = localStorage.getItem('todo.boards');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todo.boards', JSON.stringify(boards));
  }, [boards]);

  const createBoard = (title: string, desc?: string) => {
    const b: Board = { id: uuid(), title, description: desc, tasks: [], createdAt: new Date().toISOString() };
    setBoards((prev) => [b, ...prev]);
  };

  const deleteBoard = (id: string) => setBoards((prev) => prev.filter((b) => b.id !== id));

  const addTask = (boardId: string, task: Omit<Task, 'id' | 'createdAt'>) => {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? { ...b, tasks: [{ ...task, id: uuid(), createdAt: new Date().toISOString() }, ...b.tasks] }
          : b
      )
    );
  };

  const updateTask = (boardId: string, taskId: string, patch: Partial<Task>) => {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? { ...b, tasks: b.tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)) }
          : b
      )
    );
  };

  const moveTask = (fromBoardId: string, toBoardId: string, taskId: string, newStatus?: string) => {
    let movingTask: Task | undefined;
    setBoards((prev) => {
      const next = prev
        .map((b) => {
          if (b.id === fromBoardId) {
            const remaining = b.tasks.filter((t) => {
              if (t.id === taskId) {
                movingTask = t;
                return false;
              }
              return true;
            });
            return { ...b, tasks: remaining };
          }
          return b;
        })
        .map((b) => {
          if (b.id === toBoardId && movingTask) {
            const t = newStatus ? { ...movingTask, status: newStatus as Task['status'] } : movingTask;
            return { ...b, tasks: [t, ...b.tasks] };
          }
          return b;
        });
      return next;
    });
  };

  return (
    <TodoContext.Provider value={{ boards, createBoard, deleteBoard, addTask, updateTask, moveTask }}>
      {children}
    </TodoContext.Provider>
  );
};
