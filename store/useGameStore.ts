import { create } from 'zustand';
import { Chess, Move, Color } from 'chess.js';
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
  boardTheme: 'Classic' | 'Dark' | 'Neon';
  playerColor: Color;
  capturedPieces: { w: string[]; b: string[] };
  materialDiff: number;
  evaluation: number;
  hint: string | null;
  isThinking: boolean;

  // Actions
  makeMove: (move: { from: string; to: string; promotion?: string }) => boolean;
  receiveAIMove: (move: string) => void;
  receiveEvaluation: (evalScore: number) => void;
  resetGame: () => void;
  setSelectedSquare: (square: string | null) => void;
  setMode: (mode: 'AI' | 'Multiplayer' | 'Local') => void;
  setDifficulty: (level: 'Easy' | 'Medium' | 'Hard' | 'Expert') => void;
  setBoardTheme: (theme: 'Classic' | 'Dark' | 'Neon') => void;
  setPlayerColor: (color: Color) => void;
  getHint: () => void;
  undoMove: () => void;
}

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
  boardTheme: 'Dark',
  playerColor: 'w',
  capturedPieces: { w: [], b: [] },
  materialDiff: 0,
  evaluation: 0,
  hint: null,
  isThinking: false,

  makeMove: (move) => {
    const { game, mode, turn, playerColor } = get();
    if (mode === 'AI' && turn !== playerColor) return false;

    try {
      const result = game.move(move);
      if (result) {
        set({
          game: new Chess(game.fen()),
          board: game.board(),
          turn: game.turn(),
          isGameOver: game.isGameOver(),
          history: game.history({ verbose: true }),
          lastMove: result,
          selectedSquare: null,
          possibleMoves: [],
          capturedPieces: calculateCapturedPieces(game),
          isThinking: (mode === 'AI' && !game.isGameOver()),
          hint: null,
        });
        return true;
      }
    } catch (e) {}
    return false;
  },

  receiveAIMove: (moveStr) => {
    const { game, isGameOver } = get();
    if (isGameOver) return;
    try {
      const result = game.move(moveStr);
      if (result) {
        set({
          game: new Chess(game.fen()),
          board: game.board(),
          turn: game.turn(),
          isGameOver: game.isGameOver(),
          history: game.history({ verbose: true }),
          lastMove: result,
          capturedPieces: calculateCapturedPieces(game),
          isThinking: false,
        });
      }
    } catch (e) {
      set({ isThinking: false });
    }
  },

  receiveEvaluation: (evalScore) => set({ evaluation: evalScore }),

  resetGame: () => {
    const g = new Chess();
    set({
      game: g,
      board: g.board(),
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
      isThinking: false,
    });
  },

  setSelectedSquare: (square) => {
    const { game, turn, playerColor, mode, selectedSquare, possibleMoves } = get();
    if (mode === 'AI' && turn !== playerColor) return;

    if (!square) {
      set({ selectedSquare: null, possibleMoves: [] });
      return;
    }

    if (selectedSquare && possibleMoves.includes(square)) {
      get().makeMove({ from: selectedSquare, to: square, promotion: 'q' });
      return;
    }

    const piece = game.get(square as any);
    if (piece && piece.color === turn) {
      set({
        selectedSquare: square,
        possibleMoves: game.moves({ square: square as any, verbose: true }).map(m => m.to),
      });
    } else {
      set({ selectedSquare: null, possibleMoves: [] });
    }
  },

  setMode: (mode) => set({ mode }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setBoardTheme: (boardTheme) => set({ boardTheme }),
  setPlayerColor: (playerColor) => set({ playerColor }),
  getHint: () => {
    // This will be handled by StockfishService usually, or we can trigger it here
    // For now, let's just mark it.
  },

  undoMove: () => {
    const { game, mode, playerColor } = get();
    game.undo();
    if (mode === 'AI' && game.turn() !== playerColor) {
      game.undo();
    }
    set({
      game: new Chess(game.fen()),
      board: game.board(),
      turn: game.turn(),
      isGameOver: game.isGameOver(),
      history: game.history({ verbose: true }),
      lastMove: null,
      capturedPieces: calculateCapturedPieces(game),
      isThinking: false,
    });
  },
}));
