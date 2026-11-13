export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const PIECES = {
  I: { color: "cyan", shape: [[1, 1, 1, 1]] },
  O: {
    color: "amber",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  T: {
    color: "violet",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  S: {
    color: "lime",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  Z: {
    color: "rose",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  J: {
    color: "blue",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  L: {
    color: "orange",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
};

const PIECE_NAMES = Object.keys(PIECES);

export function createEmptyBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array(BOARD_WIDTH).fill(null),
  );
}

export function createPiece(name = PIECE_NAMES[Math.floor(Math.random() * PIECE_NAMES.length)]) {
  const { color, shape } = PIECES[name];
  return {
    name,
    color,
    shape: shape.map((row) => [...row]),
    x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
    y: 0,
  };
}

export function createGame() {
  return {
    board: createEmptyBoard(),
    piece: createPiece(),
    next: createPiece(),
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
  };
}

function collides(board, shape, x, y) {
  return shape.some((row, rowIndex) =>
    row.some((cell, columnIndex) => {
      if (!cell) return false;
      const boardX = x + columnIndex;
      const boardY = y + rowIndex;
      return (
        boardX < 0 ||
        boardX >= BOARD_WIDTH ||
        boardY >= BOARD_HEIGHT ||
        (boardY >= 0 && board[boardY][boardX] !== null)
      );
    }),
  );
}

function lockPiece(game) {
  const pieceIsAboveBoard = game.piece.shape.some((row, rowIndex) =>
    row.some((cell) => cell && game.piece.y + rowIndex < 0),
  );
  if (pieceIsAboveBoard) return { ...game, gameOver: true };

  const board = game.board.map((row) => [...row]);
  game.piece.shape.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell) {
        board[game.piece.y + rowIndex][game.piece.x + columnIndex] =
          game.piece.color;
      }
    });
  });

  const remainingRows = board.filter((row) => row.some((cell) => cell === null));
  const cleared = BOARD_HEIGHT - remainingRows.length;
  const nextBoard = [
    ...Array.from({ length: cleared }, () => Array(BOARD_WIDTH).fill(null)),
    ...remainingRows,
  ];
  const lines = game.lines + cleared;
  const piece = { ...game.next, x: Math.floor((BOARD_WIDTH - game.next.shape[0].length) / 2), y: 0 };
  const next = createPiece();

  return {
    ...game,
    board: nextBoard,
    piece,
    next,
    lines,
    score: game.score + [0, 100, 300, 500, 800][cleared] * game.level,
    level: Math.floor(lines / 10) + 1,
    gameOver: collides(nextBoard, piece.shape, piece.x, piece.y),
  };
}

export function movePiece(game, dx, dy) {
  if (game.gameOver) return game;
  const x = game.piece.x + dx;
  const y = game.piece.y + dy;
  if (collides(game.board, game.piece.shape, x, y)) {
    return dy > 0 ? lockPiece(game) : game;
  }
  return { ...game, piece: { ...game.piece, x, y } };
}

export function rotatePiece(game) {
  if (game.gameOver) return game;
  const shape = game.piece.shape[0].map((_, index) =>
    game.piece.shape.map((row) => row[index]).reverse(),
  );
  const kicks = [0, -1, 1, -2, 2];
  const offset = kicks.find((kick) =>
    !collides(game.board, shape, game.piece.x + kick, game.piece.y),
  );
  return offset === undefined
    ? game
    : { ...game, piece: { ...game.piece, shape, x: game.piece.x + offset } };
}

export function hardDrop(game) {
  if (game.gameOver) return game;
  let piece = game.piece;
  while (!collides(game.board, piece.shape, piece.x, piece.y + 1)) {
    piece = { ...piece, y: piece.y + 1 };
  }
  return lockPiece({ ...game, piece });
}

export function getBoardWithPiece(game) {
  const board = game.board.map((row) => [...row]);
  game.piece.shape.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      const y = game.piece.y + rowIndex;
      const x = game.piece.x + columnIndex;
      if (cell && y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
        board[y][x] = game.piece.color;
      }
    });
  });
  return board;
}
