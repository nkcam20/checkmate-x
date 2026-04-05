import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, SafeAreaView, ScrollView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Board from '../../components/ChessBoard/Board';
import EvalBar from '../../components/ChessBoard/EvalBar';
import { useGameStore } from '../../store/useGameStore';
import {
  LucideUndo2, LucideRotateCcw, LucideLightbulb,
  LucideTrophy, LucideUser, LucideFlag, LucideChevronLeft, LucideBrain
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const formatTime = (secs: number) => {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {
    turn, isGameOver, resetGame, undoMove, getHint,
    mode, difficulty, history, evaluation, hint,
    capturedPieces, isThinking, playerColor
  } = useGameStore();

  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);
  const [resigned, setResigned] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (history.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [history.length]);

  useEffect(() => {
    if (isGameOver || resigned) { 
      if (timerRef.current) clearInterval(timerRef.current); 
      return; 
    }
    timerRef.current = setInterval(() => {
      if (turn === 'w') setWhiteTime(t => Math.max(0, t - 1));
      else setBlackTime(t => Math.max(0, t - 1));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [turn, isGameOver, resigned]);

  const PIECE_SYMBOLS: Record<string, string> = {
    p: '♟', n: '♞', b: '♝', r: '♜', q: '♛',
  };

  const isPlayerTurn = turn === playerColor;

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Modern Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <LucideChevronLeft size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-white text-lg font-black uppercase tracking-widest">
            {mode === 'AI' ? `Checkmate X Engine` : 'Multiplayer Match'}
          </Text>
          <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
            {mode === 'AI' ? `Level: ${difficulty}` : 'Ranked Session'}
          </Text>
        </View>
        <View className="bg-dark-card px-4 py-1.5 rounded-full border border-dark-border">
           <Text className={`${turn === 'w' ? 'text-white' : 'text-gray-500'} font-black text-xs`}>
             • {turn === 'w' ? 'WHITE' : 'BLACK'}
           </Text>
        </View>
      </View>

      {/* Opponent Info */}
      <View className={`mx-4 p-4 rounded-3xl border ${!isPlayerTurn ? 'border-primary border-2 bg-primary/5' : 'border-dark-border bg-dark-card'} flex-row items-center justify-between mt-2`}>
        <View className="flex-row items-center gap-x-3">
          <View className="w-12 h-12 rounded-2xl bg-dark-bg items-center justify-center">
            <LucideBrain color={!isPlayerTurn ? '#8b5cf6' : '#475569'} size={24} />
          </View>
          <View>
            <View className="flex-row items-center">
              <Text className="text-white font-black text-sm mr-2">{mode === 'AI' ? `Stockfish v10` : 'Opponent'}</Text>
              {isThinking && <ActivityIndicator size="small" color="#8b5cf6" />}
            </View>
            <View className="flex-row flex-wrap max-w-[150px]">
              {capturedPieces.b.map((p, i) => (
                <Text key={i} className="text-gray-500 text-xs">{PIECE_SYMBOLS[p]}</Text>
              ))}
            </View>
          </View>
        </View>
        <View className={`px-4 py-2 rounded-2xl ${!isPlayerTurn ? 'bg-primary' : 'bg-dark-bg border border-dark-border'}`}>
          <Text className={`text-xl font-black ${!isPlayerTurn ? 'text-white' : 'text-gray-400'}`}>
            {formatTime(blackTime)}
          </Text>
        </View>
      </View>

      {/* Board & Eval */}
      <View className="flex-1 justify-center items-center px-4 py-6">
        <View className="flex-direction-row h-[380px] w-full items-center justify-center" style={{ flexDirection: 'row' }}>
           <EvalBar score={evaluation} />
           <View className="flex-1">
             <Board />
           </View>
        </View>
      </View>

      {/* Player Info */}
      <View className={`mx-4 p-4 rounded-3xl border ${isPlayerTurn ? 'border-neon-cyan border-2 bg-neon-cyan/5' : 'border-dark-border bg-dark-card'} flex-row items-center justify-between mb-4`}>
        <View className="flex-row items-center gap-x-3">
          <View className="w-12 h-12 rounded-2xl bg-neon-cyan/10 items-center justify-center">
            <LucideUser color={isPlayerTurn ? '#22d3ee' : '#475569'} size={24} />
          </View>
          <View>
            <Text className="text-white font-black text-sm">YOU</Text>
            <View className="flex-row flex-wrap max-w-[150px]">
              {capturedPieces.w.map((p, i) => (
                <Text key={i} className="text-gray-500 text-xs">{PIECE_SYMBOLS[p]}</Text>
              ))}
            </View>
          </View>
        </View>
        <View className={`px-4 py-2 rounded-2xl ${isPlayerTurn ? 'bg-neon-cyan' : 'bg-dark-bg border border-dark-border'}`}>
          <Text className={`text-xl font-black ${isPlayerTurn ? 'text-black' : 'text-gray-400'}`}>
            {formatTime(whiteTime)}
          </Text>
        </View>
      </View>

      {/* Action Controls */}
      <View className="flex-row justify-between px-4 mb-8">
        {[
          { icon: LucideUndo2, label: 'Undo', onPress: undoMove, color: '#white' },
          { icon: LucideLightbulb, label: 'Hint', onPress: getHint, color: '#facc15' },
          { icon: LucideRotateCcw, label: 'Reset', onPress: () => { resetGame(); setWhiteTime(600); setBlackTime(600); }, color: '#white' },
          { icon: LucideFlag, label: 'Resign', onPress: () => { setResigned(true); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); }, color: '#ef4444' },
        ].map((btn, i) => (
          <TouchableOpacity 
            key={i} 
            onPress={btn.onPress}
            className="items-center bg-dark-card border border-dark-border p-3 px-5 rounded-2xl flex-1 mx-1"
          >
            <btn.icon color={btn.color === '#white' ? 'white' : btn.color} size={20} />
            <Text className="text-gray-500 text-[10px] font-black uppercase mt-1">{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Overlays */}
      {(isGameOver || resigned) && (
        <View className="absolute inset-0 bg-dark-bg/95 items-center justify-center p-8 z-50">
          <View className="bg-dark-card p-10 rounded-[48px] border border-primary/30 w-full items-center">
            <LinearGradient
                  colors={['#8b5cf6', '#3b82f6']}
                  className="w-24 h-24 rounded-full items-center justify-center mb-6"
                >
                  <LucideTrophy color="white" size={48} />
            </LinearGradient>
            <Text className="text-white text-3xl font-black mb-2">Game Over</Text>
            <Text className="text-gray-400 text-center mb-8 font-bold">
               {resigned ? 'You Resigned from the match.' : 'A final move has been played.'}
            </Text>
            
            <TouchableOpacity 
              onPress={() => { resetGame(); setResigned(false); setWhiteTime(600); setBlackTime(600); }}
              className="bg-primary w-full py-5 rounded-3xl items-center mb-4"
            >
              <Text className="text-white font-black text-lg">PLAY AGAIN</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.replace('/(tabs)')}
              className="border border-dark-border w-full py-5 rounded-3xl items-center"
            >
              <Text className="text-gray-400 font-black">EXIT LOBBY</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
