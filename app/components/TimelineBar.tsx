'use client'
import { motion } from 'framer-motion'

export default function TimelineBar({ start, end }: { start?: string; end?: string }) {
  if (!start || !end) return <div className="text-xs text-slate-500 dark:text-slate-400">-</div>
  const s = new Date(start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  const e = new Date(end).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  return (
    <div className="flex items-center gap-2">
      <motion.div whileHover={{ scale: 1.03 }} className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs">{s}</motion.div>
      <div className="text-xs text-slate-400">—</div>
      <motion.div whileHover={{ scale: 1.03 }} className="px-3 py-1 rounded-full bg-slate-800 text-white text-xs">{e}</motion.div>
    </div>
  )
}
