import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Colors, Radius } from '../../data/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function handleLogin() {
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.hero}>
          <View style={styles.logoWrap}>
            <MaterialCommunityIcons name="calendar-check" size={38} color="#fff" />
          </View>
          <Text style={styles.appName}>AppointEase</Text>
          <Text style={styles.tagline}>Your appointments, simplified</Text>
        </LinearGradient>

        <View style={styles.sheet}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.sub}>Sign in to continue</Text>

          <Input label="Email" icon="email-outline" placeholder="you@example.com"
            value={email} onChangeText={setEmail} error={errors.email} keyboardType="email-address" />
          <Input label="Password" icon="lock-outline" placeholder="Your password"
            value={password} onChangeText={setPassword} error={errors.password} isPassword />

          <Button title="Sign In" onPress={handleLogin} loading={loading} style={{ marginTop: 6 }} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1 },
  hero: { paddingTop: 80, paddingBottom: 56, alignItems: 'center' },
  logoWrap: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
  },
  appName: { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: 0.4 },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.78)', marginTop: 5 },
  sheet: {
    flex: 1, backgroundColor: Colors.surface,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    marginTop: -22, padding: 28, paddingTop: 34,
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  sub: { fontSize: 14, color: Colors.textSecondary, marginBottom: 26 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  footerText: { fontSize: 14, color: Colors.textSecondary },
  link: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
});
