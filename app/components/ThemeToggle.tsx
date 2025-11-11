// app/components/ThemeToggle.tsx
'use client'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm hover:shadow-sm transition"
      aria-label="toggle theme"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
      <span className="text-sm text-slate-700 dark:text-slate-100">{theme === 'light' ? 'Gelap' : 'Terang'}</span>
    </button>
  )
}
