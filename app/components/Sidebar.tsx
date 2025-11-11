// components/Sidebar.tsx
'use client'
import { Home, Grid, MoreHorizontal, Star, Users, LayoutDashboard } from 'lucide-react'
export default function Sidebar() {
  return (
    <aside className="w-64 px-4 py-6 border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">App</h2>
      </div>

      <nav className="space-y-2 text-sm">
        <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
          <Home size={16}/> Home
        </button>
        <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
          <Grid size={16}/> My work
        </button>
        <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
          <MoreHorizontal size={16}/> More
        </button>

        <div className="mt-4 text-xs text-slate-400">Favorites</div>
        <div className="mt-3">
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Star size={14}/> Favorite
          </button>
        </div>

        <div className="mt-4 text-xs text-slate-400">Workspaces</div>
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center text-xs">M</div>
              <span className="text-sm">Main workspace</span>
            </div>
            <button className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">+</button>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">
            <LayoutDashboard size={16}/> todo apps
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
            <Users size={16}/> Dashboard and reporting
          </button>
        </div>
      </nav>
    </aside>
  )
}
