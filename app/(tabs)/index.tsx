import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';
import { LucideTrophy, LucideGamepad2, LucideHistory, LucideTv, LucideUser, LucideSparkles, LucideSwords } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

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
    <SafeAreaView className="flex-1 bg-dark-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-gray-400 text-xs font-bold tracking-[2px] uppercase">
                Welcome back
            </Text>
            <Text className="text-white text-3xl font-black mt-1">
                Grandmaster ♟
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/profile')}
            className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden"
          >
            <View className="flex-1 bg-primary-light/20 items-center justify-center">
              <LucideUser color="#8b5cf6" size={24} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View className="flex-row gap-x-3 mb-8">
          {[
            { label: 'Rating', value: '1450', sub: '+12 today', color: 'text-neon-cyan' },
            { label: 'Win Rate', value: '68%', sub: '84 wins', color: 'text-neon-purple' },
            { label: 'Rank', value: '#42', sub: 'Global', color: 'text-neon-blue' },
          ].map((s) => (
            <View key={s.label} className="flex-1 bg-dark-card/60 rounded-3xl p-4 border border-dark-border">
              <Text className="text-gray-500 text-[10px] font-bold tracking-wider mb-1">
                {s.label.toUpperCase()}
              </Text>
              <Text className="text-white text-xl font-black">
                {s.value}
              </Text>
              <Text className={`${s.color} text-[10px] font-bold mt-1`}>
                {s.sub}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Play Highlight */}
        <Text className="text-white text-lg font-black mb-4">Quick Play</Text>
        
        <TouchableOpacity
          onPress={() => startGame('Multiplayer')}
          activeOpacity={0.8}
          className="mb-4 overflow-hidden rounded-[32px]"
        >
          <LinearGradient
            colors={['#6366f1', '#a855f7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-row items-center p-6"
          >
            <View className="w-16 h-16 rounded-2xl bg-white/20 items-center justify-center mr-4">
              <LucideSwords color="white" size={32} />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-black">Play Online</Text>
              <Text className="text-white/70 font-bold mt-0.5">Real-time matchmaking</Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
              <Text className="text-white text-lg">→</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => startGame('AI', 'Medium')}
          activeOpacity={0.8}
          className="bg-dark-card border border-dark-border rounded-[32px] p-6 flex-row items-center mb-8"
        >
          <View className="w-16 h-16 rounded-2xl bg-primary/20 items-center justify-center mr-4">
            <LucideSparkles color="#8b5cf6" size={32} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-xl font-black">Train vs AI</Text>
            <Text className="text-gray-500 font-bold mt-0.5">Stockfish 10 WASM Engine</Text>
          </View>
          <View className="w-10 h-10 rounded-full bg-dark-border items-center justify-center">
            <LucideGamepad2 color="#8b5cf6" size={20} />
          </View>
        </TouchableOpacity>

        {/* AI Difficulty Section */}
        <Text className="text-white text-lg font-black mb-4">Level Selection</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          {[
            { name: 'Easy', emoji: '🌱', color: '#22c55e', bg: 'bg-green-500/10' },
            { name: 'Medium', emoji: '⚡', color: '#3b82f6', bg: 'bg-blue-500/10' },
            { name: 'Hard', emoji: '🔥', color: '#f97316', bg: 'bg-orange-500/10' },
            { name: 'Expert', emoji: '☠️', color: '#ef4444', bg: 'bg-red-500/10' },
          ].map((d) => (
            <TouchableOpacity
              key={d.name}
              onPress={() => startGame('AI', d.name)}
              className={`flex-1 min-w-[48%] ${d.bg} border border-dark-border rounded-3xl p-5 items-center`}
            >
              <Text className="text-2xl mb-2">{d.emoji}</Text>
              <Text style={{ color: d.color }} className="text-xs font-black uppercase tracking-widest text-center">
                {d.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Grid */}
        <View className="flex-row gap-3">
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/history')}
            className="flex-1 bg-dark-card border border-dark-border p-6 rounded-[32px] items-center"
          >
            <LucideHistory color="#3b82f6" size={28} />
            <Text className="text-white font-bold mt-3">History</Text>
          </TouchableOpacity>
          <TouchableOpacity 
             onPress={() => router.push('/leaderboard')}

             className="flex-1 bg-dark-card border border-dark-border p-6 rounded-[32px] items-center"
          >
            <LucideTrophy color="#fbbf24" size={28} />
            <Text className="text-white font-bold mt-3">Rankings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

