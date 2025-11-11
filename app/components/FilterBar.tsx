// app/components/FilterBar.tsx
'use client'
import React from 'react'

type Filter = 'all'|'active'|'completed'
type Props = { filter: Filter; onChange: (f: Filter) => void }

export default function FilterBar({ filter, onChange }: Props) {
  const items: {key: Filter; label: string}[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]
  return (
    <div className="flex gap-2">
      {items.map(i => (
        <button
          key={i.key}
          onClick={() => onChange(i.key)}
          className={`px-3 py-1 rounded-md text-sm ${filter === i.key ? 'bg-sky-600 text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'}`}
        >
          {i.label}
        </button>
      ))}
    </div>
  )
}
