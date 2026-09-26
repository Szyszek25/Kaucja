import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, ScreenHeader } from '@/components/UI';
import { colors } from '@/theme/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader eyebrow="Konto" title="Twój profil" />
        <Card style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>J</Text></View>
          <View><Text style={styles.name}>Jan</Text><Text style={styles.meta}>Konto demo · użytkownik konsumencki</Text></View>
        </Card>
        <Text style={styles.section}>Wypłata</Text>
        <Card><Text style={styles.item}>Metoda wypłaty</Text><Text style={styles.itemMeta}>W produkcji: operator / partner płatniczy → rachunek użytkownika. Aplikacja nie przechowuje środków.</Text></Card>
        <Text style={styles.section}>Bezpieczeństwo</Text>
        <Card><Text style={styles.item}>QR jest identyfikatorem sesji, nie pieniędzmi</Text><Text style={styles.itemMeta}>Zwrot powstaje dopiero po potwierdzeniu fizycznie przyjętych opakowań przez system operatora.</Text></Card>
        <Card><Text style={styles.item}>Integracje operatorów</Text><Text style={styles.itemMeta}>Warstwa adapterów pozwala podłączyć Kaucja.pl, PolKa, TOMRA lub innego operatora bez zmiany ekranów aplikacji.</Text></Card>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.bg }, content: { padding: 20, gap: 14, paddingBottom: 30 }, profileCard: { flexDirection: 'row', alignItems: 'center', gap: 14 }, avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.lime, alignItems: 'center', justifyContent: 'center' }, avatarText: { fontSize: 24, fontWeight: '900', color: colors.primaryDark }, name: { fontSize: 18, fontWeight: '900', color: colors.text }, meta: { color: colors.muted, fontSize: 12, marginTop: 4 }, section: { fontSize: 18, fontWeight: '900', color: colors.text, marginTop: 6 }, item: { fontWeight: '900', color: colors.text, fontSize: 15 }, itemMeta: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 6 } });
