import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appointment } from '../context/AuthContext';
import { Colors, Radius } from '../data/theme';

export default function AppointmentCard({ appointment: a, onCancel }: { appointment: Appointment; onCancel?: () => void }) {
  const cancelled = a.status === 'cancelled';
  return (
    <View style={[styles.card, cancelled && styles.dimmed]}>
      <View style={styles.top}>
        <Image source={{ uri: a.providerImage }} style={styles.img} />
        <View style={styles.info}>
          <Text style={styles.name}>{a.providerName}</Text>
          <Text style={styles.spec}>{a.specialty}</Text>
          <View style={[styles.pill, cancelled ? styles.pillCancelled : styles.pillUpcoming]}>
            <View style={[styles.dot, { backgroundColor: cancelled ? Colors.cancelled : Colors.success }]} />
            <Text style={[styles.pillText, { color: cancelled ? Colors.cancelled : Colors.success }]}>
              {cancelled ? 'Cancelled' : 'Upcoming'}
            </Text>
          </View>
        </View>
        <Text style={styles.fee}>{a.fee}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="calendar-outline" size={15} color={Colors.primary} />
          <Text style={styles.metaText}>{a.date}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="clock-outline" size={15} color={Colors.primary} />
          <Text style={styles.metaText}>{a.time}</Text>
        </View>
      </View>

      {!cancelled && onCancel && (
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.75}>
          <MaterialCommunityIcons name="close-circle-outline" size={15} color={Colors.error} />
          <Text style={styles.cancelText}>Cancel Appointment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
  },
  dimmed: { opacity: 0.65 },
  top: { flexDirection: 'row', alignItems: 'flex-start' },
  img: { width: 54, height: 54, borderRadius: Radius.md, backgroundColor: Colors.border },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  spec: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6 },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: Radius.full,
  },
  pillUpcoming: { backgroundColor: '#ECFDF5' },
  pillCancelled: { backgroundColor: '#F3F4F6' },
  dot: { width: 6, height: 6, borderRadius: 3 },
  pillText: { fontSize: 11, fontWeight: '700' },
  fee: { fontSize: 15, fontWeight: '800', color: Colors.primary },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: 12 },
  meta: { flexDirection: 'row', gap: 20 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  cancelBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginTop: 12, paddingVertical: 9,
    borderRadius: Radius.md, borderWidth: 1.5, borderColor: Colors.error,
  },
  cancelText: { color: Colors.error, fontSize: 13, fontWeight: '600' },
});
