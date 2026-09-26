import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Chip, ScreenHeader } from '@/components/UI';
import { returnPoints } from '@/data/points';
import { colors } from '@/theme/colors';

export default function PointsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader eyebrow="W pobliżu" title="Gdzie oddasz opakowania" />
        <View style={styles.fakeMap}><Text style={styles.mapIcon}>⌖</Text><Text style={styles.mapTitle}>Mapa punktów</Text><Text style={styles.mapText}>MVP pokazuje listę. W produkcji podmienimy to na dane operatorów i aktualny status RVM.</Text></View>
        {returnPoints.map((point) => (
          <Pressable key={point.id} onPress={() => router.push(`/session/${point.id}`)}>
            <Card>
              <View style={styles.row}><View style={{ flex: 1 }}><Text style={styles.name}>{point.name}</Text><Text style={styles.meta}>{point.address}</Text><Text style={styles.meta}>{point.distanceKm.toFixed(1).replace('.', ',')} km · {point.operator}</Text></View><View style={[styles.status, point.status === 'busy' && { backgroundColor: '#FFF0DA' }]}><Text style={styles.statusText}>{point.status === 'online' ? 'Działa' : 'Zajęty'}</Text></View></View>
              <View style={styles.chips}>{point.types.map((type) => <Chip key={type}>{type}</Chip>)}</View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.bg }, content: { padding: 20, gap: 14, paddingBottom: 30 }, fakeMap: { minHeight: 180, borderRadius: 28, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center', padding: 28 }, mapIcon: { fontSize: 38, color: colors.lime }, mapTitle: { color: 'white', fontSize: 20, fontWeight: '900', marginTop: 8 }, mapText: { color: 'rgba(255,255,255,.7)', textAlign: 'center', lineHeight: 19, marginTop: 6 }, row: { flexDirection: 'row', gap: 12 }, name: { fontSize: 16, fontWeight: '900', color: colors.text }, meta: { fontSize: 12, color: colors.muted, marginTop: 4 }, status: { backgroundColor: colors.mint, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start' }, statusText: { fontSize: 11, fontWeight: '900', color: colors.primaryDark }, chips: { flexDirection: 'row', gap: 7, marginTop: 14, flexWrap: 'wrap' } });
