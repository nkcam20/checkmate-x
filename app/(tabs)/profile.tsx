import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';

const C = {
  bg: '#0f172a', card: '#1e293b', border: '#334155',
  accent: '#fbbf24', muted: '#64748b', white: '#f1f5f9',
  green: '#22c55e', red: '#ef4444',
};

export default function ProfileScreen() {
  const router = useRouter();
  const { resetGame } = useGameStore();
  const [notifs, setNotifs] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [boardTheme, setBoardTheme] = useState<'Classic' | 'Neon' | 'Dark'>('Classic');

  const RATINGS = [
    { label: 'Blitz', value: '1450', color: C.accent },
    { label: 'Rapid', value: '1620', color: '#60a5fa' },
    { label: 'Bullet', value: '1200', color: '#c084fc' },
  ];

  const BOARD_THEMES = ['Classic', 'Neon', 'Dark'] as const;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 28, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View style={{
            width: 100, height: 100, borderRadius: 30,
            backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center',
            shadowColor: C.accent, shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35, shadowRadius: 16, marginBottom: 16,
          }}>
            <Text style={{ fontSize: 56 }}>♛</Text>
          </View>
          <Text style={{ color: C.white, fontSize: 26, fontWeight: '800' }}>Grandmaster</Text>
          <Text style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Joined April 2024</Text>
        </View>

        {/* Rating Cards */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 32 }}>
          {RATINGS.map((r) => (
            <View key={r.label} style={{
              flex: 1, backgroundColor: C.card, padding: 16,
              borderRadius: 20, alignItems: 'center',
              borderWidth: 1, borderColor: C.border,
            }}>
              <Text style={{ color: r.color, fontSize: 22, fontWeight: '800' }}>{r.value}</Text>
              <Text style={{ color: C.muted, fontSize: 11, fontWeight: '700', marginTop: 4, letterSpacing: 0.8 }}>
                {r.label.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>

        {/* Win / Loss / Draw */}
        <View style={{
          backgroundColor: C.card, borderRadius: 24, padding: 20,
          borderWidth: 1, borderColor: C.border, marginBottom: 32,
        }}>
          <Text style={{ color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 16 }}>
            MATCH RECORD
          </Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {[
              { label: 'Wins', val: 84, color: C.green },
              { label: 'Losses', val: 32, color: C.red },
              { label: 'Draws', val: 8, color: C.muted },
            ].map((s) => (
              <View key={s.label} style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: s.color, fontSize: 28, fontWeight: '900' }}>{s.val}</Text>
                <Text style={{ color: C.muted, fontSize: 12, fontWeight: '600' }}>{s.label}</Text>
              </View>
            ))}
          </View>
          {/* Win rate bar */}
          <View style={{ marginTop: 16, height: 8, borderRadius: 4, backgroundColor: C.border, overflow: 'hidden' }}>
            <View style={{ width: '68%', height: '100%', backgroundColor: C.green, borderRadius: 4 }} />
          </View>
          <Text style={{ color: C.muted, fontSize: 11, marginTop: 6, textAlign: 'right' }}>68% win rate</Text>
        </View>

        {/* Board Theme */}
        <Text style={{ color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 }}>
          BOARD THEME
        </Text>
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 28 }}>
          {BOARD_THEMES.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setBoardTheme(t)}
              style={{
                flex: 1, paddingVertical: 14, borderRadius: 18, alignItems: 'center',
                backgroundColor: boardTheme === t ? C.accent : C.card,
                borderWidth: 1, borderColor: boardTheme === t ? C.accent : C.border,
              }}
            >
              <Text style={{ color: boardTheme === t ? '#000' : C.white, fontWeight: '700' }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Toggles */}
        <Text style={{ color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 }}>
          SETTINGS
        </Text>
        <View style={{ backgroundColor: C.card, borderRadius: 24, borderWidth: 1, borderColor: C.border, marginBottom: 28 }}>
          {[
            { label: '🔔  Push Notifications', value: notifs, setter: setNotifs },
            { label: '🔊  Sound Effects', value: sounds, setter: setSounds },
          ].map((item, i) => (
            <View key={i} style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              paddingHorizontal: 20, paddingVertical: 18,
              borderBottomWidth: i === 0 ? 1 : 0, borderBottomColor: C.border,
            }}>
              <Text style={{ color: C.white, fontWeight: '600', fontSize: 15 }}>{item.label}</Text>
              <Switch
                value={item.value}
                onValueChange={item.setter}
                trackColor={{ false: C.border, true: C.accent }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          onPress={() => router.replace('/(auth)/login')}
          style={{
            backgroundColor: '#ef444420', paddingVertical: 18, borderRadius: 22,
            alignItems: 'center', borderWidth: 1, borderColor: '#ef444440',
          }}
        >
          <Text style={{ color: C.red, fontWeight: '800', fontSize: 16 }}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
