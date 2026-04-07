import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Alert, Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { format, addDays, isSameDay } from 'date-fns';
import { PROVIDERS, TIME_SLOTS } from '../../data/providers';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import { Colors, Radius } from '../../data/theme';

export default function BookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { bookAppointment } = useAuth();
  const p = PROVIDERS.find(x => x.id === id);

  const dates = useMemo(() => Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1)), []);
  const [selDate, setSelDate] = useState(dates[0]);
  const [selSlot, setSelSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const slots = useMemo(() => {
    const seed = selDate.getDate();
    return TIME_SLOTS.map((s, i) => ({ ...s, available: s.available && (i + seed) % 3 !== 0 }));
  }, [selDate]);

  if (!p) return null;

  async function handleBook() {
    if (!selSlot) { Alert.alert('Select a time slot', 'Please pick an available time.'); return; }
    setLoading(true);
    try {
      await bookAppointment({
        providerId: p!.id, providerName: p!.name, providerImage: p!.image,
        specialty: p!.specialty, category: p!.category, fee: p!.fee,
        date: format(selDate, 'EEE, MMM d, yyyy'), time: selSlot,
      });
      Alert.alert('🎉 Booked!',
        `Appointment with ${p!.name} confirmed for ${format(selDate, 'MMM d')} at ${selSlot}.`,
        [{ text: 'View Appointments', onPress: () => router.replace('/(tabs)/appointments') }]
      );
    } finally { setLoading(false); }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={21} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={{ width: 38 }} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Provider summary */}
        <View style={styles.provCard}>
          <Image source={{ uri: p.image }} style={styles.provImg} />
          <View style={styles.provInfo}>
            <Text style={styles.provName}>{p.name}</Text>
            <Text style={styles.provSpec}>{p.specialty}</Text>
            <View style={styles.provMeta}>
              <MaterialCommunityIcons name="star" size={12} color="#F59E0B" />
              <Text style={styles.provMetaText}>{p.rating} · {p.location}</Text>
            </View>
          </View>
          <Text style={styles.provFee}>{p.fee}</Text>
        </View>

        {/* Date picker */}
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateRow}>
          {dates.map(d => {
            const sel = isSameDay(d, selDate);
            return (
              <TouchableOpacity
                key={d.toISOString()}
                style={[styles.dateChip, sel && styles.dateChipSel]}
                onPress={() => { setSelDate(d); setSelSlot(null); }}
                activeOpacity={0.75}
              >
                <Text style={[styles.dateDay, sel && styles.dateSel]}>{format(d, 'EEE')}</Text>
                <Text style={[styles.dateNum, sel && styles.dateSel]}>{format(d, 'd')}</Text>
                <Text style={[styles.dateMon, sel && styles.dateSelLight]}>{format(d, 'MMM')}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Time slots */}
        <View style={styles.slotHeader}>
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: Colors.primary }]} /><Text style={styles.legendText}>Free</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: Colors.border }]} /><Text style={styles.legendText}>Taken</Text></View>
          </View>
        </View>

        <View style={styles.slotsGrid}>
          {slots.map(s => {
            const sel = selSlot === s.time;
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.slot, !s.available && styles.slotTaken, sel && styles.slotSel]}
                onPress={() => s.available && setSelSlot(s.time)}
                disabled={!s.available}
                activeOpacity={0.75}
              >
                <MaterialCommunityIcons name="clock-outline" size={13}
                  color={sel ? '#fff' : s.available ? Colors.primary : Colors.textLight} />
                <Text style={[styles.slotText, !s.available && styles.slotTextTaken, sel && styles.slotTextSel]}>
                  {s.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Summary */}
        {selSlot && (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            {[
              { icon: 'account' as const, text: p.name },
              { icon: 'calendar' as const, text: format(selDate, 'EEEE, MMMM d, yyyy') },
              { icon: 'clock-outline' as const, text: selSlot },
              { icon: 'currency-usd' as const, text: `${p.fee} per session` },
            ].map(r => (
              <View key={r.text} style={styles.summaryRow}>
                <MaterialCommunityIcons name={r.icon} size={15} color={Colors.primary} />
                <Text style={styles.summaryText}>{r.text}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={selSlot ? `Confirm · ${selSlot}` : 'Select a Time Slot'}
          onPress={handleBook}
          loading={loading}
          disabled={!selSlot}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 16, paddingBottom: 20, paddingHorizontal: 18,
  },
  back: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#fff' },
  content: { padding: 20, paddingBottom: 110 },
  provCard: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    borderRadius: Radius.lg, padding: 14, marginBottom: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  provImg: { width: 54, height: 54, borderRadius: Radius.md },
  provInfo: { flex: 1, marginLeft: 12 },
  provName: { fontSize: 14, fontWeight: '700', color: Colors.text },
  provSpec: { fontSize: 12, color: Colors.textSecondary, marginVertical: 2 },
  provMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  provMetaText: { fontSize: 11, color: Colors.textSecondary },
  provFee: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.text, marginBottom: 13 },
  dateRow: { gap: 9, paddingBottom: 4, marginBottom: 24 },
  dateChip: {
    width: 60, paddingVertical: 11, borderRadius: Radius.lg,
    backgroundColor: Colors.surface, alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border, gap: 2, elevation: 1,
  },
  dateChipSel: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dateDay: { fontSize: 10, fontWeight: '600', color: Colors.textSecondary },
  dateNum: { fontSize: 19, fontWeight: '800', color: Colors.text },
  dateMon: { fontSize: 9, fontWeight: '600', color: Colors.textLight },
  dateSel: { color: '#fff' },
  dateSelLight: { color: 'rgba(255,255,255,0.72)' },
  slotHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  legend: { flexDirection: 'row', gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { fontSize: 11, color: Colors.textSecondary },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginBottom: 22 },
  slot: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 10, borderRadius: Radius.md,
    backgroundColor: Colors.primaryLight, width: '30.5%', justifyContent: 'center',
  },
  slotTaken: { backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  slotSel: { backgroundColor: Colors.primary },
  slotText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  slotTextTaken: { color: Colors.textLight },
  slotTextSel: { color: '#fff' },
  summary: {
    backgroundColor: Colors.primaryLight, borderRadius: Radius.lg,
    padding: 16, gap: 10, borderWidth: 1.5, borderColor: Colors.primary + '25',
  },
  summaryTitle: { fontSize: 13, fontWeight: '800', color: Colors.primary, marginBottom: 4 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryText: { fontSize: 13, color: Colors.text, fontWeight: '500' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.surface, padding: 18, paddingBottom: 26,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
});
