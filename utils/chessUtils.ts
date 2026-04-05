import { Chess, PieceSymbol, Color } from 'chess.js';

export const calculateCapturedPieces = (game: Chess) => {
  const initialPieces: Record<string, number> = {
    p: 8, n: 2, b: 2, r: 2, q: 1, k: 1,
    P: 8, N: 2, B: 2, R: 2, Q: 1, K: 1
  };

  const currentPieces: Record<string, number> = {
    p: 0, n: 0, b: 0, r: 0, q: 0, k: 0,
    P: 0, N: 0, B: 0, R: 0, Q: 0, K: 0
  };

  const board = game.board();
  for (const row of board) {
    for (const square of row) {
      if (square) {
        const type = square.color === 'w' ? square.type.toUpperCase() : square.type;
        currentPieces[type]++;
      }
    }
  }

  const captured: { w: string[], b: string[] } = { w: [], b: [] };
  
  // White pieces captured by black
  for (const type of ['P', 'N', 'B', 'R', 'Q']) {
     const count = initialPieces[type] - currentPieces[type];
     for (let i = 0; i < count; i++) captured.w.push(type.toLowerCase());
  }

  // Black pieces captured by white
  for (const type of ['p', 'n', 'b', 'r', 'q']) {
     const count = initialPieces[type] - currentPieces[type];
     for (let i = 0; i < count; i++) captured.b.push(type);
  }

  return captured;
};
