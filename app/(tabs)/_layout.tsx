import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '@/theme/colors';

const Icon = ({ text, focused }: { text: string; focused: boolean }) => <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.55 }}>{text}</Text>;

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primaryDark,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { height: 84, paddingTop: 8, paddingBottom: 14, borderTopColor: colors.border, backgroundColor: '#FCFEFB' },
      tabBarLabelStyle: { fontWeight: '800', fontSize: 11 }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Start', tabBarIcon: ({ focused }) => <Icon text="⌂" focused={focused} /> }} />
      <Tabs.Screen name="scan" options={{ title: 'Skanuj', tabBarIcon: ({ focused }) => <Icon text="▣" focused={focused} /> }} />
      <Tabs.Screen name="points" options={{ title: 'Punkty', tabBarIcon: ({ focused }) => <Icon text="⌖" focused={focused} /> }} />
      <Tabs.Screen name="history" options={{ title: 'Zwroty', tabBarIcon: ({ focused }) => <Icon text="↻" focused={focused} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: ({ focused }) => <Icon text="●" focused={focused} /> }} />
    </Tabs>
  );
}
