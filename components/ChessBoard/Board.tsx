import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Piece from './Piece';
import { useGameStore } from '../../store/useGameStore';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const THEMES = {
  Classic: { light: '#eeeed2', dark: '#769656', last: '#f5f682', highlight: 'rgba(0,0,0,0.1)' },
  Dark: { light: '#b8c0c8', dark: '#688090', last: '#acb35d', highlight: 'rgba(0,0,0,0.15)' },
  Neon: { light: '#1e293b', dark: '#0f172a', last: '#3b82f640', highlight: 'rgba(139, 92, 246, 0.4)' },
};

type SquareProps = {
  rank: number;
  file: number;
  piece: any;
  squareSize: number;
};

const Square = React.memo(({ rank, file, piece, squareSize }: SquareProps) => {
  const { selectedSquare, possibleMoves, lastMove, turn, playerColor, mode, boardTheme,
          setSelectedSquare, makeMove } = useGameStore();

  const squareLabel = `${FILES[file]}${8 - rank}`;
  const isDark = (rank + file) % 2 !== 0;
  const isSelected = selectedSquare === squareLabel;
  const isPossibleMove = possibleMoves.includes(squareLabel);
  const isLastMove =
    lastMove && (lastMove.from === squareLabel || lastMove.to === squareLabel);
  
  const theme = THEMES[boardTheme] || THEMES.Dark;
  
  const squareBg = isSelected 
    ? '#8b5cf6' // Selected highlight
    : isLastMove
    ? theme.last
    : isDark ? theme.dark : theme.light;

  const handlePress = () => {
    setSelectedSquare(squareLabel);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={{
        width: squareSize,
        height: squareSize,
        backgroundColor: squareBg,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Rank label (left edge) */}
      {file === 0 && (
        <Text style={{
          position: 'absolute', top: 2, left: 3,
          fontSize: 9, fontWeight: '900',
          color: isDark ? theme.light : theme.dark,
          opacity: 0.8
        }}>{8 - rank}</Text>
      )}
      {/* File label (bottom edge) */}
      {rank === 7 && (
        <Text style={{
          position: 'absolute', bottom: 2, right: 3,
          fontSize: 9, fontWeight: '900',
          color: isDark ? theme.light : theme.dark,
          opacity: 0.8
        }}>{FILES[file]}</Text>
      )}

      {/* Piece */}
      {piece && <Piece type={piece.type} color={piece.color} size={squareSize} />}

      {/* Legal move indicator */}
      {isPossibleMove && (
        <View style={{
          position: 'absolute',
          width: piece ? squareSize * 0.9 : squareSize * 0.3,
          height: piece ? squareSize * 0.9 : squareSize * 0.3,
          borderRadius: 100,
          borderWidth: piece ? 4 : 0,
          borderColor: 'rgba(0,0,0,0.15)',
          backgroundColor: piece ? 'transparent' : 'rgba(0,0,0,0.15)',
          zIndex: 10,
        }} />
      )}
    </TouchableOpacity>
  );
});

export default function Board() {
  const { board, boardTheme } = useGameStore();
  const { width } = useWindowDimensions();
  const BOARD_SIZE = width - 16;
  const SQUARE_SIZE = BOARD_SIZE / 8;

  return (
    <View style={{
      width: BOARD_SIZE,
      height: BOARD_SIZE,
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 4,
      borderColor: THEMES[boardTheme]?.dark || '#0f172a',
      elevation: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
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

