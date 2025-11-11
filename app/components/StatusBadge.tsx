'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Status = 'working' | 'done' | 'stuck'
export default function StatusBadge({ status, onChange }: { status: Status; onChange: (s: Status) => void }) {
  const [open, setOpen] = useState(false)
  const items: { key: Status; label: string; cls: string }[] = [
    { key: 'working', label: 'Working on it', cls: 'bg-orange-400 text-white' },
    { key: 'done', label: 'Done', cls: 'bg-green-500 text-white' },
    { key: 'stuck', label: 'Stuck', cls: 'bg-red-500 text-white' },
  ]
  const cur = items.find(i => i.key === status) || items[0]

  return (
    <div className="relative">
      <motion.button whileTap={{ scale: 0.97 }} onClick={() => setOpen(v => !v)} className={`status-pill ${cur.cls}`}>
        {cur.label}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="absolute right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-20 overflow-hidden">
            {items.map(i => (
              <button key={i.key} onClick={() => { onChange(i.key); setOpen(false) }}
                className={`block w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${i.cls}`}>
                {i.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
