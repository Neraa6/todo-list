export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="h-full transition-all"
        style={{
          width: `${value}%`,
          background: 'linear-gradient(90deg, #A8DADC, #BDE0FE)', // pastel gradient
        }}
      />
    </div>
  );
}
