// app/components/FilterBar.tsx
'use client'
import React from 'react'

type Filter = 'all' | 'active' | 'completed'

type Props = {
  filter: Filter
  onChange: (f: Filter) => void
}

export default function FilterBar({ filter, onChange }: Props) {
  const buttons: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <div className="flex gap-2">
      {buttons.map(b => (
        <button
          key={b.key}
          onClick={() => onChange(b.key)}
          className={
            (filter === b.key
              ? 'bg-sky-500 text-white shadow'
              : 'bg-white text-slate-700 border border-slate-200') +
            ' px-3 py-1 rounded-md text-sm'
          }
        >
          {b.label}
        </button>
      ))}
    </div>
  )
}
