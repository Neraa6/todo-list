// components/DarkToggle.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  return (
    <button onClick={toggle} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
