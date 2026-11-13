import { BOARD_HEIGHT, BOARD_WIDTH } from "../game.js";
import { Block } from "./Block.jsx";

export default function GameBoard({ board }) {
  return (
    <div
      className="grid aspect-[1/2] w-full grid-cols-10 grid-rows-20 gap-[3px] overflow-hidden rounded-xl bg-[#09090c] p-2"
      aria-label="Tetris o‘yin taxtasi"
      role="grid"
      aria-rowcount={BOARD_HEIGHT}
      aria-colcount={BOARD_WIDTH}
    >
      {board.flatMap((row, rowIndex) =>
        row.map((color, columnIndex) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            role="gridcell"
            aria-label={color ? "To‘ldirilgan katak" : "Bo‘sh katak"}
            className={`min-h-0 min-w-0 rounded-[3px] transition-colors duration-75 ${
              color
                ? ""
                : "border border-white/[0.035] bg-white/[0.018]"
            }`}
          >
            {color && <Block color={color} className="h-full w-full" />}
          </div>
        )),
      )}
    </div>
  );
}
