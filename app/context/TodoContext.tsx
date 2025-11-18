// context/TodoContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Board, Task, Status } from '../types';
import { v4 as uuid } from 'uuid';
import { loadBoards, saveBoards } from '../lib/storage';

type TodoContextType = {
  boards: Board[];
  createBoard: (title: string, description?: string) => Board;
  deleteBoard: (boardId: string) => void;
  addTask: (boardId: string, payload: Omit<Task, 'id' | 'createdAt'>) => Task | null;
  updateTask: (boardId: string, taskId: string, patch: Partial<Task>) => Task | null;
  deleteTask: (boardId: string, taskId: string) => void;
  moveTask: (boardId: string, taskId: string, newStatus: Status) => void;
  getBoard: (boardId: string) => Board | undefined;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodo must be used inside TodoProvider');
  return ctx;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>([]);

  // hydrate from localStorage once on mount
  useEffect(() => {
    const data = loadBoards();
    if (data && Array.isArray(data)) setBoards(data);
  }, []);

  // persist
  useEffect(() => {
    saveBoards(boards);
  }, [boards]);

  const createBoard = (title: string, description?: string) => {
    const newBoard: Board = {
      id: uuid(),
      title,
      description,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
    setBoards(prev => [newBoard, ...prev]);
    return newBoard;
  };

  const deleteBoard = (boardId: string) => {
    setBoards(prev => prev.filter(b => b.id !== boardId));
  };

  const addTask = (boardId: string, payload: Omit<Task, 'id' | 'createdAt'>) => {
    const bIndex = boards.findIndex(b => b.id === boardId);
    if (bIndex === -1) return null;
    const newTask: Task = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...payload,
    };
    setBoards(prev => prev.map(b => b.id === boardId ? { ...b, tasks: [newTask, ...b.tasks] } : b));
    return newTask;
  };

  const updateTask = (boardId: string, taskId: string, patch: Partial<Task>) => {
    let updated: Task | null = null;
    setBoards(prev => prev.map(b => {
      if (b.id !== boardId) return b;
      const tasks = b.tasks.map(t => {
        if (t.id === taskId) {
          updated = { ...t, ...patch };
          return updated;
        }
        return t;
      });
      return { ...b, tasks };
    }));
    return updated;
  };

  const deleteTask = (boardId: string, taskId: string) => {
    setBoards(prev => prev.map(b => b.id === boardId ? { ...b, tasks: b.tasks.filter(t => t.id !== taskId) } : b));
  };

  const moveTask = (boardId: string, taskId: string, newStatus: Status) => {
    setBoards(prev => prev.map(b => {
      if (b.id !== boardId) return b;
      const tasks = b.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
      // optionally bring moved task to top of column
      const moved = tasks.find(t => t.id === taskId);
      const others = tasks.filter(t => t.id !== taskId);
      return moved ? { ...b, tasks: [moved, ...others] } : { ...b, tasks };
    }));
  };

  const getBoard = (boardId: string) => boards.find(b => b.id === boardId);

  return (
    <TodoContext.Provider value={{ boards, createBoard, deleteBoard, addTask, updateTask, deleteTask, moveTask, getBoard }}>
      {children}
    </TodoContext.Provider>
  );
};
