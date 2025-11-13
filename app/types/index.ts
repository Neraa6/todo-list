// types/index.ts
export type Status = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  deadline?: string; // ISO date string
  assignedTo?: string;
  createdAt: string;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
  createdAt: string;
}
