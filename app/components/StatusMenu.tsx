// components/StatusMenu.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function StatusMenu({ status, onChange }: { status: string, onChange: (s: string) => void }) {
  const [open, setOpen] = useState(false)
  const items = [
    { key: 'working', label: 'Working on it', color: 'bg-orange-400 text-white' },
    { key: 'done', label: 'Done', color: 'bg-green-500 text-white' },
    { key: 'stuck', label: 'Stuck', color: 'bg-red-500 text-white' },
  ]
  const cur = items.find(i => i.key === status) || items[0]

  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className={`status-pill ${cur.color}`}>
        {cur.label}
      </button>

      {open && (
        <motion.div initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} className="absolute right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-20">
          <div className="p-2 flex flex-col">
            {items.map(i => (
              <button key={i.key} onClick={() => { onChange(i.key); setOpen(false) }} className={`text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 ${i.color}`}>
                {i.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
