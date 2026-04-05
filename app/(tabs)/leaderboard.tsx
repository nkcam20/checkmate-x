import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { LucideTrophy, LucideMedal, LucideChevronUp, LucideChevronDown } from 'lucide-react-native';

const LEADERS = [
  { id: '1', name: 'Levenfish', rating: '2840', rank: 1, avatar: null, trend: 'up' },
  { id: '2', name: 'CheckmateKing', rating: '2710', rank: 2, avatar: null, trend: 'flat' },
  { id: '3', name: 'KnightRider', rating: '2695', rank: 3, avatar: null, trend: 'down' },
  { id: '4', name: 'MagnusClone', rating: '2650', rank: 4, avatar: null, trend: 'up' },
  { id: '5', name: 'ChessWizard', rating: '2580', rank: 5, avatar: null, trend: 'up' },
  { id: '6', name: 'EnPassantPro', rating: '2540', rank: 6, avatar: null, trend: 'down' },
  { id: '7', name: 'StalemateExpert', rating: '2490', rank: 7, avatar: null, trend: 'flat' },
  { id: '8', name: 'RookAndRoll', rating: '2450', rank: 8, avatar: null, trend: 'up' },
];

export default function Leaderboard() {
  return (
    <View style={{ flex: 1 }} className="bg-dark-bg">

      <View className="px-6 pt-12 pb-6">
        <Text className="text-gray-400 text-xs font-bold tracking-[2px] uppercase mb-1">
          Global Rankings
        </Text>
        <Text className="text-white text-3xl font-black">
          Leaderboard
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Top 3 Spotlight */}
        <View className="flex-row items-end justify-center gap-x-4 mb-10 mt-4 h-48 px-6">
          {/* Rank 2 */}
          <View className="items-center flex-1">
            <View className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-400 items-center justify-center mb-2">
               <Text className="text-2xl">🥈</Text>
            </View>
            <View className="bg-slate-800/80 w-full rounded-2xl p-3 border border-slate-700 items-center h-24">
              <Text className="text-white font-bold text-xs text-center" numberOfLines={1}>{LEADERS[1].name}</Text>
              <Text className="text-slate-400 text-[10px] font-black mt-1">{LEADERS[1].rating}</Text>
            </View>
          </View>

          {/* Rank 1 */}
          <View className="items-center flex-1">
            <View className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 items-center justify-center mb-2">
               <Text className="text-4xl">👑</Text>
            </View>
            <View className="bg-amber-500/10 w-full rounded-2xl p-3 border border-amber-500/30 items-center h-32">
              <Text className="text-white font-black text-sm text-center" numberOfLines={1}>{LEADERS[0].name}</Text>
              <Text className="text-amber-400 text-xs font-black mt-1">{LEADERS[0].rating}</Text>
              <View className="bg-amber-400 rounded-full px-2 py-0.5 mt-2">
                <Text className="text-[9px] font-black">LEGEND</Text>
              </View>
            </View>
          </View>

          {/* Rank 3 */}
          <View className="items-center flex-1">
            <View className="w-16 h-16 rounded-full bg-orange-900/20 border-2 border-orange-700/50 items-center justify-center mb-2">
               <Text className="text-2xl">🥉</Text>
            </View>
            <View className="bg-orange-900/10 w-full rounded-2xl p-3 border border-orange-900/30 items-center h-24">
              <Text className="text-white font-bold text-xs text-center" numberOfLines={1}>{LEADERS[2].name}</Text>
              <Text className="text-orange-500 text-[10px] font-black mt-1">{LEADERS[2].rating}</Text>
            </View>
          </View>
        </View>

        {/* List Section */}
        <View className="bg-dark-card border-t border-dark-border rounded-t-[40px] pt-8 px-6 pb-20">
          {LEADERS.slice(3).map((item, index) => (
            <View 
              key={item.id}
              className="flex-row items-center mb-5 bg-dark-bg/40 p-4 rounded-3xl border border-dark-border"
            >
              <Text className="text-gray-500 font-black w-8 text-center">{item.rank}</Text>
              <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
                <LucideMedal color="#8b5cf6" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-base">{item.name}</Text>
                <Text className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Master</Text>
              </View>
              <View className="items-end">
                <Text className="text-neon-cyan font-black text-lg">{item.rating}</Text>
                {item.trend === 'up' && <LucideChevronUp color="#22c55e" size={14} />}
                {item.trend === 'down' && <LucideChevronDown color="#ef4444" size={14} />}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>

  );
}
