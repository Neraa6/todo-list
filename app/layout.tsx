// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'To-Do List Harian Siswa',
  description: 'To-Do List dibuat dengan Next.js + TypeScript + Tailwind',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
