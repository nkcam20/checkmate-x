import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, SafeAreaView, ScrollView,
  TouchableOpacity, Pressable
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Board from '../../components/ChessBoard/Board';
import EvalBar from '../../components/ChessBoard/EvalBar';
import { useGameStore } from '../../store/useGameStore';
import {
  Undo2, RotateCcw, MessageSquare, Lightbulb,
  Trophy, User, Flag, Handshake, ChevronLeft
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

/** Format mm:ss from seconds */
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
    capturedPieces, materialDiff,
  } = useGameStore();

  const [whiteTime, setWhiteTime] = useState(600); // 10 min
  const [blackTime, setBlackTime] = useState(600);
  const [chatOpen, setChatOpen] = useState(false);
  const [resigned, setResigned] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Haptic on every move
  useEffect(() => {
    if (history.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [history.length]);

  // Chess clock
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

  const gameOver = isGameOver || resigned;

  // Material display helpers
  const PIECE_SYMBOLS: Record<string, string> = {
    p: '♟', n: '♞', b: '♝', r: '♜', q: '♛',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
        paddingTop: 12, paddingBottom: 8, backgroundColor: '#0f172a',
      }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12, padding: 8 }}>
          <ChevronLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, flex: 1 }}>
          {mode === 'AI' ? `vs AI · ${difficulty}` : 'Multiplayer'}
        </Text>
        <View style={{
          backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 4,
          borderRadius: 8, borderWidth: 1, borderColor: '#334155',
        }}>
          <Text style={{ color: turn === 'w' ? '#fbbf24' : '#94a3b8', fontFamily: 'SpaceMono', }}>
            {turn === 'w' ? '● White' : '● Black'}
          </Text>
        </View>
      </View>

      {/* Opponent Row */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 10,
        backgroundColor: '#1e293b', marginHorizontal: 12, borderRadius: 16,
        borderWidth: 1, borderColor: '#334155',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{
            width: 36, height: 36, borderRadius: 12,
            backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={20} color="#94a3b8" />
          </View>
          <View>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              {mode === 'AI' ? `Stockfish (${difficulty})` : 'Opponent'}
            </Text>
            {/* Captured pieces opponent lost */}
            <Text style={{ color: '#64748b', fontSize: 12 }}>
              {capturedPieces.b.map(p => PIECE_SYMBOLS[p] || '').join('')}
              {materialDiff < 0 ? ` -${Math.abs(Math.round(materialDiff))}` : ''}
            </Text>
          </View>
        </View>
        {/* Opponent Timer */}
        <View style={{
          backgroundColor: turn === 'b' ? '#1d4ed8' : '#0f172a',
          paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10,
          borderWidth: 1, borderColor: turn === 'b' ? '#3b82f6' : '#334155',
        }}>
          <Text style={{ color: '#fff', fontFamily: 'SpaceMono', fontSize: 18, fontWeight: 'bold' }}>
            {formatTime(blackTime)}
          </Text>
        </View>
      </View>

      {/* Board + EvalBar */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 12 }}>
        <EvalBar score={evaluation} />
        <Board />
      </View>

      {/* Hint */}
      {hint && (
        <View style={{
          marginHorizontal: 12, backgroundColor: '#fbbf2420',
          borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#fbbf2440',
          flexDirection: 'row', alignItems: 'center',
        }}>
          <Lightbulb size={16} color="#fbbf24" />
          <Text style={{ color: '#fbbf24', marginLeft: 8, fontWeight: 'bold' }}>
            Best move: <Text style={{ fontFamily: 'SpaceMono' }}>{hint}</Text>
          </Text>
        </View>
      )}

      {/* Player Row */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 10,
        backgroundColor: '#1e293b', marginHorizontal: 12, borderRadius: 16,
        borderWidth: 1, borderColor: '#334155', marginTop: 4,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{
            width: 36, height: 36, borderRadius: 12,
            backgroundColor: '#fbbf24', alignItems: 'center', justifyContent: 'center',
          }}>
            <User size={20} color="#000" />
          </View>
          <View>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>You</Text>
            <Text style={{ color: '#64748b', fontSize: 12 }}>
              {capturedPieces.w.map(p => PIECE_SYMBOLS[p] || '').join('')}
              {materialDiff > 0 ? ` +${Math.round(materialDiff)}` : ''}
            </Text>
          </View>
        </View>
        {/* Player Timer */}
        <View style={{
          backgroundColor: turn === 'w' ? '#fbbf24' : '#0f172a',
          paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10,
          borderWidth: 1, borderColor: turn === 'w' ? '#fbbf24' : '#334155',
        }}>
          <Text style={{
            color: turn === 'w' ? '#000' : '#fff',
            fontFamily: 'SpaceMono', fontSize: 18, fontWeight: 'bold',
          }}>
            {formatTime(whiteTime)}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={{
        flexDirection: 'row', justifyContent: 'space-around',
        marginHorizontal: 12, marginTop: 12,
        backgroundColor: '#1e293b', borderRadius: 20, padding: 12,
        borderWidth: 1, borderColor: '#334155',
      }}>
        {[
          { icon: <Undo2 size={22} color="#fff" />, label: 'Undo', onPress: undoMove },
          { icon: <Lightbulb size={22} color="#fbbf24" />, label: 'Hint', onPress: getHint },
          { icon: <RotateCcw size={22} color="#fff" />, label: 'New', onPress: () => { resetGame(); setWhiteTime(600); setBlackTime(600); } },
          { icon: <Handshake size={22} color="#94a3b8" />, label: 'Draw', onPress: () => {} },
          { icon: <Flag size={22} color="#ef4444" />, label: 'Resign', onPress: () => { setResigned(true); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); } },
        ].map((btn, i) => (
          <TouchableOpacity key={i} onPress={btn.onPress} style={{ alignItems: 'center' }}>
            <View style={{
              padding: 10, backgroundColor: '#0f172a',
              borderRadius: 14, marginBottom: 4,
              borderWidth: 1, borderColor: '#334155',
            }}>
              {btn.icon}
            </View>
            <Text style={{ color: '#64748b', fontSize: 11, fontWeight: '600' }}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Move History */}
      <View style={{ marginTop: 12, paddingHorizontal: 16, flex: 1 }}>
        <Text style={{ color: '#475569', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 6 }}>
          MOVE HISTORY
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {history.length === 0 ? (
            <Text style={{ color: '#334155', fontStyle: 'italic' }}>No moves yet — you go first.</Text>
          ) : history.map((move, i) => (
            <View key={i} style={{
              marginRight: 6, paddingHorizontal: 10, paddingVertical: 6,
              backgroundColor: i === history.length - 1 ? '#fbbf2420' : '#1e293b',
              borderRadius: 8,
              borderWidth: 1, borderColor: i === history.length - 1 ? '#fbbf2460' : '#334155',
            }}>
              <Text style={{ color: '#e2e8f0', fontFamily: 'SpaceMono', fontSize: 13 }}>
                {i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ` : ''}{move.san}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Game Over Overlay */}
      {(gameOver) && (
        <View style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          alignItems: 'center', justifyContent: 'center', padding: 32, zIndex: 99,
        }}>
          <View style={{
            backgroundColor: '#1e293b', padding: 36, borderRadius: 32,
            alignItems: 'center', width: '100%',
            borderWidth: 1, borderColor: '#fbbf2440',
          }}>
            <Trophy size={72} color="#fbbf24" style={{ marginBottom: 16 }} />
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: 'bold', marginBottom: 6 }}>
              {resigned ? 'You Resigned' : 'Game Over!'}
            </Text>
            <Text style={{ color: '#94a3b8', marginBottom: 24, textAlign: 'center', fontSize: 15 }}>
              {resigned
                ? 'Better luck next time!'
                : turn === 'w'
                ? 'Black wins by checkmate!'
                : 'White wins by checkmate!'}
            </Text>
            <TouchableOpacity
              onPress={() => { resetGame(); setWhiteTime(600); setBlackTime(600); setResigned(false); }}
              style={{
                backgroundColor: '#fbbf24', width: '100%', paddingVertical: 18,
                borderRadius: 16, alignItems: 'center', marginBottom: 12,
              }}
            >
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 17 }}>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)')}
              style={{
                width: '100%', paddingVertical: 18, borderRadius: 16,
                alignItems: 'center', borderWidth: 1, borderColor: '#334155',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
