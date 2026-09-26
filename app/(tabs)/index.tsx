import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton, ScreenHeader } from '@/components/UI';
import { useWallet } from '@/context/WalletContext';
import { colors } from '@/theme/colors';

export default function HomeScreen() {
  const { balance, lifetime, refunds } = useWallet();
  const latest = refunds[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader eyebrow="Kaucja Wallet" title="Oddajesz. Dostajesz. Bez papierka." />

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Do wypłaty</Text>
          <Text style={styles.balance}>{balance.toFixed(2).replace('.', ',')} zł</Text>
          <Text style={styles.balanceHint}>Demo: środki pojawiają się po potwierdzeniu sesji przez operatora RVM.</Text>
          <PrimaryButton label="Zeskanuj kaucjomat" onPress={() => router.push('/scan')} />
        </View>

        <View style={styles.statsRow}>
          <Card style={{ flex: 1 }}>
            <Text style={styles.statLabel}>Łącznie odzyskane</Text>
            <Text style={styles.statValue}>{lifetime.toFixed(2).replace('.', ',')} zł</Text>
          </Card>
          <Card style={{ flex: 1 }}>
            <Text style={styles.statLabel}>Zwroty</Text>
            <Text style={styles.statValue}>{refunds.length}</Text>
          </Card>
        </View>

        <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Jak to działa</Text><Text style={styles.sectionBadge}>3 kroki</Text></View>
        <Card>
          {[
            ['1', 'Skanujesz QR', 'Łączysz aplikację z konkretną sesją kaucjomatu.'],
            ['2', 'Wrzucasz opakowania', 'Maszyna je rozpoznaje i rozlicza w systemie operatora.'],
            ['3', 'Dostajesz zwrot', 'Po potwierdzeniu sesji pojawia się cyfrowy zwrot — bez bonu.']
          ].map(([n, t, d], i) => (
            <View key={n} style={[styles.step, i < 2 && styles.stepBorder]}>
              <View style={styles.stepNo}><Text style={styles.stepNoText}>{n}</Text></View>
              <View style={{ flex: 1 }}><Text style={styles.stepTitle}>{t}</Text><Text style={styles.stepDesc}>{d}</Text></View>
            </View>
          ))}
        </Card>

        {latest ? (
          <>
            <Text style={styles.sectionTitle}>Ostatni zwrot</Text>
            <Card>
              <View style={styles.row}><View><Text style={styles.itemTitle}>{latest.pointName}</Text><Text style={styles.itemMeta}>{new Date(latest.createdAt).toLocaleDateString('pl-PL')} · {latest.operator}</Text></View><Text style={styles.amount}>+{latest.amount.toFixed(2).replace('.', ',')} zł</Text></View>
            </Card>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 32, gap: 18 },
  balanceCard: { backgroundColor: colors.lime, borderRadius: 30, padding: 22, gap: 12 },
  balanceLabel: { fontSize: 13, fontWeight: '800', color: colors.primaryDark, textTransform: 'uppercase', letterSpacing: 0.8 },
  balance: { fontSize: 48, lineHeight: 52, fontWeight: '900', color: colors.black, letterSpacing: -2 },
  balanceHint: { fontSize: 13, lineHeight: 19, color: '#355240', marginBottom: 2 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statLabel: { fontSize: 12, color: colors.muted, fontWeight: '700' },
  statValue: { marginTop: 8, fontSize: 24, fontWeight: '900', color: colors.text },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 3 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: colors.text, letterSpacing: -0.5 },
  sectionBadge: { fontSize: 12, fontWeight: '800', color: colors.primary, backgroundColor: colors.mint, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  step: { flexDirection: 'row', gap: 13, paddingVertical: 14 },
  stepBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  stepNo: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center' },
  stepNoText: { color: 'white', fontWeight: '900' },
  stepTitle: { fontSize: 15, fontWeight: '900', color: colors.text, marginBottom: 3 },
  stepDesc: { fontSize: 13, lineHeight: 18, color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  itemTitle: { fontWeight: '900', color: colors.text, fontSize: 15 },
  itemMeta: { color: colors.muted, marginTop: 4, fontSize: 12 },
  amount: { fontWeight: '900', color: colors.primaryDark, fontSize: 18 }
});
