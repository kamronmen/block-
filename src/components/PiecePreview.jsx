import { Block } from "./Block.jsx";

export default function PiecePreview({ piece }) {
  return (
    <div className="flex h-[76px] items-center justify-center">
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${piece.shape[0].length}, 15px)` }}
        aria-label={`${piece.name} bloki`}
      >
        {piece.shape.flatMap((row, rowIndex) =>
          row.map((cell, columnIndex) => (
            <Block
              key={`${rowIndex}-${columnIndex}`}
              color={cell ? piece.color : undefined}
              className="h-[15px] w-[15px]"
            />
          )),
        )}
      </div>
    </div>
  );
}
