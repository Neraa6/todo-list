export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
      <div style={{ width: `${value}%` }} className="h-full bg-emerald-400 dark:bg-emerald-500 transition-all" />
    </div>
  );
}
