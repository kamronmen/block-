import { useCallback, useEffect, useMemo, useState } from "react";
import { AudioLines, Sparkles } from "lucide-react";
import GameBoard from "./components/GameBoard.jsx";
import GameOverlay from "./components/GameOverlay.jsx";
import GameSidebar from "./components/GameSidebar.jsx";
import StatCard from "./components/StatCard.jsx";
import TouchControls from "./components/TouchControls.jsx";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  createGame,
  getBoardWithPiece,
  hardDrop,
  movePiece,
  rotatePiece,
} from "./game.js";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-white/[0.07] pb-5">
      <a href="#" className="flex items-center gap-3" aria-label="Blocks bosh sahifa">
        <span className="grid h-10 w-10 grid-cols-2 gap-1 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] p-2">
          <i className="rounded-[2px] bg-cyan-300" />
          <i className="rounded-[2px] bg-violet-400" />
          <i className="rounded-[2px] bg-amber-300" />
          <i className="rounded-[2px] bg-rose-400" />
        </span>
        <span>
          <span className="block text-sm font-black tracking-[0.22em] text-white">
            BLOCKS<span className="text-cyan-300">.</span>
          </span>
          <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Classic arcade
          </span>
        </span>
      </a>
      <div className="hidden items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 sm:flex">
        <AudioLines size={13} className="text-cyan-300" />
        Tanaffusga tayyor
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-white/[0.07] pt-4 text-[10px] font-medium text-zinc-600">
      <span>BLOCKS ARCADE <span className="text-zinc-800">© 2025</span></span>
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
        Bepul o‘yin
      </span>
    </footer>
  );
}

export default function App() {
  const [game, setGame] = useState(createGame);
  const [paused, setPaused] = useState(false);
  const [best, setBest] = useState(() => {
    try {
      return Number(window.localStorage.getItem("blocks-best") || 0);
    } catch {
      return 0;
    }
  });
  const board = useMemo(() => getBoardWithPiece(game), [game]);

  useEffect(() => {
    if (game.score <= best) return;
    setBest(game.score);
    try {
      window.localStorage.setItem("blocks-best", String(game.score));
    } catch {
      // The score remains available for the current session when storage is disabled.
    }
  }, [best, game.score]);

  const restart = useCallback(() => {
    setGame(createGame());
    setPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    if (!game.gameOver) setPaused((value) => !value);
  }, [game.gameOver]);

  useEffect(() => {
    if (paused || game.gameOver) return undefined;
    const timer = window.setInterval(
      () => setGame((current) => movePiece(current, 0, 1)),
      Math.max(100, 800 - (game.level - 1) * 65),
    );
    return () => window.clearInterval(timer);
  }, [game.gameOver, game.level, paused]);

  useEffect(() => {
    function onKeyDown(event) {
      const key = event.key.toLowerCase();
      if (!["arrowleft", "arrowright", "arrowdown", "arrowup", " ", "p", "r"].includes(key)) {
        return;
      }
      event.preventDefault();

      if (key === "r") {
        restart();
      } else if (key === "p") {
        togglePause();
      } else if (paused || game.gameOver) {
        return;
      } else if (key === "arrowleft") {
        setGame((current) => movePiece(current, -1, 0));
      } else if (key === "arrowright") {
        setGame((current) => movePiece(current, 1, 0));
      } else if (key === "arrowdown") {
        setGame((current) => movePiece(current, 0, 1));
      } else if (key === "arrowup") {
        setGame((current) => rotatePiece(current));
      } else {
        setGame((current) => hardDrop(current));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [game.gameOver, paused, restart, togglePause]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(8,145,178,0.12),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-8 pt-6 sm:px-8 sm:pt-8">
        <Header />

        <section className="flex flex-1 flex-col items-center justify-center py-8">
          <div className="mb-7 text-center">
            <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300">
              <Sparkles size={13} />
              O‘yin maydoni
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Navbat sizda<span className="text-cyan-300">.</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Bloklarni joylashtiring. Qatorlarni tozalang. Rekordni yangilang.
            </p>
          </div>

          <div className="grid w-full max-w-[770px] grid-cols-1 items-start gap-5 md:grid-cols-[1fr_260px]">
            <div className="mx-auto w-full max-w-[390px]">
              <div className="mb-3 grid grid-cols-3 gap-2">
                <StatCard label="Hisob" value={game.score.toLocaleString("en-US")} accent />
                <StatCard label="Qatorlar" value={game.lines} />
                <StatCard label="Daraja" value={game.level} />
              </div>

              <div className="relative rounded-[20px] border border-white/10 bg-[#111114] p-2.5 shadow-[0_24px_80px_rgba(0,0,0,.4),0_0_50px_rgba(8,145,178,.06)] sm:p-3">
                <GameBoard board={board} />
                {(paused || game.gameOver) && (
                  <GameOverlay
                    gameOver={game.gameOver}
                    onContinue={togglePause}
                    onRestart={restart}
                  />
                )}
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-medium text-zinc-600">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    game.gameOver
                      ? "bg-rose-400"
                      : paused
                        ? "bg-amber-300"
                        : "animate-pulse bg-lime-400"
                  }`}
                />
                {paused ? "PAUZA" : game.gameOver ? "YAKUNLANDI" : "O‘YINDA"}
                <span className="mx-1 text-zinc-800">/</span>
                {BOARD_WIDTH} × {BOARD_HEIGHT} MAYDON
              </div>
              <TouchControls
                onMove={(dx, dy) => setGame((current) => movePiece(current, dx, dy))}
                onRotate={() => setGame((current) => rotatePiece(current))}
                onDrop={() => setGame((current) => hardDrop(current))}
                disabled={paused || game.gameOver}
              />
            </div>

            <GameSidebar
              next={game.next}
              best={best}
              paused={paused}
              gameOver={game.gameOver}
              onPause={togglePause}
              onRestart={restart}
            />
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
