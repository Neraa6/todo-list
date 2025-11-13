// context/TodoContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Board, Task } from '../types';
import { v4 as uuid } from 'uuid';

type TodoContextType = {
  boards: Board[];
  createBoard: (title: string, desc?: string) => void;
  deleteBoard: (id: string) => void;
  addTask: (boardId: string, payload: Omit<Task, 'id'|'createdAt'>) => Task;
  updateTask: (boardId: string, taskId: string, patch: Partial<Task>) => Task | null;
  deleteTask: (boardId: string, taskId: string) => void;
  getBoard: (boardId: string) => Board | undefined;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error('useTodo must be used inside TodoProvider');
  return ctx;
};

const STORAGE_KEY = 'todo.boards.v1';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as Board[] : [];
    } catch (e) {
      console.error('Failed to parse boards from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
    } catch (e) {
      console.error('Failed to save boards to localStorage', e);
    }
  }, [boards]);

  const createBoard = (title: string, desc?: string) => {
    const newBoard: Board = {
      id: uuid(),
      title,
      description: desc,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
    setBoards((p) => [newBoard, ...p]);
  };

  const deleteBoard = (id: string) => setBoards((p) => p.filter(b => b.id !== id));

  const addTask = (boardId: string, payload: Omit<Task, 'id'|'createdAt'>) => {
    const newTask: Task = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...payload
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

  const getBoard = (boardId: string) => boards.find(b => b.id === boardId);

  return (
    <TodoContext.Provider value={{ boards, createBoard, deleteBoard, addTask, updateTask, deleteTask, getBoard }}>
      {children}
    </TodoContext.Provider>
  );
};
