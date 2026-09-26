import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '@/components/UI';
import { colors } from '@/theme/colors';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [locked, setLocked] = useState(false);

  const openSession = (raw: string) => {
    if (locked) return;
    setLocked(true);
    const id = raw.startsWith('kaucja://rvm/') ? raw.replace('kaucja://rvm/', '') : 'rvm-001';
    router.push(`/session/${id}`);
    setTimeout(() => setLocked(false), 1200);
  };

  if (!permission) return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permission}>
        <Text style={styles.permissionTitle}>Potrzebujemy aparatu</Text>
        <Text style={styles.permissionText}>Aparat służy tylko do odczytania QR kaucjomatu i przypisania sesji zwrotu do Twojego konta.</Text>
        <PrimaryButton label="Włącz aparat" onPress={requestPermission} />
        <Pressable onPress={() => openSession('kaucja://rvm/rvm-001')}><Text style={styles.demoLink}>Uruchom demo bez aparatu</Text></Pressable>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={({ data }) => openSession(data)}
      />
      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        <View><Text style={styles.kicker}>Połącz sesję</Text><Text style={styles.title}>Zeskanuj QR na kaucjomacie</Text><Text style={styles.subtitle}>Nie skanujesz każdej butelki. QR tylko identyfikuje Ciebie przed rozpoczęciem zwrotu.</Text></View>
        <View style={styles.frame}><View style={[styles.corner, styles.tl]} /><View style={[styles.corner, styles.tr]} /><View style={[styles.corner, styles.bl]} /><View style={[styles.corner, styles.br]} /></View>
        <Pressable style={styles.demoButton} onPress={() => openSession('kaucja://rvm/rvm-001')}><Text style={styles.demoButtonText}>Demo: połącz z kaucjomatem</Text></Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  overlay: { flex: 1, padding: 22, justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.28)' },
  kicker: { color: colors.lime, textTransform: 'uppercase', fontWeight: '900', letterSpacing: 1.2, fontSize: 12, marginTop: 10 },
  title: { color: '#fff', fontSize: 31, lineHeight: 35, fontWeight: '900', letterSpacing: -1, marginTop: 7 },
  subtitle: { color: 'rgba(255,255,255,0.78)', lineHeight: 20, marginTop: 9, maxWidth: 350 },
  frame: { alignSelf: 'center', width: 260, height: 260, position: 'relative' },
  corner: { position: 'absolute', width: 55, height: 55, borderColor: colors.lime },
  tl: { left: 0, top: 0, borderTopWidth: 5, borderLeftWidth: 5, borderTopLeftRadius: 20 },
  tr: { right: 0, top: 0, borderTopWidth: 5, borderRightWidth: 5, borderTopRightRadius: 20 },
  bl: { left: 0, bottom: 0, borderBottomWidth: 5, borderLeftWidth: 5, borderBottomLeftRadius: 20 },
  br: { right: 0, bottom: 0, borderBottomWidth: 5, borderRightWidth: 5, borderBottomRightRadius: 20 },
  demoButton: { backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 18, padding: 17, alignItems: 'center' },
  demoButtonText: { fontWeight: '900', color: colors.black },
  permission: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', padding: 24, gap: 16 },
  permissionTitle: { fontSize: 30, fontWeight: '900', color: colors.text },
  permissionText: { fontSize: 15, lineHeight: 22, color: colors.muted, marginBottom: 8 },
  demoLink: { textAlign: 'center', color: colors.primary, fontWeight: '800', padding: 10 }
});
