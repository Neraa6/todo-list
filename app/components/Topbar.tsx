'use client'
import { Search, Users, Funnel, SlidersHorizontal, EyeOff } from 'lucide-react'

export default function Topbar({ onNew }: { onNew: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-6">
        <div className="text-2xl font-semibold">todo apps</div>
        <div className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/60 px-3 py-1 rounded-md shadow-sm">
          <button onClick={onNew} className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white">New task</button>
          <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
            <Search size={16}/> Search
            <Users size={16}/> Person
            <Funnel size={16}/> Filter
            <SlidersHorizontal size={16}/> Sort
            <EyeOff size={16}/> Hide
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
      </div>
    </div>
  )
}
