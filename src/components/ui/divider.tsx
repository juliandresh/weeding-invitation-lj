export function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${className ?? ""}`}
    >
      <span className="h-px w-10 bg-gold/50 sm:w-16" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-gold">
        <rect
          x="1"
          y="1"
          width="8"
          height="8"
          fill="currentColor"
          transform="rotate(45 5 5)"
        />
      </svg>
      <span className="h-px w-10 bg-gold/50 sm:w-16" />
    </div>
  );
}
