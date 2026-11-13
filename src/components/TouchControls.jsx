import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronsDown } from "lucide-react";

export default function TouchControls({ onMove, onRotate, onDrop, disabled }) {
  const buttonClass =
    "inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-200 active:scale-95 active:bg-cyan-300/15 disabled:opacity-40";

  return (
    <div className="mt-3 grid grid-cols-5 gap-2 md:hidden" aria-label="Sensorli boshqaruv">
      <button className={buttonClass} onClick={() => onMove(-1, 0)} disabled={disabled} aria-label="Chapga">
        <ArrowLeft size={19} />
      </button>
      <button className={buttonClass} onClick={() => onMove(0, 1)} disabled={disabled} aria-label="Pastga">
        <ArrowDown size={19} />
      </button>
      <button className={buttonClass} onClick={onRotate} disabled={disabled} aria-label="Aylantirish">
        <ArrowUp size={19} />
      </button>
      <button className={buttonClass} onClick={() => onMove(1, 0)} disabled={disabled} aria-label="O‘ngga">
        <ArrowRight size={19} />
      </button>
      <button className={buttonClass} onClick={onDrop} disabled={disabled} aria-label="Tez tushirish">
        <ChevronsDown size={19} />
      </button>
    </div>
  );
}
