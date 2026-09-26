import { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandHeader, Chip } from '@/components/UI';
import { returnPoints } from '@/data/points';
import { colors } from '@/theme/colors';

const brands = ['Wszystkie', 'Biedronka', 'Lidl', 'Carrefour', 'Kaufland', 'Auchan'] as const;

export default function PointsScreen() {
  const [brand, setBrand] = useState<(typeof brands)[number]>('Wszystkie');
  const filtered = useMemo(() => brand === 'Wszystkie' ? returnPoints : returnPoints.filter((p) => p.brand === brand), [brand]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BrandHeader />

        <View style={styles.headingBlock}>
          <Text style={styles.title}>Mapa zwrotów</Text>
          <Text style={styles.subtitle}>Warszawa · prawdziwe lokalizacje punktów</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {brands.map((item) => (
            <Pressable key={item} onPress={() => setBrand(item)}>
              <Chip active={brand === item}>{item}</Chip>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.mapWrap}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 52.2368,
              longitude: 20.944,
              latitudeDelta: 0.055,
              longitudeDelta: 0.075
            }}
            showsCompass={false}
            showsMyLocationButton={false}
            toolbarEnabled={false}
          >
            {filtered.map((point) => (
              <Marker
                key={point.id}
                coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                title={point.name}
                description={`${point.address}, ${point.city}`}
                onCalloutPress={() => router.push(`/session/${point.id}`)}
              >
                <View style={[styles.pin, point.status === 'busy' && styles.pinBusy]}>
                  <Text style={styles.pinText}>{point.brand.slice(0, 1)}</Text>
                </View>
              </Marker>
            ))}
          </MapView>

          <View style={styles.mapLegend}>
            <Text style={styles.mapLegendText}>{filtered.length} punktów</Text>
          </View>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>Lokalizacje i współrzędne są oparte o publiczne dane punktów. Status cyfrowej integracji w aplikacji jest demonstracyjny.</Text>
        </View>

        <View style={styles.list}>
          {filtered.map((point, index) => (
            <Pressable
              key={point.id}
              onPress={() => router.push(`/session/${point.id}`)}
              style={[styles.row, index !== filtered.length - 1 && styles.rowBorder]}
            >
              <View style={styles.brandBadge}>
                <Text style={styles.brandLetter}>{point.brand.slice(0, 1)}</Text>
              </View>
              <View style={styles.main}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{point.name}</Text>
                  <Text style={[styles.status, point.status === 'busy' && styles.busy]}>
                    {point.status === 'online' ? 'Działa' : 'Zajęty'}
                  </Text>
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
  content: { paddingTop: 8, paddingBottom: 34 },
  headingBlock: { paddingHorizontal: 20, marginTop: 24, marginBottom: 14 },
  title: { color: colors.text, fontSize: 26, lineHeight: 31, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5 },
  filterRow: { gap: 7, paddingHorizontal: 20, paddingBottom: 16 },
  mapWrap: { height: 360, marginHorizontal: 12, borderRadius: 18, overflow: 'hidden', backgroundColor: '#DDE8DE' },
  map: { flex: 1 },
  pin: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryDark,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pinBusy: { backgroundColor: '#A86D22' },
  pinText: { color: colors.lime, fontSize: 14, fontWeight: '900' },
  mapLegend: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    backgroundColor: 'rgba(255,255,255,.94)',
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 7
  },
  mapLegendText: { color: colors.text, fontSize: 11, fontWeight: '900' },
  notice: { marginHorizontal: 20, borderLeftWidth: 3, borderLeftColor: colors.primary, paddingLeft: 11, marginTop: 16, marginBottom: 4 },
  noticeText: { color: colors.muted, fontSize: 11, lineHeight: 16 },
  list: { marginTop: 8, paddingHorizontal: 20 },
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
