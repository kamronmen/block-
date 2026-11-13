export default function StatCard({ label, value, accent = false }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] px-4 py-3.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>
      <p
        className={`mt-1 font-mono text-2xl font-bold tabular-nums ${
          accent ? "text-cyan-300" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
