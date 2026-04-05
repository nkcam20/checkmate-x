import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { History, Target, TrendingUp, ChevronRight, Share2, Medal } from 'lucide-react-native';
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
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="text-white text-3xl font-bold mb-2">Game History</Text>
        <Text className="text-gray-400 mb-8">Review your past performance</Text>

        {/* Global Summary */}
        <View className="bg-secondary/40 p-6 rounded-[32px] mb-8 border border-white/5 flex-row items-center gap-6 shadow-xl">
           <View className="items-center bg-white/5 p-4 rounded-3xl border border-white/5">
                <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Win Rate</Text>
                <Text className="text-white text-2xl font-bold">68%</Text>
           </View>
           <View className="flex-1 gap-2">
                <View className="flex-row items-center gap-2">
                   <View className="w-2 h-2 rounded-full bg-green-500" />
                   <Text className="text-white font-medium">84 Wins</Text>
                </View>
                <View className="flex-row items-center gap-2">
                   <View className="w-2 h-2 rounded-full bg-red-400" />
                   <Text className="text-white font-medium">32 Losses</Text>
                </View>
                <View className="flex-row items-center gap-2">
                   <View className="w-2 h-2 rounded-full bg-gray-500" />
                   <Text className="text-white font-medium">8 Draws</Text>
                </View>
           </View>
        </View>

        {/* Filters */}
        <View className="flex-row gap-3 mb-6">
            {['All', 'Wins', 'Losses', 'Online'].map((filter) => (
                <TouchableOpacity key={filter} className={`px-4 py-2 rounded-full border ${filter === 'All' ? 'bg-accent border-accent' : 'border-white/10'}`}>
                    <Text className={`font-bold text-xs ${filter === 'All' ? 'text-black' : 'text-gray-400'}`}>{filter}</Text>
                </TouchableOpacity>
            ))}
        </View>

        {/* Matches List */}
        {PAST_GAMES.map((game) => (
            <TouchableOpacity 
                key={game.id}
                onPress={() => router.push(`/game/replay_${game.id}`)}
                className="bg-secondary/20 p-5 rounded-2xl mb-4 border border-white/5"
            >
                <View className="flex-row justify-between items-start mb-3">
                    <View className="flex-row items-center gap-3">
                        <View className={`w-8 h-8 rounded-lg items-center justify-center ${game.result === 'Won' ? 'bg-green-500/10' : game.result === 'Lost' ? 'bg-red-500/10' : 'bg-gray-500/10'}`}>
                            {game.result === 'Won' ? <Medal size={20} color="#4ade80" /> : <History size={20} color="#94a3b8" />}
                        </View>
                        <View>
                            <Text className="text-white font-bold text-lg">{game.opponent}</Text>
                            <Text className="text-gray-400 text-xs">{game.type} • {game.date}</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className={`font-bold ${game.result === 'Won' ? 'text-green-500' : game.result === 'Lost' ? 'text-red-400' : 'text-gray-400'}`}>
                            {game.result.toUpperCase()}
                        </Text>
                        <Text className={`text-xs font-mono font-bold ${game.rating.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {game.rating} Elo
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between pt-3 border-t border-white/5">
                    <Text className="text-gray-500 text-xs font-bold uppercase tracking-widest">{game.color} Pieces</Text>
                    <View className="flex-row items-center gap-4">
                        <Share2 size={16} color="#94a3b8" />
                        <ChevronRight size={20} color="#FBBF24" />
                    </View>
                </View>
            </TouchableOpacity>
        ))}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
