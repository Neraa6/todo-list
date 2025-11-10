// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from './context/ThemeContext'

export const metadata = {
  title: 'To-Do List Harian Siswa',
  description: 'Aplikasi To-Do interaktif dengan Next.js + TypeScript + Tailwind CSS',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0f172a] dark:text-slate-100 min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
