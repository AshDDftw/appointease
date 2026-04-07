import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import AppointmentCard from '../../components/AppointmentCard';
import { Colors, Radius } from '../../data/theme';

export default function AppointmentsScreen() {
  const { appointments, cancelAppointment } = useAuth();
  const [tab, setTab] = useState<'upcoming' | 'cancelled'>('upcoming');
  const list = appointments.filter(a => a.status === tab);
  const upcomingCount = appointments.filter(a => a.status === 'upcoming').length;

  function confirmCancel(id: string) {
    Alert.alert('Cancel Appointment', 'Are you sure you want to cancel?', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Cancel It', style: 'destructive', onPress: () => cancelAppointment(id) },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <Text style={styles.sub}>{upcomingCount} upcoming</Text>
      </LinearGradient>

      <View style={styles.tabBar}>
        {(['upcoming', 'cancelled'] as const).map(t => {
          const count = appointments.filter(a => a.status === t).length;
          return (
            <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)} activeOpacity={0.75}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
              {count > 0 && (
                <View style={[styles.badge, tab === t && styles.badgeActive]}>
                  <Text style={[styles.badgeText, tab === t && styles.badgeTextActive]}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={list}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onCancel={item.status === 'upcoming' ? () => confirmCancel(item.id) : undefined}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons
              name={tab === 'upcoming' ? 'calendar-blank-outline' : 'calendar-remove-outline'}
              size={62} color={Colors.border}
            />
            <Text style={styles.emptyTitle}>
              {tab === 'upcoming' ? 'No Upcoming Appointments' : 'No Cancelled Appointments'}
            </Text>
            <Text style={styles.emptySub}>
              {tab === 'upcoming' ? 'Book one from the Discover tab' : 'Cancelled bookings appear here'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 16, paddingBottom: 26, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff' },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  tabBar: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    marginHorizontal: 20, marginTop: -16, borderRadius: Radius.lg,
    padding: 4, elevation: 5, marginBottom: 18,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09, shadowRadius: 8,
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', paddingVertical: 10,
    borderRadius: Radius.md, gap: 6,
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: '#fff' },
  badge: {
    backgroundColor: Colors.primaryLight, borderRadius: Radius.full,
    minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5,
  },
  badgeActive: { backgroundColor: 'rgba(255,255,255,0.28)' },
  badgeText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
  badgeTextActive: { color: '#fff' },
  listContent: { paddingHorizontal: 20, paddingBottom: 24 },
  empty: { alignItems: 'center', paddingTop: 52, gap: 10, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary, textAlign: 'center' },
  emptySub: { fontSize: 13, color: Colors.textLight, textAlign: 'center', lineHeight: 20 },
});
