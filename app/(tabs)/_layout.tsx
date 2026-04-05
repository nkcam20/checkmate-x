import React from 'react';
import { Tabs } from 'expo-router';
import { LucideHome, LucideGamepad2, LucideHistory, LucideUser, LucideTrophy } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8b5cf6', // neon purple
        tabBarInactiveTintColor: '#475569',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#020617',
          borderTopWidth: 1,
          borderTopColor: '#1e293b',
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <LucideHome size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="play"
        options={{
          title: 'Play',
          tabBarIcon: ({ color }) => <LucideGamepad2 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <LucideHistory size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Rankings',
          tabBarIcon: ({ color }) => <LucideTrophy size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <LucideUser size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

