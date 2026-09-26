import { useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, PrimaryButton } from '@/components/UI';
import { useWallet } from '@/context/WalletContext';
import { returnPoints } from '@/data/points';
import { colors } from '@/theme/colors';

type Kind = 'PET' | 'CAN' | 'GLASS';
const price: Record<Kind, number> = { PET: 0.5, CAN: 0.5, GLASS: 1 };
const labels: Record<Kind, string> = { PET: 'Butelki PET', CAN: 'Puszki', GLASS: 'Szkło zwrotne' };

export default function SessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const point = returnPoints.find((p) => p.id === id) ?? returnPoints[0];
  const { addRefund } = useWallet();
  const [counts, setCounts] = useState<Record<Kind, number>>({ PET: 0, CAN: 0, GLASS: 0 });
  const [finished, setFinished] = useState(false);
  const amount = useMemo(() => (Object.keys(counts) as Kind[]).reduce((sum, key) => sum + counts[key] * price[key], 0), [counts]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const change = (kind: Kind, delta: number) => setCounts((c) => ({ ...c, [kind]: Math.max(0, c[kind] + delta) }));
  const complete = () => {
    if (!total || finished) return;
    setFinished(true);
    addRefund({ pointName: point.name, operator: point.operator, counts, amount, status: 'paid' });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.top}><Pressable onPress={() => router.back()}><Text style={styles.close}>×</Text></Pressable><Text style={styles.topLabel}>SESJA RVM</Text><View style={{ width: 38 }} /></View>
        {!finished ? (
          <>
            <Text style={styles.title}>Połączono z kaucjomatem ✓</Text>
            <Text style={styles.desc}>{point.name}{'\n'}{point.address}</Text>
            <Card style={styles.statusCard}>
              <View style={styles.dot} /><View style={{ flex: 1 }}><Text style={styles.statusTitle}>Sesja aktywna</Text><Text style={styles.statusDesc}>W produkcji liczby przychodzą z API operatora. W tym MVP dodajesz je ręcznie.</Text></View>
            </Card>
            <Text style={styles.section}>Symulator przyjętych opakowań</Text>
            {(Object.keys(counts) as Kind[]).map((kind) => (
              <Card key={kind} style={styles.counterCard}>
                <View style={{ flex: 1 }}><Text style={styles.counterTitle}>{labels[kind]}</Text><Text style={styles.counterSub}>{price[kind].toFixed(2).replace('.', ',')} zł / szt.</Text></View>
                <View style={styles.counter}><Pressable onPress={() => change(kind, -1)} style={styles.counterBtn}><Text style={styles.counterBtnText}>−</Text></Pressable><Text style={styles.count}>{counts[kind]}</Text><Pressable onPress={() => change(kind, 1)} style={styles.counterBtn}><Text style={styles.counterBtnText}>+</Text></Pressable></View>
              </Card>
            ))}
            <View style={styles.summary}><Text style={styles.summaryLabel}>{total} opakowań</Text><Text style={styles.summaryAmount}>{amount.toFixed(2).replace('.', ',')} zł</Text></View>
            <PrimaryButton label={total ? `Potwierdź zwrot ${amount.toFixed(2).replace('.', ',')} zł` : 'Dodaj opakowania'} onPress={complete} disabled={!total} />
          </>
        ) : (
          <View style={styles.successWrap}>
            <View style={styles.successIcon}><Text style={styles.successIconText}>✓</Text></View>
            <Text style={styles.successTitle}>Zwrot potwierdzony</Text>
            <Text style={styles.successAmount}>+{amount.toFixed(2).replace('.', ',')} zł</Text>
            <Text style={styles.successText}>Operator potwierdził sesję. W docelowym modelu wypłata byłaby realizowana bezpośrednio przez operatora lub licencjonowanego partnera płatniczego.</Text>
            <PrimaryButton label="Wróć do portfela" onPress={() => router.replace('/')} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg }, content: { padding: 20, gap: 15, paddingBottom: 36 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, close: { fontSize: 34, lineHeight: 38, color: colors.text }, topLabel: { fontSize: 11, fontWeight: '900', letterSpacing: 1.5, color: colors.muted },
  title: { fontSize: 31, lineHeight: 35, fontWeight: '900', color: colors.text, letterSpacing: -1, marginTop: 6 }, desc: { color: colors.muted, lineHeight: 20 },
  statusCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: colors.mint }, dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary, marginTop: 4 }, statusTitle: { fontWeight: '900', color: colors.primaryDark }, statusDesc: { color: '#496556', fontSize: 12, lineHeight: 18, marginTop: 4 },
  section: { fontSize: 18, fontWeight: '900', color: colors.text, marginTop: 4 }, counterCard: { flexDirection: 'row', alignItems: 'center', gap: 10 }, counterTitle: { fontWeight: '900', color: colors.text, fontSize: 15 }, counterSub: { color: colors.muted, fontSize: 12, marginTop: 4 }, counter: { flexDirection: 'row', alignItems: 'center', gap: 13 }, counterBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center' }, counterBtnText: { color: 'white', fontSize: 22, fontWeight: '800', lineHeight: 24 }, count: { width: 22, textAlign: 'center', fontWeight: '900', fontSize: 18 },
  summary: { backgroundColor: colors.lime, borderRadius: 24, padding: 19, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, summaryLabel: { fontWeight: '800', color: colors.primaryDark }, summaryAmount: { fontSize: 28, fontWeight: '900', color: colors.black },
  successWrap: { flex: 1, alignItems: 'center', paddingVertical: 58, gap: 15 }, successIcon: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center' }, successIconText: { fontSize: 44, fontWeight: '900', color: colors.primaryDark }, successTitle: { fontSize: 30, fontWeight: '900', color: colors.text, marginTop: 8 }, successAmount: { fontSize: 48, fontWeight: '900', color: colors.primaryDark, letterSpacing: -2 }, successText: { textAlign: 'center', color: colors.muted, lineHeight: 21, marginBottom: 10 }
});
