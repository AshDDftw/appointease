import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { Colors, Radius } from '../../data/theme';

function Row({ icon, label, value, onPress, danger }: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string; value?: string; onPress?: () => void; danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={onPress ? 0.75 : 1}>
      <View style={[styles.rowIcon, danger && styles.rowIconDanger]}>
        <MaterialCommunityIcons name={icon} size={19} color={danger ? Colors.error : Colors.primary} />
      </View>
      <View style={styles.rowContent}>
        <Text style={[styles.rowLabel, danger && { color: Colors.error }]}>{label}</Text>
        {value && <Text style={styles.rowValue}>{value}</Text>}
      </View>
      {onPress && <MaterialCommunityIcons name="chevron-right" size={19} color={Colors.textLight} />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user, appointments, logout } = useAuth();
  const total = appointments.length;
  const upcoming = appointments.filter(a => a.status === 'upcoming').length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name[0]?.toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </LinearGradient>

        <View style={styles.statsCard}>
          {[
            { label: 'Total', value: total },
            { label: 'Upcoming', value: upcoming },
            { label: 'Completed', value: total - upcoming },
          ].map((s, i, arr) => (
            <React.Fragment key={s.label}>
              <View style={styles.stat}>
                <Text style={styles.statNum}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
              {i < arr.length - 1 && <View style={styles.statDiv} />}
            </React.Fragment>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.card}>
            <Row icon="account-outline" label="Full Name" value={user?.name} />
            <View style={styles.divider} />
            <Row icon="email-outline" label="Email" value={user?.email} />
            {user?.phone && <><View style={styles.divider} /><Row icon="phone-outline" label="Phone" value={user.phone} /></>}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>APP</Text>
          <View style={styles.card}>
            <Row icon="information-outline" label="About AppointEase" value="v1.0.0" />
            <View style={styles.divider} />
            <Row icon="shield-check-outline" label="Privacy Policy" onPress={() => {}} />
            <View style={styles.divider} />
            <Row icon="file-document-outline" label="Terms of Service" onPress={() => {}} />
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 36 }]}>
          <View style={styles.card}>
            <Row icon="logout" label="Sign Out" danger onPress={() =>
              Alert.alert('Sign Out', 'Are you sure?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive', onPress: logout },
              ])
            } />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 22, paddingBottom: 42, alignItems: 'center' },
  avatar: {
    width: 78, height: 78, borderRadius: 39,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.38)',
  },
  avatarText: { fontSize: 30, fontWeight: '800', color: '#fff' },
  name: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 4 },
  email: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  statsCard: {
    flexDirection: 'row', backgroundColor: Colors.surface,
    marginHorizontal: 20, marginTop: -22, borderRadius: Radius.lg,
    padding: 16, elevation: 5, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09, shadowRadius: 8,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 3, fontWeight: '500' },
  statDiv: { width: 1, backgroundColor: Colors.border },
  section: { paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: Colors.textLight, marginBottom: 8, letterSpacing: 0.8 },
  card: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', padding: 15, gap: 13 },
  rowIcon: {
    width: 36, height: 36, borderRadius: Radius.sm,
    backgroundColor: Colors.primaryLight, justifyContent: 'center', alignItems: 'center',
  },
  rowIconDanger: { backgroundColor: '#FEF2F2' },
  rowContent: { flex: 1 },
  rowLabel: { fontSize: 14, fontWeight: '600', color: Colors.text },
  rowValue: { fontSize: 12, color: Colors.textSecondary, marginTop: 1 },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 64 },
});
