import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';

export function BrandHeader({ title, action }: { title?: string; action?: React.ReactNode }) {
  return (
    <View style={styles.brandRow}>
      <View style={styles.brandLeft}>
        <View style={styles.logoMark}>
          <Text style={styles.logoGlyph}>K</Text>
        </View>
        <Text style={styles.brandName}>Kaucja</Text>
      </View>
      {action}
    </View>
  );
}

export function ScreenHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <View style={styles.headerRow}>
      <View style={{ flex: 1 }}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {action}
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, pressed && !disabled && { opacity: 0.86 }, disabled && { opacity: 0.45 }]}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return <View style={[styles.chip, active && styles.chipActive]}><Text style={[styles.chipText, active && styles.chipTextActive]}>{children}</Text></View>;
}

const styles = StyleSheet.create({
  brandRow: { minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoMark: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.primaryDark, alignItems: 'center', justifyContent: 'center' },
  logoGlyph: { color: colors.lime, fontSize: 21, lineHeight: 24, fontWeight: '900', letterSpacing: -1 },
  brandName: { color: colors.text, fontSize: 26, lineHeight: 30, fontWeight: '900', letterSpacing: -0.9 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  eyebrow: { color: colors.primary, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 5 },
  title: { color: colors.text, fontSize: 26, lineHeight: 31, fontWeight: '900', letterSpacing: -0.8 },
  card: { backgroundColor: colors.surface, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 16 },
  button: { backgroundColor: colors.black, minHeight: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  buttonText: { color: 'white', fontSize: 15, fontWeight: '800' },
  chip: { borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 5, paddingHorizontal: 8 },
  chipActive: { backgroundColor: colors.mint, borderColor: colors.primary },
  chipText: { fontSize: 11, fontWeight: '700', color: colors.muted },
  chipTextActive: { color: colors.primaryDark }
});
