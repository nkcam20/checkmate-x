import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LucideHistory, LucideMedal, LucideChevronRight, LucideShare2, LucideTrophy, LucideTrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const PAST_GAMES = [
  { id: 1, opponent: 'Stockfish (Level 5)', result: 'Won', type: 'Blitz', date: 'Yesterday, 14:30', rating: '+12', color: 'White' },
  { id: 2, opponent: 'Magnus_Clone', result: 'Lost', type: 'Bullet', date: '2 days ago', rating: '-8', color: 'Black' },
  { id: 3, opponent: 'DeepBlue_88', result: 'Draw', type: 'Rapid', date: 'Apr 3, 10:15', rating: '+0', color: 'White' },
  { id: 4, opponent: 'Player_456', result: 'Won', type: 'Blitz', date: 'Mar 28, 18:22', rating: '+14', color: 'Black' },
];

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }} className="bg-dark-bg">
      <ScrollView 
        style={{ flex: 1 }}
        className="px-6 pt-12" 
        showsVerticalScrollIndicator={false}
      >

        <Text className="text-gray-400 text-xs font-bold tracking-[2px] uppercase mb-1">
          Performance
        </Text>
        <Text className="text-white text-3xl font-black mb-8">
          Match History
        </Text>

        {/* Global Summary */}
        <View className="bg-dark-card p-6 rounded-[32px] mb-8 border border-dark-border flex-row items-center gap-6">
           <View className="items-center bg-primary/10 p-5 rounded-3xl border border-primary/20">
                <LucideTrendingUp color="#8b5cf6" size={24} />
                <Text className="text-white text-2xl font-black mt-2">68%</Text>
                <Text className="text-gray-500 text-[8px] font-black uppercase tracking-widest mt-0.5">Win Rate</Text>
           </View>
           <View className="flex-1 gap-2">
                <View className="flex-row items-center gap-2">
                   <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
                   <Text className="text-white font-bold text-sm">84 Wins</Text>
                </View>
                <View className="flex-row items-center gap-2">
                   <View className="w-2.5 h-2.5 rounded-full bg-red-400" />
                   <Text className="text-white font-bold text-sm">32 Losses</Text>
                </View>
                <View className="flex-row items-center gap-2">
                   <View className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                   <Text className="text-white font-bold text-sm">8 Draws</Text>
                </View>
           </View>
        </View>

        {/* Filters */}
        <View className="flex-row gap-3 mb-8">
            {['All', 'Wins', 'Ranked', 'AI'].map((filter) => (
                <TouchableOpacity key={filter} className={`px-5 py-2.5 rounded-full border ${filter === 'All' ? 'bg-primary border-primary' : 'border-dark-border'}`}>
                    <Text className={`font-black text-[10px] uppercase tracking-widest ${filter === 'All' ? 'text-white' : 'text-gray-500'}`}>{filter}</Text>
                </TouchableOpacity>
            ))}
        </View>

        {/* Matches List */}
        {PAST_GAMES.map((game) => (
            <TouchableOpacity 
                key={game.id}
                onPress={() => router.push(`/game/replay_${game.id}`)}
                className="bg-dark-card/40 p-6 rounded-[32px] mb-6 border border-dark-border"
            >
                <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-row items-center gap-4">
                        <View className={`w-12 h-12 rounded-2xl items-center justify-center ${game.result === 'Won' ? 'bg-green-500/10' : game.result === 'Lost' ? 'bg-red-500/10' : 'bg-gray-500/10'}`}>
                            {game.result === 'Won' ? <LucideMedal size={24} color="#22c55e" /> : <LucideHistory size={24} color="#94a3b8" />}
                        </View>
                        <View>
                            <Text className="text-white font-black text-lg">{game.opponent}</Text>
                            <Text className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{game.type} • {game.date}</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className={`font-black text-xs ${game.result === 'Won' ? 'text-green-500' : game.result === 'Lost' ? 'text-red-400' : 'text-gray-400'}`}>
                            {game.result.toUpperCase()}
                        </Text>
                        <Text className={`text-sm font-black mt-1 ${game.rating.startsWith('+') ? 'text-neon-cyan' : 'text-red-400'}`}>
                            {game.rating} ELO
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between pt-4 border-t border-dark-border">
                    <Text className="text-gray-500 text-[9px] font-black uppercase tracking-widest">{game.color} Pieces Controlled</Text>
                    <View className="flex-row items-center gap-4">
                        <LucideShare2 size={18} color="#475569" />
                        <LucideChevronRight size={20} color="#8b5cf6" />
                    </View>
                </View>
            </TouchableOpacity>
        ))}

        <View className="h-20" />
      </ScrollView>
    </View>

  );
}

