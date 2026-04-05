import React from 'react';
import { View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Piece from './Piece';
import { useGameStore } from '../../store/useGameStore';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

type SquareProps = {
  rank: number;
  file: number;
  piece: any;
};

const Square = ({ rank, file, piece, squareSize }: SquareProps & { squareSize: number }) => {
  const { selectedSquare, possibleMoves, lastMove, turn, playerColor, mode,
          setSelectedSquare, makeMove } = useGameStore();

  const squareLabel = `${FILES[file]}${8 - rank}`;
  const isDark = (rank + file) % 2 !== 0;
  const isSelected = selectedSquare === squareLabel;
  const isPossibleMove = possibleMoves.includes(squareLabel);
  const isLastMove =
    lastMove && (lastMove.from === squareLabel || lastMove.to === squareLabel);
  const isMyTurn = mode !== 'AI' || turn === playerColor;

  const squareBg = isSelected
    ? '#f59e0b'
    : isLastMove
    ? isDark ? '#b0c040' : '#cdd26a'
    : isDark ? '#779556' : '#ebecd0';

  const handlePress = () => {
    if (!isMyTurn) return;
    if (selectedSquare) {
      if (isPossibleMove) {
        makeMove({ from: selectedSquare, to: squareLabel, promotion: 'q' });
      } else if (piece && piece.color === turn) {
        setSelectedSquare(squareLabel);
      } else {
        setSelectedSquare(null);
      }
    } else if (piece && piece.color === turn) {
      setSelectedSquare(squareLabel);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      style={{ width: squareSize, height: squareSize, backgroundColor: squareBg,
               alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Rank label (left edge) */}
      {file === 0 && (
        <Text style={{
          position: 'absolute', top: 2, left: 3,
          fontSize: 9, fontWeight: '700',
          color: isDark ? '#ebecd0' : '#779556',
        }}>{8 - rank}</Text>
      )}
      {/* File label (bottom edge) */}
      {rank === 7 && (
        <Text style={{
          position: 'absolute', bottom: 2, right: 3,
          fontSize: 9, fontWeight: '700',
          color: isDark ? '#ebecd0' : '#779556',
        }}>{FILES[file]}</Text>
      )}
      {/* Piece */}
      {piece && <Piece type={piece.type} color={piece.color} size={squareSize} />}
      {/* Legal move dot */}
      {isPossibleMove && !piece && (
        <View style={{
          width: squareSize * 0.28, height: squareSize * 0.28,
          borderRadius: squareSize, backgroundColor: 'rgba(0,0,0,0.22)',
        }} />
      )}
      {/* Legal capture ring */}
      {isPossibleMove && piece && (
        <View style={{
          position: 'absolute', width: squareSize, height: squareSize,
          borderWidth: 4, borderColor: 'rgba(0,0,0,0.25)', borderRadius: 2,
        }} />
      )}
    </TouchableOpacity>
  );
};

export default function Board() {
  const { board } = useGameStore();
  const { width, height } = useWindowDimensions();
  // Ensure we don't overflow the screen length-wise on short devices
  const BOARD_SIZE = Math.min(width - 28, height * 0.5, 420); 
  const SQUARE_SIZE = BOARD_SIZE / 8;

  return (
    <View style={{
      width: BOARD_SIZE, height: BOARD_SIZE,
      borderRadius: 4, overflow: 'hidden',
      shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5, shadowRadius: 16, elevation: 12,
    }}>
      {board.map((row, r) => (
        <View key={r} style={{ flexDirection: 'row' }}>
          {row.map((sq, f) => (
            <Square key={`${r}-${f}`} rank={r} file={f} piece={sq} squareSize={SQUARE_SIZE} />
          ))}
        </View>
      ))}
    </View>
  );
}
