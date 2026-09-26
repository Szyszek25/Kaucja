import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, ScreenHeader } from '@/components/UI';
import { useWallet } from '@/context/WalletContext';
import { colors } from '@/theme/colors';

export default function HistoryScreen() {
  const { refunds } = useWallet();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader eyebrow="Historia" title="Twoje zwroty" />
        {refunds.map((r) => (
          <Card key={r.id}>
            <View style={styles.row}><View style={{ flex: 1 }}><Text style={styles.title}>{r.pointName}</Text><Text style={styles.meta}>{new Date(r.createdAt).toLocaleString('pl-PL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</Text></View><Text style={styles.amount}>+{r.amount.toFixed(2).replace('.', ',')} zł</Text></View>
            <View style={styles.detailRow}><Text style={styles.detail}>{r.counts.PET} PET</Text><Text style={styles.detail}>{r.counts.CAN} puszek</Text><Text style={styles.detail}>{r.counts.GLASS} szkła</Text><Text style={styles.paid}>✓ wypłacono</Text></View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.bg }, content: { padding: 20, gap: 14, paddingBottom: 30 }, row: { flexDirection: 'row', alignItems: 'center', gap: 12 }, title: { fontSize: 16, fontWeight: '900', color: colors.text }, meta: { color: colors.muted, fontSize: 12, marginTop: 4 }, amount: { color: colors.primaryDark, fontWeight: '900', fontSize: 20 }, detailRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }, detail: { color: colors.muted, backgroundColor: colors.bg, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999, fontSize: 11, fontWeight: '700' }, paid: { color: colors.primaryDark, backgroundColor: colors.mint, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 999, fontSize: 11, fontWeight: '800' } });
