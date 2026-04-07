import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../data/theme';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
}

export default function Button({ title, onPress, loading, disabled, variant = 'primary', style }: Props) {
  if (variant === 'outline') {
    return (
      <TouchableOpacity style={[styles.outline, style]} onPress={onPress} disabled={disabled || loading} activeOpacity={0.75}>
        <Text style={styles.outlineText}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (variant === 'ghost') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.7} style={style}>
        <Text style={styles.ghostText}>{title}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.85} style={style}>
      <LinearGradient
        colors={disabled ? ['#C4C4C4', '#A8A8A8'] : [Colors.primary, Colors.primaryDark]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading
          ? <ActivityIndicator color="#fff" size="small" />
          : <Text style={styles.primaryText}>{title}</Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradient: { paddingVertical: 15, paddingHorizontal: 24, borderRadius: Radius.full, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  outline: {
    paddingVertical: 14, paddingHorizontal: 24, borderRadius: Radius.full,
    borderWidth: 2, borderColor: Colors.primary, alignItems: 'center',
  },
  outlineText: { color: Colors.primary, fontSize: 16, fontWeight: '700' },
  ghostText: { color: Colors.primary, fontSize: 15, fontWeight: '600' },
});
