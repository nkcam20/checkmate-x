import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, LogIn, Globe, User } from 'lucide-react-native';


import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      router.replace('/(tabs)');
      setLoading(false);
    }, 1200);
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-8 justify-center"
      >
        {/* Branding */}
        <View className="items-center mb-12">
          <LinearGradient
            colors={['#8b5cf6', '#6366f1']}
            className="p-6 rounded-[36px] mb-6"
          >
            <Text className="text-5xl">♟</Text>
          </LinearGradient>
          <Text className="text-white text-4xl font-black tracking-tighter">
            Checkmate <Text className="text-primary">X</Text>
          </Text>
          <Text className="text-gray-500 font-bold mt-2">Elite Chess Intelligence</Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          <View className="bg-dark-card border border-dark-border rounded-3xl flex-row items-center px-5 py-4 mb-3">
            <Mail size={18} color="#475569" />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#475569"
              className="flex-1 text-white ml-4 font-bold"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="bg-dark-card border border-dark-border rounded-3xl flex-row items-center px-5 py-4">
            <Lock size={18} color="#475569" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#475569"
              className="flex-1 text-white ml-4 font-bold"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity className="mt-3 items-end">
            <Text className="text-primary font-black text-xs uppercase tracking-widest">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Submit */}
        <TouchableOpacity 
          onPress={handleLogin}
          disabled={loading}
          className="rounded-3xl overflow-hidden mb-8"
        >
          <LinearGradient
            colors={['#8b5cf6', '#6366f1']}
            className="py-5 items-center flex-row justify-center"
          >
            {loading ? <ActivityIndicator color="white" /> : (
              <>
                <Text className="text-white font-black text-lg mr-2">LOG IN</Text>
                <LogIn color="white" size={20} />
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Alternative */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-[1px] bg-dark-border" />
          <Text className="text-gray-500 font-black text-[10px] mx-4 uppercase tracking-widest">Social Gateway</Text>
          <View className="flex-1 h-[1px] bg-dark-border" />
        </View>

        <View className="flex-row gap-x-3 mb-10">
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)')}
            className="flex-1 bg-dark-card border border-dark-border py-4 rounded-3xl items-center flex-row justify-center"
          >
            <Globe color="white" size={18} className="mr-2" />
            <Text className="text-white font-bold ml-2">Google</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => router.replace('/(tabs)')}
            className="flex-1 bg-dark-card border border-dark-border py-4 rounded-3xl items-center flex-row justify-center"
          >
            <User color="white" size={18} className="mr-2" />
            <Text className="text-white font-bold ml-2">Github</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500 font-bold">New to the elite? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text className="text-primary font-black">Join Now</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
