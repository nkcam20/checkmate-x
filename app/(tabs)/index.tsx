import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';

const COLORS = {
  bg: '#0f172a',
  card: '#1e293b',
  border: '#334155',
  accent: '#fbbf24',
  muted: '#64748b',
  white: '#f1f5f9',
  green: '#22c55e',
  red: '#ef4444',
};

export default function Dashboard() {
  const router = useRouter();
  const { resetGame, setMode, setDifficulty } = useGameStore();

  const startGame = (mode: 'AI' | 'Multiplayer', diff?: string) => {
    resetGame();
    setMode(mode);
    if (diff) setDifficulty(diff as any);
    router.push(`/game/${Date.now()}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 28, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ color: COLORS.muted, fontSize: 13, fontWeight: '700', letterSpacing: 1.5 }}>
            WELCOME BACK
          </Text>
          <Text style={{ color: COLORS.white, fontSize: 32, fontWeight: '800', marginTop: 4 }}>
            Grandmaster ♟
          </Text>
        </View>

        {/* Stats Row */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Rating', value: '1450', sub: '+12 today', subColor: COLORS.green },
            { label: 'Win Rate', value: '68%', sub: '84 wins', subColor: '#60a5fa' },
            { label: 'Games', value: '124', sub: 'All time', subColor: COLORS.muted },
          ].map((s) => (
            <View key={s.label} style={{
              flex: 1, backgroundColor: COLORS.card, padding: 16, borderRadius: 20,
              borderWidth: 1, borderColor: COLORS.border,
            }}>
              <Text style={{ color: COLORS.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1.2 }}>
                {s.label.toUpperCase()}
              </Text>
              <Text style={{ color: COLORS.white, fontSize: 22, fontWeight: '800', marginTop: 4 }}>
                {s.value}
              </Text>
              <Text style={{ color: s.subColor, fontSize: 11, marginTop: 2, fontWeight: '600' }}>
                {s.sub}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Play */}
        <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '800', marginBottom: 14 }}>
          Quick Play
        </Text>

        {/* Play Online big card */}
        <TouchableOpacity
          onPress={() => startGame('Multiplayer')}
          style={{
            backgroundColor: COLORS.accent, borderRadius: 28, padding: 24,
            flexDirection: 'row', alignItems: 'center', marginBottom: 12,
            shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35, shadowRadius: 16,
          }}
        >
          <Text style={{ fontSize: 44, marginRight: 16 }}>🌐</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#000', fontSize: 20, fontWeight: '800' }}>Play Online</Text>
            <Text style={{ color: '#00000099', fontWeight: '600', marginTop: 2 }}>
              Match by ELO rating
            </Text>
          </View>
          <Text style={{ color: '#000', fontSize: 24 }}>›</Text>
        </TouchableOpacity>

        {/* vs AI card */}
        <TouchableOpacity
          onPress={() => startGame('AI', 'Medium')}
          style={{
            backgroundColor: COLORS.card, borderRadius: 28, padding: 24,
            flexDirection: 'row', alignItems: 'center', marginBottom: 32,
            borderWidth: 1, borderColor: COLORS.border,
          }}
        >
          <Text style={{ fontSize: 44, marginRight: 16 }}>🤖</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: '800' }}>vs AI Engine</Text>
            <Text style={{ color: COLORS.muted, fontWeight: '600', marginTop: 2 }}>
              Stockfish-powered engine
            </Text>
          </View>
          <Text style={{ color: COLORS.accent, fontSize: 24 }}>›</Text>
        </TouchableOpacity>

        {/* Difficulty Quick-Select */}
        <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '800', marginBottom: 14 }}>
          AI Difficulty
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 32 }}>
          {[
            { name: 'Easy', emoji: '🌱', color: '#22c55e' },
            { name: 'Medium', emoji: '⚡', color: '#60a5fa' },
            { name: 'Hard', emoji: '🔥', color: '#f97316' },
            { name: 'Expert', emoji: '☠️', color: '#ef4444' },
          ].map((d) => (
            <TouchableOpacity
              key={d.name}
              onPress={() => startGame('AI', d.name)}
              style={{
                flex: 1, backgroundColor: COLORS.card, paddingVertical: 16,
                borderRadius: 18, alignItems: 'center',
                borderWidth: 1, borderColor: COLORS.border,
              }}
            >
              <Text style={{ fontSize: 22 }}>{d.emoji}</Text>
              <Text style={{ color: d.color, fontSize: 11, fontWeight: '700', marginTop: 6 }}>
                {d.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Games */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: '800' }}>Recent Games</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
            <Text style={{ color: COLORS.accent, fontWeight: '700' }}>View all</Text>
          </TouchableOpacity>
        </View>

        {[
          { opp: 'Magnus_Clone', result: 'W', delta: '+14', type: 'Blitz', time: '2h ago' },
          { opp: 'Stockfish Lvl 5', result: 'L', delta: '-8', type: 'Rapid', time: 'Yesterday' },
          { opp: 'DeepBlue_88', result: 'D', delta: '+0', type: 'Bullet', time: '2d ago' },
        ].map((g, i) => (
          <View key={i} style={{
            backgroundColor: COLORS.card, borderRadius: 18, padding: 18,
            flexDirection: 'row', alignItems: 'center',
            borderWidth: 1, borderColor: COLORS.border, marginBottom: 10,
          }}>
            <View style={{
              width: 44, height: 44, borderRadius: 12, marginRight: 14,
              backgroundColor: g.result === 'W' ? '#22c55e20' : g.result === 'L' ? '#ef444420' : '#33415520',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 18, fontWeight: '800',
                color: g.result === 'W' ? COLORS.green : g.result === 'L' ? COLORS.red : COLORS.muted,
              }}>{g.result}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: COLORS.white, fontWeight: '700', fontSize: 15 }}>{g.opp}</Text>
              <Text style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>{g.type} · {g.time}</Text>
            </View>
            <Text style={{
              color: g.delta.startsWith('+') ? COLORS.green : g.delta === '+0' ? COLORS.muted : COLORS.red,
              fontWeight: '800', fontSize: 15,
            }}>{g.delta}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
