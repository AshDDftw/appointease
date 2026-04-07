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
import { Colors } from '../../data/theme';

export default function RegisterScreen() {
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const set = (k: string, v: string) => { setF(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  function validate() {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = 'Full name is required';
    if (!f.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Enter a valid email';
    if (!f.password) e.password = 'Password is required';
    else if (f.password.length < 6) e.password = 'Minimum 6 characters';
    if (f.password !== f.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return !Object.keys(e).length;
  }

  async function handleRegister() {
    if (!validate()) return;
    setLoading(true);
    try {
      await register(f.name.trim(), f.email.trim(), f.password, f.phone.trim() || undefined);
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.hero}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.logoWrap}>
            <MaterialCommunityIcons name="account-plus" size={34} color="#fff" />
          </View>
          <Text style={styles.heroTitle}>Create Account</Text>
          <Text style={styles.heroSub}>Join AppointEase today</Text>
        </LinearGradient>

        <View style={styles.sheet}>
          <Input label="Full Name" icon="account-outline" placeholder="John Doe"
            value={f.name} onChangeText={v => set('name', v)} error={errors.name} autoCapitalize="words" />
          <Input label="Email" icon="email-outline" placeholder="you@example.com"
            value={f.email} onChangeText={v => set('email', v)} error={errors.email} keyboardType="email-address" />
          <Input label="Phone (optional)" icon="phone-outline" placeholder="+1 234 567 8900"
            value={f.phone} onChangeText={v => set('phone', v)} keyboardType="phone-pad" />
          <Input label="Password" icon="lock-outline" placeholder="Min. 6 characters"
            value={f.password} onChangeText={v => set('password', v)} error={errors.password} isPassword />
          <Input label="Confirm Password" icon="lock-check-outline" placeholder="Repeat password"
            value={f.confirm} onChangeText={v => set('confirm', v)} error={errors.confirm} isPassword />

          <Button title="Create Account" onPress={handleRegister} loading={loading} style={{ marginTop: 6 }} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Sign In</Text>
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
  hero: { paddingTop: 60, paddingBottom: 50, alignItems: 'center' },
  back: {
    position: 'absolute', top: 52, left: 18,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center', alignItems: 'center',
  },
  logoWrap: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  heroTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.78)', marginTop: 5 },
  sheet: {
    flex: 1, backgroundColor: Colors.surface,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    marginTop: -22, padding: 28, paddingTop: 32,
  },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 22, marginBottom: 12 },
  footerText: { fontSize: 14, color: Colors.textSecondary },
  link: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
});
