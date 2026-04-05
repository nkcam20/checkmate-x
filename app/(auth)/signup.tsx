import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User } from 'lucide-react-native';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !username) return;
    setLoading(true);
    try {
      // Firebase: createUserWithEmailAndPassword(auth, email, password)
      // Then update profile with displayName
      router.replace('/(tabs)');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { icon: <User size={18} color="#64748b" />, placeholder: 'Username', value: username, setter: setUsername, secure: false, type: 'default' as const },
    { icon: <Mail size={18} color="#64748b" />, placeholder: 'Email', value: email, setter: setEmail, secure: false, type: 'email-address' as const },
    { icon: <Lock size={18} color="#64748b" />, placeholder: 'Password (min 8 chars)', value: password, setter: setPassword, secure: true, type: 'default' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: 28, justifyContent: 'center' }}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: 44 }}>
          <View style={{
            backgroundColor: '#1e293b', padding: 22, borderRadius: 36, marginBottom: 20,
            borderWidth: 1, borderColor: '#334155',
          }}>
            <Text style={{ fontSize: 52 }}>♟</Text>
          </View>
          <Text style={{ color: '#fff', fontSize: 30, fontWeight: '800', letterSpacing: -0.5 }}>
            Create Account
          </Text>
          <Text style={{ color: '#64748b', marginTop: 8, fontSize: 14, textAlign: 'center' }}>
            Join thousands of players worldwide
          </Text>
        </View>

        {/* Fields */}
        {fields.map((f, i) => (
          <View key={i} style={{
            backgroundColor: '#1e293b', borderRadius: 20,
            borderWidth: 1, borderColor: '#334155',
            flexDirection: 'row', alignItems: 'center',
            paddingHorizontal: 18, paddingVertical: 16, marginBottom: 12,
          }}>
            {f.icon}
            <TextInput
              placeholder={f.placeholder} placeholderTextColor="#475569"
              style={{ flex: 1, color: '#fff', marginLeft: 12, fontSize: 15 }}
              value={f.value} onChangeText={f.setter}
              secureTextEntry={f.secure}
              keyboardType={f.type}
              autoCapitalize="none"
            />
          </View>
        ))}

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSignup}
          style={{
            backgroundColor: '#fbbf24', paddingVertical: 20, borderRadius: 22,
            alignItems: 'center', marginTop: 12, marginBottom: 24,
            shadowColor: '#fbbf24', shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35, shadowRadius: 12,
          }}
        >
          {loading
            ? <ActivityIndicator color="#000" />
            : <Text style={{ color: '#000', fontWeight: '800', fontSize: 17 }}>Create Account</Text>
          }
        </TouchableOpacity>

        {/* Sign In link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: '#64748b' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: '#fbbf24', fontWeight: '700' }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
