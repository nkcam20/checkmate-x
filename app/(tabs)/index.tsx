import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';
import { LucideTrophy, LucideGamepad2, LucideHistory, LucideTv, LucideUser, LucideSparkles, LucideSwords, LucideArrowRight } from 'lucide-react-native';

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
    <View style={{ flex: 1 }} className="bg-dark-bg">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 100, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-10">
          <View>
            <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[3px] mb-2">Checkmate X Premium</Text>
            <Text className="text-white text-3xl font-black">Welcome back,</Text>
            <Text className="text-neon-cyan text-4xl font-black">Grandmaster ♟</Text>
          </View>
          <TouchableOpacity 
             onPress={() => router.push('/(tabs)/profile' as any)}
             className="w-16 h-16 rounded-[24px] bg-dark-card border-2 border-neon-cyan items-center justify-center shadow-lg shadow-neon-cyan/20"
          >
            <LucideUser color="#22d3ee" size={32} />
          </TouchableOpacity>
        </View>

        {/* Priority Action Card */}
        <TouchableOpacity
          onPress={() => router.push('/play' as any)}
          activeOpacity={0.9}
          className="rounded-[40px] overflow-hidden mb-10 shadow-2xl shadow-primary/30"
        >
          <LinearGradient
            colors={['#8b5cf6', '#4f46e5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-8"
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1 pr-6">
                <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-4">
                  <Text className="text-white text-[10px] font-black uppercase">Rapid Match</Text>
                </View>
                <Text className="text-white text-3xl font-black mb-2">Play Online</Text>
                <Text className="text-white/80 text-sm font-bold leading-5">Challenge world-class players in real-time matchups.</Text>
              </View>
              <View className="bg-white/20 p-5 rounded-[28px] border border-white/30">
                <LucideSwords color="#fff" size={40} />
              </View>
            </View>
            <View className="flex-row items-center mt-8">
              <Text className="text-white text-xs font-black uppercase tracking-widest mr-3">Find Opponent</Text>
              <LucideArrowRight color="#fff" size={16} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Stats Row */}
        <View className="flex-row gap-x-3 mb-10">
          {[
            { label: 'Rating', value: '1450', sub: '+12 today', color: 'text-neon-cyan' },
            { label: 'Win Rate', value: '68%', sub: '84 wins', color: 'text-neon-purple' },
            { label: 'Rank', value: '#42', sub: 'Global', color: 'text-neon-blue' },
          ].map((s) => (
            <View key={s.label} className="flex-1 bg-dark-card border border-dark-border rounded-[32px] p-5 shadow-sm shadow-black">
              <Text className="text-slate-500 text-[9px] font-black tracking-widest mb-2">
                {s.label.toUpperCase()}
              </Text>
              <Text className="text-white text-2xl font-black">
                {s.value}
              </Text>
              <Text className={`${s.color} text-[10px] font-bold mt-2`}>
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
             onPress={() => router.push('/leaderboard' as any)}
             className="flex-1 bg-dark-card border border-dark-border p-6 rounded-[32px] items-center"
          >

            <LucideTrophy color="#fbbf24" size={28} />
            <Text className="text-white font-bold mt-3">Rankings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


