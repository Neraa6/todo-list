// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = { title: 'todo apps', description: 'Todo apps - table style' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  )
}
