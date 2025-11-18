// components/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, Sun, Moon } from 'lucide-react';
import DarkToggle from './DarkToggle';

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.33 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-200 to-indigo-200 flex items-center justify-center shadow">
                <span className="font-bold text-indigo-700">TF</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">TaskFlow</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Boards</div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <LayoutGrid size={16} /> Boards
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <DarkToggle />
            <Link href="/" className="md:hidden px-2 py-1 rounded bg-indigo-50 text-indigo-600 text-sm">Boards</Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
