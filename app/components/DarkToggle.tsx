'use client';
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkToggle(){
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'dark';
    setDark(saved);
    document.documentElement.classList.toggle('dark', saved);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  return (
    <button onClick={toggle} className="p-2 rounded-md">
      {dark ? <Sun size={16}/> : <Moon size={16}/>}
    </button>
  );
}
