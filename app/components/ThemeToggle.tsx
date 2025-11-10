// app/components/ThemeToggle.tsx
'use client'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon size={16} />
          <span>Gelap</span>
        </>
      ) : (
        <>
          <Sun size={16} />
          <span>Terang</span>
        </>
      )}
    </button>
  )
}
