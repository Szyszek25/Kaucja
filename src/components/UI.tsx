import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';

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
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  eyebrow: { color: colors.primary, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 5 },
  title: { color: colors.text, fontSize: 31, lineHeight: 35, fontWeight: '900', letterSpacing: -1.1 },
  card: { backgroundColor: colors.surface, borderRadius: 24, borderWidth: 1, borderColor: colors.border, padding: 18 },
  button: { backgroundColor: colors.black, minHeight: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '800' },
  chip: { borderRadius: 999, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 7, paddingHorizontal: 11 },
  chipActive: { backgroundColor: colors.mint, borderColor: colors.primary },
  chipText: { fontSize: 12, fontWeight: '700', color: colors.muted },
  chipTextActive: { color: colors.primaryDark }
});
