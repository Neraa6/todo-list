// app/layout.tsx
import './styles/globals.css';
import React from 'react';
import Navbar from './components/Navbar';
import { TodoProvider } from './context/TodoContext';

export const metadata = {
  title: 'TaskFlow',
  description: 'Monday-like To-Do App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <TodoProvider>
          <Navbar />
          <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>
        </TodoProvider>
      </body>
    </html>
  );
}
