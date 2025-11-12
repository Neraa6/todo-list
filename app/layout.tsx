import './styles/globals.css';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <TodoProvider>
          <Navbar />
          <main className="p-6">{children}</main>
        </TodoProvider>
      </body>
    </html>
  );
}
