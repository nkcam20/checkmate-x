import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, LogIn } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      // Firebase auth: signInWithEmailAndPassword(auth, email, password)
      // For now, navigate directly
      router.replace('/(tabs)');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: 28, justifyContent: 'center' }}
      >
        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          <View style={{
            backgroundColor: '#fbbf24', padding: 22, borderRadius: 36,
            marginBottom: 20, shadowColor: '#fbbf24',
            shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 20,
          }}>
            <Text style={{ fontSize: 52 }}>♞</Text>
          </View>
          <Text style={{ color: '#fff', fontSize: 34, fontWeight: '800', letterSpacing: -1 }}>
            ChessApp
          </Text>
          <Text style={{ color: '#64748b', marginTop: 6, fontSize: 15 }}>
            Sign in to your account
          </Text>
        </View>

        {/* Inputs */}
        <View style={{
          backgroundColor: '#1e293b', borderRadius: 20,
          borderWidth: 1, borderColor: '#334155',
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 18, paddingVertical: 16, marginBottom: 12,
        }}>
          <Mail size={18} color="#64748b" />
          <TextInput
            placeholder="Email" placeholderTextColor="#475569"
            style={{ flex: 1, color: '#fff', marginLeft: 12, fontSize: 15 }}
            value={email} onChangeText={setEmail}
            keyboardType="email-address" autoCapitalize="none"
          />
        </View>

        <View style={{
          backgroundColor: '#1e293b', borderRadius: 20,
          borderWidth: 1, borderColor: '#334155',
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 18, paddingVertical: 16, marginBottom: 8,
        }}>
          <Lock size={18} color="#64748b" />
          <TextInput
            placeholder="Password" placeholderTextColor="#475569"
            style={{ flex: 1, color: '#fff', marginLeft: 12, fontSize: 15 }}
            value={password} onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 28 }}>
          <Text style={{ color: '#fbbf24', fontWeight: '700' }}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#fbbf24', paddingVertical: 20, borderRadius: 22,
            alignItems: 'center', marginBottom: 20,
            shadowColor: '#fbbf24', shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35, shadowRadius: 12,
          }}
        >
          {loading
            ? <ActivityIndicator color="#000" />
            : <Text style={{ color: '#000', fontWeight: '800', fontSize: 17 }}>Sign In</Text>
          }
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#1e293b' }} />
          <Text style={{ color: '#475569', marginHorizontal: 12, fontWeight: '600', fontSize: 12 }}>
            OR CONTINUE WITH
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#1e293b' }} />
        </View>

        {/* Social Buttons */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 36 }}>
          {['G  Google', '⊕  Guest'].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => router.replace('/(tabs)')}
              style={{
                flex: 1, backgroundColor: '#1e293b', paddingVertical: 16,
                borderRadius: 18, alignItems: 'center',
                borderWidth: 1, borderColor: '#334155',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Up Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: '#64748b' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={{ color: '#fbbf24', fontWeight: '700' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
