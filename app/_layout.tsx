import { Stack } from 'expo-router';
import { WalletProvider } from '@/context/WalletContext';

export default function RootLayout() {
  return (
    <WalletProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="session/[id]" options={{ presentation: 'modal' }} />
      </Stack>
    </WalletProvider>
  );
}
