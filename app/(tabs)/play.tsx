import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';

const C = {
  bg: '#0f172a', card: '#1e293b', border: '#334155',
  accent: '#fbbf24', muted: '#64748b', white: '#f1f5f9',
};

const TIME_CONTROLS = [
  { label: '1 min', seconds: 60, type: 'Bullet' },
  { label: '3 min', seconds: 180, type: 'Bullet' },
  { label: '5 min', seconds: 300, type: 'Blitz' },
  { label: '10 min', seconds: 600, type: 'Rapid' },
  { label: '30 min', seconds: 1800, type: 'Classical' },
];

const DIFFICULTIES = [
  { name: 'Easy', emoji: '🌱', desc: 'Just beginning', color: '#22c55e' },
  { name: 'Medium', emoji: '⚡', desc: 'Getting warmer', color: '#60a5fa' },
  { name: 'Hard', emoji: '🔥', desc: 'Serious comp', color: '#f97316' },
  { name: 'Expert', emoji: '☠️', desc: 'Grandmaster', color: '#ef4444' },
];

export default function PlayScreen() {
  const router = useRouter();
  const { resetGame, setMode, setDifficulty } = useGameStore();
  const [selectedTime, setSelectedTime] = useState(2); // index into TIME_CONTROLS
  const [selectedMode, setSelectedMode] = useState<'AI' | 'Multiplayer'>('AI');
  const [selectedDiff, setSelectedDiff] = useState(1); // index into DIFFICULTIES

  const handleStart = () => {
    resetGame();
    setMode(selectedMode);
    setDifficulty(DIFFICULTIES[selectedDiff].name as any);
    router.push(`/game/${Date.now()}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 28, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: C.white, fontSize: 30, fontWeight: '800', marginBottom: 4 }}>New Game</Text>
        <Text style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>Configure your match</Text>

        {/* Mode Selector */}
        <Text style={{ color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 }}>
          GAME MODE
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 28 }}>
          {(['AI', 'Multiplayer'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setSelectedMode(m)}
              style={{
                flex: 1, paddingVertical: 20, borderRadius: 22, alignItems: 'center',
                backgroundColor: selectedMode === m ? C.accent : C.card,
                borderWidth: 2, borderColor: selectedMode === m ? C.accent : C.border,
              }}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>
                {m === 'AI' ? '🤖' : '🌐'}
              </Text>
              <Text style={{ color: selectedMode === m ? '#000' : C.white, fontWeight: '800', fontSize: 15 }}>
                {m === 'AI' ? 'vs AI' : 'Online'}
              </Text>
              <Text style={{ color: selectedMode === m ? '#00000066' : C.muted, fontSize: 11, marginTop: 2 }}>
                {m === 'AI' ? 'Practice mode' : 'Real opponents'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Control */}
        <Text style={{ color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 }}>
          TIME CONTROL
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {TIME_CONTROLS.map((t, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSelectedTime(i)}
              style={{
                paddingHorizontal: 18, paddingVertical: 12, borderRadius: 16,
                backgroundColor: selectedTime === i ? C.accent : C.card,
                borderWidth: 1, borderColor: selectedTime === i ? C.accent : C.border,
                minWidth: 70, alignItems: 'center',
              }}
            >
              <Text style={{ color: selectedTime === i ? '#000' : C.white, fontWeight: '800', fontSize: 13 }}>
                {t.label}
              </Text>
              <Text style={{ color: selectedTime === i ? '#00000066' : C.muted, fontSize: 10, marginTop: 2 }}>
                {t.type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Difficulty (AI only) */}
        {selectedMode === 'AI' && (
          <>
            <Text style={{ color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 }}>
              DIFFICULTY
            </Text>
            <View style={{ gap: 10, marginBottom: 28 }}>
              {DIFFICULTIES.map((d, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedDiff(i)}
                  style={{
                    flexDirection: 'row', alignItems: 'center', padding: 18,
                    backgroundColor: selectedDiff === i ? `${d.color}22` : C.card,
                    borderRadius: 20, borderWidth: 2,
                    borderColor: selectedDiff === i ? d.color : C.border,
                  }}
                >
                  <Text style={{ fontSize: 28, marginRight: 14 }}>{d.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: C.white, fontWeight: '800', fontSize: 16 }}>{d.name}</Text>
                    <Text style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{d.desc}</Text>
                  </View>
                  {selectedDiff === i && (
                    <View style={{
                      width: 22, height: 22, borderRadius: 11,
                      backgroundColor: d.color, alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Text style={{ color: '#000', fontSize: 13, fontWeight: '900' }}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Start Button */}
        <TouchableOpacity
          onPress={handleStart}
          style={{
            backgroundColor: C.accent, paddingVertical: 22, borderRadius: 26,
            alignItems: 'center',
            shadowColor: C.accent, shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4, shadowRadius: 20,
          }}
        >
          <Text style={{ color: '#000', fontWeight: '900', fontSize: 18, letterSpacing: 0.5 }}>
            ♟  Start Game
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
