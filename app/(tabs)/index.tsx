import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader, PrimaryButton } from '@/components/UI';
import { useWallet } from '@/context/WalletContext';
import { colors } from '@/theme/colors';

export default function HomeScreen() {
  const { balance, lifetime, refunds } = useWallet();
  const latest = refunds[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BrandHeader />

        <View style={styles.hero}>
          <Text style={styles.heroKicker}>Twoja kaucja</Text>
          <Text style={styles.heroAmount}>{balance.toFixed(2).replace('.', ',')} zł</Text>
          <Text style={styles.heroText}>Zeskanuj kod przy automacie, oddaj opakowania i odbierz zwrot cyfrowo.</Text>
          <PrimaryButton label="Skanuj kaucjomat" onPress={() => router.push('/scan')} />
        </View>

        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Odzyskane łącznie</Text>
            <Text style={styles.summaryValue}>{lifetime.toFixed(2).replace('.', ',')} zł</Text>
          </View>
          <View>
            <Text style={styles.summaryLabel}>Zwroty</Text>
            <Text style={styles.summaryValue}>{refunds.length}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Jak to działa</Text>
        </View>
        {[
          ['01', 'Skanujesz QR przy automacie'],
          ['02', 'Oddajesz butelki i puszki'],
          ['03', 'Zwrot trafia cyfrowo do aplikacji']
        ].map(([n, label]) => (
          <View key={n} style={styles.stepRow}>
            <Text style={styles.stepNo}>{n}</Text>
            <Text style={styles.stepText}>{label}</Text>
          </View>
        ))}

        <Pressable onPress={() => router.push('/points')} style={styles.pointsLink}>
          <View>
            <Text style={styles.pointsTitle}>Punkty w Warszawie</Text>
            <Text style={styles.pointsMeta}>Biedronka, Lidl, Carrefour i inne</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {latest ? (
          <View>
            <Text style={styles.sectionTitle}>Ostatni zwrot</Text>
            <View style={styles.refundRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{latest.pointName}</Text>
                <Text style={styles.itemMeta}>{new Date(latest.createdAt).toLocaleDateString('pl-PL')} · {latest.operator}</Text>
              </View>
              <Text style={styles.amount}>+{latest.amount.toFixed(2).replace('.', ',')} zł</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 34, gap: 24 },
  hero: { paddingTop: 10 },
  heroKicker: { fontSize: 13, fontWeight: '800', color: colors.primary, marginBottom: 3 },
  heroAmount: { fontSize: 44, lineHeight: 50, fontWeight: '900', color: colors.text, letterSpacing: -1.8 },
  heroText: { color: colors.muted, fontSize: 15, lineHeight: 21, marginTop: 8, marginBottom: 18, maxWidth: 350 },
  summaryRow: { flexDirection: 'row', gap: 40 },
  summaryLabel: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  summaryValue: { color: colors.text, fontSize: 21, fontWeight: '900', marginTop: 4 },
  divider: { height: 1, backgroundColor: colors.border },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 22, lineHeight: 26, fontWeight: '900', color: colors.text, letterSpacing: -0.5 },
  stepRow: { minHeight: 50, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 16 },
  stepNo: { width: 30, color: colors.primary, fontSize: 12, fontWeight: '900' },
  stepText: { flex: 1, color: colors.text, fontSize: 15, fontWeight: '700' },
  pointsLink: { minHeight: 76, paddingVertical: 14, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center' },
  pointsTitle: { color: colors.text, fontSize: 17, fontWeight: '900' },
  pointsMeta: { color: colors.muted, fontSize: 12, marginTop: 4 },
  arrow: { marginLeft: 'auto', color: colors.text, fontSize: 32, lineHeight: 32, fontWeight: '300' },
  refundRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 14 },
  itemTitle: { fontWeight: '900', color: colors.text, fontSize: 15 },
  itemMeta: { color: colors.muted, marginTop: 4, fontSize: 12 },
  amount: { fontWeight: '900', color: colors.primaryDark, fontSize: 18 }
});
