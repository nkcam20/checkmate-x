import { Chess, Move } from 'chess.js';

// Piece values
const PIECE_VALUES: Record<string, number> = {
  p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000
};

// Piece-Square tables for positional evaluation
// (Simplified tables to make the bot positionally aware)
const PAWN_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
 50, 50, 50, 50, 50, 50, 50, 50,
 10, 10, 20, 30, 30, 20, 10, 10,
  5,  5, 10, 25, 25, 10,  5,  5,
  0,  0,  0, 20, 20,  0,  0,  0,
  5, -5,-10,  0,  0,-10, -5,  5,
  5, 10, 10,-20,-20, 10, 10,  5,
  0,  0,  0,  0,  0,  0,  0,  0
];
const KNIGHT_PST = [
 -50,-40,-30,-30,-30,-30,-40,-50,
 -40,-20,  0,  0,  0,  0,-20,-40,
 -30,  0, 10, 15, 15, 10,  0,-30,
 -30,  5, 15, 20, 20, 15,  5,-30,
 -30,  0, 15, 20, 20, 15,  0,-30,
 -30,  5, 10, 15, 15, 10,  5,-30,
 -40,-20,  0,  5,  5,  0,-20,-40,
 -50,-40,-30,-30,-30,-30,-40,-50
];
const BISHOP_PST = [
 -20,-10,-10,-10,-10,-10,-10,-20,
 -10,  0,  0,  0,  0,  0,  0,-10,
 -10,  0,  5, 10, 10,  5,  0,-10,
 -10,  5,  5, 10, 10,  5,  5,-10,
 -10,  0, 10, 10, 10, 10,  0,-10,
 -10, 10, 10, 10, 10, 10, 10,-10,
 -10,  5,  0,  0,  0,  0,  5,-10,
 -20,-10,-10,-10,-10,-10,-10,-20
];
const ROOK_PST = [
  0,  0,  0,  0,  0,  0,  0,  0,
  5, 10, 10, 10, 10, 10, 10,  5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
 -5,  0,  0,  0,  0,  0,  0, -5,
  0,  0,  0,  5,  5,  0,  0,  0
];
const QUEEN_PST = [
 -20,-10,-10, -5, -5,-10,-10,-20,
 -10,  0,  0,  0,  0,  0,  0,-10,
 -10,  0,  5,  5,  5,  5,  0,-10,
  -5,  0,  5,  5,  5,  5,  0, -5,
   0,  0,  5,  5,  5,  5,  0, -5,
 -10,  5,  5,  5,  5,  5,  0,-10,
 -10,  0,  5,  0,  0,  0,  0,-10,
 -20,-10,-10, -5, -5,-10,-10,-20
];
const KING_MID_PST = [
 -30,-40,-40,-50,-50,-40,-40,-30,
 -30,-40,-40,-50,-50,-40,-40,-30,
 -30,-40,-40,-50,-50,-40,-40,-30,
 -30,-40,-40,-50,-50,-40,-40,-30,
 -20,-30,-30,-40,-40,-30,-30,-20,
 -10,-20,-20,-20,-20,-20,-20,-10,
  20, 20,  0,  0,  0,  0, 20, 20,
  20, 30, 10,  0,  0, 10, 30, 20
];

const PST: Record<string, number[]> = {
  p: PAWN_PST, n: KNIGHT_PST, b: BISHOP_PST, 
  r: ROOK_PST, q: QUEEN_PST, k: KING_MID_PST
};

// Evaluate from White's perspective
export const getEvaluation = (game: Chess) => {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -99999 : 99999;
  }
  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition() || game.isInsufficientMaterial()) {
    return 0;
  }

  let totalEvaluation = 0;
  const board = game.board();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const val = PIECE_VALUES[piece.type] || 0;
        
        let positionVal = 0;
        if (PST[piece.type]) {
            // Flop the board for black pieces
            const sqIndex = piece.color === 'w' ? (i * 8 + j) : ((7 - i) * 8 + j);
            positionVal = PST[piece.type][sqIndex];
        }

        const score = val + positionVal;
        totalEvaluation += (piece.color === 'w' ? score : -score);
      }
    }
  }
  return totalEvaluation;
};

// Fast move ordering: Captures, checks, promotions
const orderMoves = (game: Chess, moves: Move[]) => {
  return moves.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    if (a.captured) scoreA += 10 * (PIECE_VALUES[a.captured] || 0) - (PIECE_VALUES[a.piece] || 0);
    if (b.captured) scoreB += 10 * (PIECE_VALUES[b.captured] || 0) - (PIECE_VALUES[b.piece] || 0);
    if (a.promotion) scoreA += 900;
    if (b.promotion) scoreB += 900;
    if (a.san.includes('+')) scoreA += 50;
    if (b.san.includes('+')) scoreB += 50;
    return scoreB - scoreA;
  });
};

const minimax = (game: Chess, depth: number, alpha: number, beta: number, isMaximizer: boolean): number => {
  if (depth === 0 || game.isGameOver()) {
    // Return base perspective evaluation
    const score = getEvaluation(game);
    // minimax returns relative score (positive = good for current player)
    return isMaximizer ? score : -score; 
  }

  // Use verbose moves for faster processing and data access
  const moves = orderMoves(game, game.moves({ verbose: true }));

  if (isMaximizer) {
    let bestEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, !isMaximizer);
      game.undo();
      bestEval = Math.max(bestEval, evalValue);
      alpha = Math.max(alpha, bestEval);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return bestEval;
  } else {
    let bestEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, !isMaximizer);
      game.undo();
      bestEval = Math.min(bestEval, evalValue);
      beta = Math.min(beta, bestEval);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return bestEval;
  }
};

export const getBestMove = (game: Chess, depth: number = 2): string | null => {
  const moves = orderMoves(game, game.moves({ verbose: true }));
  if (moves.length === 0) return null;

  let bestMove = moves[0].san;
  let bestValue = -Infinity;
  const isWhite = game.turn() === 'w';

  // We are evaluating at depth (maximizer step)
  for (const move of moves) {
    game.move(move);
    // If we just moved as 'w', next player is 'b'. So the next call is the MINIMIZER. 
    // The evaluation perspective: we want highest score if white, lowest if black.
    // Wait, let's keep minimax returning absolutes (for white).
    const isMaximizer = !isWhite;
    const boardValue = minimax(game, depth - 1, -Infinity, Infinity, isMaximizer);
    game.undo();
    
    // We want the highest value for white, lowest for black.
    const score = isWhite ? boardValue : -boardValue;

    if (score > bestValue) {
      bestValue = score;
      bestMove = move.san;
    }
  }

  return bestMove;
};
