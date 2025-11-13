'use client';
import './styles/globals.css';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; // ⬅️ tambahkan ini

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // untuk animasi antar halaman

  return (
    <html lang="en">
      <body>
        <TodoProvider>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname} // ⬅️ isi dengan router pathname
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </TodoProvider>
      </body>
    </html>
  );
}
