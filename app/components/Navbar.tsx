'use client';
import React from 'react';
import { Sun, Moon, Search } from 'lucide-react';
import DarkToggle from './DarkToggle';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm dark:bg-gray-900/60">
      <div className="flex items-center gap-3">
        <h1 className="font-semibold text-lg">MyBoards</h1>
        <span className="text-sm text-muted-foreground">— Workspaces</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-lg px-2 py-1 gap-2">
          <Search size={16} />
          <input className="outline-none bg-transparent text-sm" placeholder="Search tasks or boards..." />
        </div>
        <DarkToggle />
      </div>
    </nav>
  );
}
