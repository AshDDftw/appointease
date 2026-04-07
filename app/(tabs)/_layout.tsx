import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Colors } from '../../data/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textLight,
      tabBarStyle: {
        backgroundColor: Colors.surface,
        borderTopWidth: 0,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        height: Platform.OS === 'android' ? 62 : 82,
        paddingBottom: Platform.OS === 'android' ? 8 : 22,
        paddingTop: 8,
      },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Discover',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-variant" size={size + 2} color={color} />,
      }} />
      <Tabs.Screen name="appointments" options={{
        title: 'Appointments',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar-clock" size={size + 2} color={color} />,
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle" size={size + 2} color={color} />,
      }} />
    </Tabs>
  );
}
