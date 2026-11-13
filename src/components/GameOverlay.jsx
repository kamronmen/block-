import { Play, RotateCcw } from "lucide-react";

export default function GameOverlay({ gameOver, onContinue, onRestart }) {
  return (
    <div className="absolute inset-3 flex items-center justify-center rounded-2xl bg-[#09090c]/85 backdrop-blur-sm">
      <div className="text-center">
        <div className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
          {gameOver ? "O‘yin tugadi" : "Tanaffus"}
        </div>
        <div className="mt-2 text-sm text-zinc-400">
          {gameOver
            ? "Yana bir bor urinib ko‘ring!"
            : "Tayyor bo‘lsangiz, davom eting"}
        </div>
        <button
          onClick={gameOver ? onRestart : onContinue}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-4 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-cyan-200"
        >
          {gameOver ? <RotateCcw size={14} /> : <Play size={14} />}
          {gameOver ? "Qayta boshlash" : "Davom etish"}
        </button>
      </div>
    </div>
  );
}
