import { create } from 'zustand';
import { Chess, Move, Color } from 'chess.js';
import { getBestMove, getEvaluation } from '../utils/chessAI';
import { calculateCapturedPieces } from '../utils/chessUtils';

interface GameState {
  game: Chess;
  board: (any)[][];
  turn: Color;
  isGameOver: boolean;
  history: Move[];
  lastMove: Move | null;
  selectedSquare: string | null;
  possibleMoves: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  mode: 'AI' | 'Multiplayer' | 'Local';
  playerColor: Color;
  capturedPieces: { w: string[]; b: string[] };
  materialDiff: number;
  evaluation: number;
  hint: string | null;

  // Actions
  makeMove: (move: { from: string; to: string; promotion?: string }) => boolean;
  getHint: () => void;
  resetGame: () => void;
  setSelectedSquare: (square: string | null) => void;
  setMode: (mode: 'AI' | 'Multiplayer' | 'Local') => void;
  setDifficulty: (level: 'Easy' | 'Medium' | 'Hard' | 'Expert') => void;
  setPlayerColor: (color: Color) => void;
  undoMove: () => void;
}

const getDepth = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 1;
    case 'Medium': return 2;
    case 'Hard': return 3;
    case 'Expert': return 4;
    default: return 2;
  }
};

export const useGameStore = create<GameState>((set, get) => ({
  game: new Chess(),
  board: new Chess().board(),
  turn: 'w',
  isGameOver: false,
  history: [],
  lastMove: null,
  selectedSquare: null,
  possibleMoves: [],
  difficulty: 'Medium',
  mode: 'AI',
  playerColor: 'w',
  capturedPieces: { w: [], b: [] },
  materialDiff: 0,
  evaluation: 0,
  hint: null,

  makeMove: (move) => {
    const { game, difficulty, mode } = get();
    try {
      const result = game.move(move);
      if (result) {
        const newFen = game.fen();
        const newGame = new Chess(newFen);
        set({
          game: newGame,
          board: newGame.board(),
          turn: newGame.turn(),
          isGameOver: newGame.isGameOver(),
          history: newGame.history({ verbose: true }),
          lastMove: result,
          selectedSquare: null,
          possibleMoves: [],
          evaluation: newGame.isCheckmate()
            ? (newGame.turn() === 'b' ? 10 : -10)
            : getEvaluation(newGame) / 30,
          capturedPieces: calculateCapturedPieces(newGame),
          materialDiff: getEvaluation(newGame) / 10,
          hint: null,
        });

        // Trigger AI move if in AI mode
        if (mode === 'AI' && !newGame.isGameOver()) {
          setTimeout(() => {
            const aiGame = new Chess(newGame.fen());
            const bestMove = getBestMove(aiGame, getDepth(difficulty));
            if (bestMove) {
              aiGame.move(bestMove);
              const aiHistory = aiGame.history({ verbose: true });
              set({
                game: aiGame,
                board: aiGame.board(),
                turn: aiGame.turn(),
                isGameOver: aiGame.isGameOver(),
                history: aiHistory,
                lastMove: aiHistory[aiHistory.length - 1] || null,
                evaluation: aiGame.isCheckmate()
                  ? (aiGame.turn() === 'b' ? 10 : -10)
                  : getEvaluation(aiGame) / 30,
                capturedPieces: calculateCapturedPieces(aiGame),
                materialDiff: getEvaluation(aiGame) / 10,
              });
            }
          }, 400);
        }
        return true;
      }
    } catch (e) {
      // Invalid move — silently swallow
    }
    return false;
  },

  getHint: () => {
    const { game, difficulty } = get();
    const hint = getBestMove(game, getDepth(difficulty));
    set({ hint });
  },

  resetGame: () => {
    const newGame = new Chess();
    set({
      game: newGame,
      board: newGame.board(),
      turn: 'w',
      isGameOver: false,
      history: [],
      lastMove: null,
      selectedSquare: null,
      possibleMoves: [],
      evaluation: 0,
      capturedPieces: { w: [], b: [] },
      materialDiff: 0,
      hint: null,
    });
  },

  setSelectedSquare: (square) => {
    const { game } = get();
    if (!square) {
      set({ selectedSquare: null, possibleMoves: [] });
      return;
    }
    const moves = game.moves({ square: square as any, verbose: true });
    set({
      selectedSquare: square,
      possibleMoves: moves.map((m) => m.to),
    });
  },

  setMode: (mode) => set({ mode }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setPlayerColor: (playerColor) => set({ playerColor }),

  undoMove: () => {
    const { game, mode, playerColor } = get();
    const cloneGame = new Chess(game.fen());
    cloneGame.undo();
    // If vs AI, undo the AI move too
    if (mode === 'AI' && cloneGame.turn() !== playerColor) {
      cloneGame.undo();
    }
    set({
      game: cloneGame,
      board: cloneGame.board(),
      turn: cloneGame.turn(),
      isGameOver: cloneGame.isGameOver(),
      history: cloneGame.history({ verbose: true }),
      lastMove: null,
      evaluation: getEvaluation(cloneGame) / 30,
      capturedPieces: calculateCapturedPieces(cloneGame),
      materialDiff: getEvaluation(cloneGame) / 10,
    });
  },
}));
