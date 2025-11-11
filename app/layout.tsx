// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from './context/ThemeContext'

export const metadata = {
  title: 'To-Do List Harian Siswa',
  description: 'To-Do List - Next.js + TS + Tailwind',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
