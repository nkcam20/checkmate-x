import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';
import { LucideSparkles, LucideSwords, LucideClock, LucideCircleCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TIME_CONTROLS = [
  { label: '1 min', seconds: 60, type: 'Bullet' },
  { label: '3 min', seconds: 180, type: 'Bullet' },
  { label: '5 min', seconds: 300, type: 'Blitz' },
  { label: '10 min', seconds: 600, type: 'Rapid' },
];

const DIFFICULTIES = [
  { name: 'Easy', emoji: '🌱', desc: 'Just beginning', color: '#22c55e' },
  { name: 'Medium', emoji: '⚡', desc: 'Competitive', color: '#3b82f6' },
  { name: 'Hard', emoji: '🔥', desc: 'Grandmaster Level', color: '#f59e0b' },
  { name: 'Expert', emoji: '☠️', desc: 'Unbeatable', color: '#ef4444' },
];

export default function PlayScreen() {
  const router = useRouter();
  const { resetGame, setMode, setDifficulty } = useGameStore();
  const [selectedTime, setSelectedTime] = useState(2);
  const [selectedMode, setSelectedMode] = useState<'AI' | 'Multiplayer'>('AI');
  const [selectedDiff, setSelectedDiff] = useState(1);

  const handleStart = () => {
    resetGame();
    setMode(selectedMode);
    setDifficulty(DIFFICULTIES[selectedDiff].name as any);
    router.push(`/game/${Date.now()}`);
  };

  return (
    <View style={{ flex: 1 }} className="bg-dark-bg">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 60, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >

        <Text className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Combat Setup</Text>
        <Text className="text-white text-3xl font-black mb-8">New Match</Text>

        {/* Mode Selection */}
        <View className="flex-row gap-x-3 mb-10">
          {(['AI', 'Multiplayer'] as const).map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setSelectedMode(m)}
              className={`flex-1 p-6 rounded-[32px] border-2 items-center ${
                selectedMode === m ? 'bg-primary border-primary' : 'bg-dark-card border-dark-border opacity-60'
              }`}
            >
              <View className={`w-12 h-12 rounded-2xl items-center justify-center mb-4 ${
                selectedMode === m ? 'bg-white/20' : 'bg-dark-bg'
              }`}>
                {m === 'AI' ? <LucideSparkles color="white" /> : <LucideSwords color="white" />}
              </View>
              <Text className="text-white font-black uppercase tracking-widest text-[10px]">{m === 'AI' ? 'vs Stockfish' : 'vs Online'}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Control */}
        <Text className="text-gray-500 text-xs font-black uppercase tracking-widest mb-4 px-1">Timer Configuration</Text>
        <View className="flex-row flex-wrap gap-2 mb-10">
          {TIME_CONTROLS.map((t, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSelectedTime(i)}
              className={`px-6 py-4 rounded-3xl border ${
                selectedTime === i ? 'bg-neon-cyan border-neon-cyan' : 'bg-dark-card border-dark-border'
              }`}
            >
              <Text className={`font-black text-sm ${selectedTime === i ? 'text-black' : 'text-white'}`}>{t.label}</Text>
              <Text className={`text-[8px] font-black uppercase tracking-tighter ${selectedTime === i ? 'text-black/60' : 'text-gray-500'}`}>{t.type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Difficulty Selection */}
        {selectedMode === 'AI' && (
          <View className="mb-10">
            <Text className="text-gray-500 text-xs font-black uppercase tracking-widest mb-4 px-1">AI Calculation Level</Text>
            <View className="gap-y-2">
              {DIFFICULTIES.map((d, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedDiff(i)}
                  className={`flex-row items-center p-5 rounded-3xl border-2 ${
                    selectedDiff === i ? 'bg-dark-card border-primary ring-2 ring-primary' : 'bg-dark-card border-dark-border'
                  }`}
                >
                  <View className="w-12 h-12 rounded-2xl bg-dark-bg items-center justify-center mr-4">
                     <Text className="text-2xl">{d.emoji}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-black text-base">{d.name}</Text>
                    <Text className="text-gray-500 text-xs font-bold">{d.desc}</Text>
                  </View>
                  {selectedDiff === i && <LucideCircleCheck color="#8b5cf6" size={24} />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          onPress={handleStart}
          activeOpacity={0.8}
          className="rounded-[32px] overflow-hidden mt-4"
        >
          <LinearGradient
            colors={['#8b5cf6', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-6 items-center"
          >
            <Text className="text-white font-black text-lg tracking-widest">INITIATE MATCH</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>

  );
}

