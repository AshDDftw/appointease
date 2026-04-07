import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { PROVIDERS } from '../../data/providers';
import Button from '../../components/Button';
import { Colors, Radius } from '../../data/theme';

export default function ProviderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const p = PROVIDERS.find(x => x.id === id);
  if (!p) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.headerBg}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={21} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>Provider Profile</Text>
          <View style={{ width: 38 }} />
        </LinearGradient>

        <View style={styles.profileCard}>
          <Image source={{ uri: p.image }} style={styles.avatar} />
          <View style={styles.catBadge}>
            <Text style={styles.catText}>{p.category}</Text>
          </View>
          <Text style={styles.name}>{p.name}</Text>
          <Text style={styles.spec}>{p.specialty}</Text>
          <View style={styles.stars}>
            {[1,2,3,4,5].map(i => (
              <MaterialCommunityIcons key={i}
                name={i <= Math.floor(p.rating) ? 'star' : 'star-outline'}
                size={17} color="#F59E0B"
              />
            ))}
            <Text style={styles.ratingText}>{p.rating} · {p.reviews} reviews</Text>
          </View>
          <View style={styles.locRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.locText}>{p.location}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { icon: 'briefcase-outline' as const, label: 'Experience', val: p.experience },
            { icon: 'star-outline' as const, label: 'Rating', val: `${p.rating}/5` },
            { icon: 'currency-usd' as const, label: 'Fee', val: p.fee },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <View style={styles.statItem}>
                <View style={styles.statIcon}>
                  <MaterialCommunityIcons name={s.icon} size={17} color={Colors.primary} />
                </View>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              {i < arr.length - 1 && <View style={styles.statDiv} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.about}>{p.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Working Days</Text>
          <View style={styles.days}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => {
              const off = d === 'Sat' || d === 'Sun';
              return (
                <View key={d} style={[styles.day, off && styles.dayOff]}>
                  <Text style={[styles.dayText, off && styles.dayOffText]}>{d}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.feeWrap}>
          <Text style={styles.feeLabel}>Session Fee</Text>
          <Text style={styles.feeVal}>{p.fee}</Text>
        </View>
        <Button title="Book Appointment" onPress={() => router.push(`/book/${p.id}`)} style={styles.bookBtn} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 110 },
  headerBg: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 16, paddingBottom: 52, paddingHorizontal: 18,
  },
  back: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerLabel: { fontSize: 16, fontWeight: '700', color: '#fff' },
  profileCard: {
    backgroundColor: Colors.surface, marginHorizontal: 20, marginTop: -32,
    borderRadius: Radius.xl, padding: 22, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1, shadowRadius: 16, elevation: 6,
  },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: Colors.primary, marginBottom: 12 },
  catBadge: {
    backgroundColor: Colors.primaryLight, borderRadius: Radius.full,
    paddingHorizontal: 12, paddingVertical: 4, marginBottom: 8,
  },
  catText: { fontSize: 11, color: Colors.primary, fontWeight: '700', letterSpacing: 0.4 },
  name: { fontSize: 20, fontWeight: '800', color: Colors.text, marginBottom: 3 },
  spec: { fontSize: 13, color: Colors.textSecondary, marginBottom: 10 },
  stars: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 },
  ratingText: { fontSize: 12, color: Colors.textSecondary, marginLeft: 5 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locText: { fontSize: 13, color: Colors.textSecondary },
  statsRow: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    marginHorizontal: 20, marginTop: 14, borderRadius: Radius.lg, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statIcon: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center',
  },
  statVal: { fontSize: 14, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: 11, color: Colors.textSecondary },
  statDiv: { width: 1, backgroundColor: Colors.border },
  section: { marginHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.text, marginBottom: 10 },
  about: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  days: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  day: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: Radius.md, backgroundColor: Colors.primaryLight },
  dayOff: { backgroundColor: Colors.border },
  dayText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  dayOffText: { color: Colors.textLight },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.surface, paddingHorizontal: 20,
    paddingVertical: 16, paddingBottom: 24,
    borderTopWidth: 1, borderTopColor: Colors.border,
    flexDirection: 'row', alignItems: 'center', gap: 16,
  },
  feeWrap: { flex: 0 },
  feeLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
  feeVal: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  bookBtn: { flex: 1 },
});
