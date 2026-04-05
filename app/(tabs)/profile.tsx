import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Switch, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useGameStore } from '../../store/useGameStore';
import { LucideSettings, LucideBell, LucideVolume2, LucideLogOut, LucideUser, LucideShieldCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const router = useRouter();
  const { boardTheme, setBoardTheme } = useGameStore();
  const [notifs, setNotifs] = useState(true);
  const [sounds, setSounds] = useState(true);

  const THEMES = ['Classic', 'Dark', 'Neon'] as const;

  return (
    <View style={{ flex: 1 }} className="bg-dark-bg">
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 60, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Header with Avatar */}
        <View className="items-center mb-10">
          <View className="relative">
            <View className="w-32 h-32 rounded-[40px] bg-primary/20 border-2 border-primary/40 items-center justify-center overflow-hidden">
               <LucideUser color="#8b5cf6" size={64} />
            </View>
            <View className="absolute -bottom-2 -right-2 bg-neon-cyan p-2 rounded-2xl border-4 border-dark-bg">
               <LucideShieldCheck color="black" size={20} />
            </View>
          </View>
          <Text className="text-white text-3xl font-black mt-6">Grandmaster</Text>
          <Text className="text-primary-light font-black text-xs tracking-widest uppercase mt-1">Level 42 · Pro Member</Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-x-3 mb-10">
           {[
             { label: 'Rating', val: '1450', sub: 'Blitz' },
             { label: 'Win Rate', val: '68%', sub: 'Global' },
             { label: 'Matches', val: '124', sub: 'Total' },
           ].map((s, i) => (
             <View key={i} className="flex-1 bg-dark-card border border-dark-border p-4 rounded-3xl items-center">
               <Text className="text-white font-black text-xl">{s.val}</Text>
               <Text className="text-gray-500 text-[9px] font-black uppercase mt-1 tracking-widest">{s.sub}</Text>
             </View>
           ))}
        </View>

        {/* Customization Section */}
        <View className="mb-10">
          <Text className="text-gray-500 text-xs font-black uppercase mb-4 tracking-widest px-1">
            Board Aesthetics
          </Text>
          <View className="flex-row gap-x-2">
            {THEMES.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setBoardTheme(t)}
                className={`flex-1 py-4 rounded-3xl items-center border ${
                  boardTheme === t ? 'bg-primary border-primary' : 'bg-dark-card border-dark-border'
                }`}
              >
                <Text className={`font-black uppercase text-[10px] tracking-widest ${
                  boardTheme === t ? 'text-white' : 'text-gray-500'
                }`}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings List */}
        <View className="mb-10">
          <Text className="text-gray-500 text-xs font-black uppercase mb-4 tracking-widest px-1">
            General Settings
          </Text>
          <View className="bg-dark-card rounded-[32px] border border-dark-border overflow-hidden">
            <View className="flex-row items-center justify-between p-6 border-b border-dark-border">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-2xl bg-blue-500/10 items-center justify-center mr-4">
                   <LucideBell color="#3b82f6" size={20} />
                </View>
                <Text className="text-white font-bold">Push Notifications</Text>
              </View>
              <Switch 
                value={notifs} 
                onValueChange={setNotifs}
                trackColor={{ false: '#1e293b', true: '#8b5cf6' }}
              />
            </View>
            <View className="flex-row items-center justify-between p-6">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-2xl bg-orange-500/10 items-center justify-center mr-4">
                   <LucideVolume2 color="#f97316" size={20} />
                </View>
                <Text className="text-white font-bold">Haptic & Sounds</Text>
              </View>
              <Switch 
                value={sounds} 
                onValueChange={setSounds}
                trackColor={{ false: '#1e293b', true: '#8b5cf6' }}
              />
            </View>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity 
          onPress={() => router.replace('/(auth)/login')}
          className="flex-row items-center justify-center bg-red-500/10 border border-red-500/30 p-6 rounded-[32px]"
        >
          <LucideLogOut color="#ef4444" size={20} className="mr-3" />
          <Text className="text-red-500 font-black uppercase tracking-widest">Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>

  );
}

