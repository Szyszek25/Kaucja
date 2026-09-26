import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader, Chip } from '@/components/UI';
import { returnPoints } from '@/data/points';
import { colors } from '@/theme/colors';

export default function PointsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BrandHeader />
        <View style={styles.headingBlock}>
          <Text style={styles.title}>Punkty zwrotu</Text>
          <Text style={styles.subtitle}>Warszawa · najbliższe miejsca</Text>
        </View>

        <View style={styles.filterRow}>
          <Chip active>Wszystkie</Chip>
          <Chip>Biedronka</Chip>
          <Chip>Lidl</Chip>
          <Chip>Carrefour</Chip>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>Adresy sklepów są prawdziwe. Status integracji i dostępność cyfrowego zwrotu są w MVP demonstracyjne.</Text>
        </View>

        <View style={styles.list}>
          {returnPoints.map((point, index) => (
            <Pressable key={point.id} onPress={() => router.push(`/session/${point.id}`)} style={[styles.row, index !== returnPoints.length - 1 && styles.rowBorder]}>
              <View style={styles.brandBadge}><Text style={styles.brandLetter}>{point.brand.slice(0, 1)}</Text></View>
              <View style={styles.main}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{point.name}</Text>
                  <Text style={[styles.status, point.status === 'busy' && styles.busy]}>{point.status === 'online' ? 'Działa' : 'Zajęty'}</Text>
                </View>
                <Text style={styles.address}>{point.address}, {point.city}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.meta}>{point.distanceKm.toFixed(1).replace('.', ',')} km</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.meta}>{point.types.join(' · ')}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 34 },
  headingBlock: { marginTop: 24, marginBottom: 14 },
  title: { color: colors.text, fontSize: 26, lineHeight: 31, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  notice: { borderLeftWidth: 3, borderLeftColor: colors.primary, paddingLeft: 11, marginBottom: 8 },
  noticeText: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  list: { marginTop: 8 },
  row: { minHeight: 92, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  brandBadge: { width: 40, height: 40, borderRadius: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  brandLetter: { color: colors.primaryDark, fontSize: 18, fontWeight: '900' },
  main: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { flex: 1, color: colors.text, fontSize: 15, lineHeight: 20, fontWeight: '900' },
  address: { color: colors.muted, fontSize: 12, marginTop: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 5 },
  meta: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  dot: { color: colors.muted, fontSize: 11 },
  status: { color: colors.primaryDark, fontSize: 10, fontWeight: '900', backgroundColor: colors.mint, paddingHorizontal: 7, paddingVertical: 4, borderRadius: 7 },
  busy: { backgroundColor: '#FFF0DA', color: '#8A561A' },
  chevron: { color: colors.muted, fontSize: 27, fontWeight: '300' }
});
