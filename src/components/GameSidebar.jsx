import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleHelp,
  Pause,
  Play,
  RotateCcw,
  Trophy,
} from "lucide-react";
import PiecePreview from "./PiecePreview.jsx";

function Key({ children, wide = false }) {
  return (
    <span
      className={`inline-flex h-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-zinc-300 shadow-[0_2px_0_rgba(255,255,255,.06)] ${
        wide ? "min-w-[48px] px-2" : "w-8"
      }`}
    >
      {children}
    </span>
  );
}

function Panel({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 ${className}`}
    >
      {children}
    </section>
  );
}

export default function GameSidebar({
  next,
  best,
  paused,
  gameOver,
  onPause,
  onRestart,
}) {
  return (
    <aside className="grid grid-cols-2 gap-3 md:grid-cols-1">
      <Panel>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Keyingi blok
          </p>
          <span className="rounded-md bg-white/[0.06] px-1.5 py-1 text-[9px] font-bold text-zinc-500">
            NEXT
          </span>
        </div>
        <PiecePreview piece={next} />
      </Panel>

      <Panel>
        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          <Trophy size={13} className="text-amber-300" />
          Eng yaxshi
        </div>
        <p className="font-mono text-2xl font-bold tabular-nums text-amber-200">
          {best.toLocaleString("en-US")}
        </p>
        <p className="mt-1 text-[10px] text-zinc-600">Shaxsiy rekord</p>
      </Panel>

      <Panel className="col-span-2 md:col-span-1">
        <div className="mb-3 flex items-center gap-2">
          <CircleHelp size={13} className="text-cyan-300" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Boshqaruv
          </p>
        </div>
        <div className="space-y-2.5 text-[11px] text-zinc-400">
          <div className="flex items-center justify-between">
            <span>Harakat</span>
            <span className="flex gap-1">
              <Key><ArrowLeft size={13} /></Key>
              <Key><ArrowDown size={13} /></Key>
              <Key><ArrowRight size={13} /></Key>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Aylantirish</span>
            <Key><ArrowUp size={13} /></Key>
          </div>
          <div className="flex items-center justify-between">
            <span>Tez tushirish</span>
            <Key wide>SPACE</Key>
          </div>
          <div className="flex items-center justify-between">
            <span>Pauza</span>
            <Key>P</Key>
          </div>
        </div>
      </Panel>

      <div className="col-span-2 grid grid-cols-2 gap-2 md:col-span-1">
        <button
          onClick={onPause}
          disabled={gameOver}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          {paused ? "Davom etish" : "Pauza"}
        </button>
        <button
          onClick={onRestart}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 text-xs font-bold text-zinc-950 transition hover:bg-cyan-200"
        >
          <RotateCcw size={14} />
          Yangidan
        </button>
      </div>
    </aside>
  );
}
