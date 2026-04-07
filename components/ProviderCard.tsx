import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider } from '../data/providers';
import { Colors, Radius } from '../data/theme';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Healthcare: { bg: '#E8F5E9', text: '#2E7D32' },
  Fitness:    { bg: '#E3F2FD', text: '#1565C0' },
  Wellness:   { bg: '#F3E5F5', text: '#6A1B9A' },
  Beauty:     { bg: '#FCE4EC', text: '#AD1457' },
};

export default function ProviderCard({ provider, onPress }: { provider: Provider; onPress: () => void }) {
  const cat = CATEGORY_COLORS[provider.category] ?? { bg: Colors.primaryLight, text: Colors.primary };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <Image source={{ uri: provider.image }} style={styles.img} />
      <View style={styles.info}>
        <View style={[styles.badge, { backgroundColor: cat.bg }]}>
          <Text style={[styles.badgeText, { color: cat.text }]}>{provider.category}</Text>
        </View>
        <Text style={styles.name} numberOfLines={1}>{provider.name}</Text>
        <Text style={styles.spec}>{provider.specialty}</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name="star" size={13} color="#F59E0B" />
          <Text style={styles.rating}>{provider.rating}</Text>
          <Text style={styles.reviews}>({provider.reviews})</Text>
          <View style={styles.dot} />
          <Text style={styles.fee}>{provider.fee}/session</Text>
        </View>
      </View>
      <View style={styles.chevron}>
        <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    borderRadius: Radius.lg, padding: 14, marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  img: { width: 68, height: 68, borderRadius: Radius.md, backgroundColor: Colors.border },
  info: { flex: 1, marginLeft: 13 },
  badge: { alignSelf: 'flex-start', borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 2, marginBottom: 4 },
  badgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  spec: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 12, fontWeight: '700', color: Colors.text },
  reviews: { fontSize: 11, color: Colors.textLight },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: Colors.textLight },
  fee: { fontSize: 12, fontWeight: '600', color: Colors.primary },
  chevron: { marginLeft: 6 },
});
