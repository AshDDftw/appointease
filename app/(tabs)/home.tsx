import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import ProviderCard from '../../components/ProviderCard';
import { PROVIDERS, CATEGORIES, CATEGORY_ICONS } from '../../data/providers';
import { Colors, Radius } from '../../data/theme';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const filtered = useMemo(() =>
    PROVIDERS.filter(p =>
      (cat === 'All' || p.category === cat) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.specialty.toLowerCase().includes(search.toLowerCase()))
    ), [search, cat]);

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <ProviderCard provider={item} onPress={() => router.push(`/provider/${item.id}`)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
              <View style={styles.headerRow}>
                <View>
                  <Text style={styles.greeting}>Hello, {user?.name.split(' ')[0]} 👋</Text>
                  <Text style={styles.headerSub}>Find your perfect provider</Text>
                </View>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user?.name[0]?.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.searchBar}>
                <MaterialCommunityIcons name="magnify" size={19} color={Colors.textLight} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search name or specialty..."
                  placeholderTextColor={Colors.textLight}
                  value={search}
                  onChangeText={setSearch}
                />
                {!!search && (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <MaterialCommunityIcons name="close-circle" size={17} color={Colors.textLight} />
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cats}>
              {CATEGORIES.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, cat === c && styles.chipActive]}
                  onPress={() => setCat(c)}
                  activeOpacity={0.75}
                >
                  <MaterialCommunityIcons
                    name={CATEGORY_ICONS[c] as any}
                    size={14}
                    color={cat === c ? '#fff' : Colors.primary}
                  />
                  <Text style={[styles.chipText, cat === c && styles.chipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>{cat === 'All' ? 'All Providers' : cat}</Text>
              <Text style={styles.sectionCount}>{filtered.length} found</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons name="account-search-outline" size={58} color={Colors.border} />
            <Text style={styles.emptyTitle}>No providers found</Text>
            <Text style={styles.emptySub}>Try a different search or category</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 16, paddingBottom: 28, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  greeting: { fontSize: 21, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 3 },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 17, fontWeight: '800', color: '#fff' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.surface, borderRadius: Radius.full,
    paddingHorizontal: 15, paddingVertical: 11,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.text },
  cats: { paddingHorizontal: 20, paddingVertical: 16, gap: 9 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 13, paddingVertical: 8,
    borderRadius: Radius.full, backgroundColor: Colors.primaryLight,
  },
  chipActive: { backgroundColor: Colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  chipTextActive: { color: '#fff' },
  sectionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20, marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.text },
  sectionCount: { fontSize: 13, color: Colors.textSecondary },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  empty: { alignItems: 'center', paddingTop: 44, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
  emptySub: { fontSize: 13, color: Colors.textLight },
});
