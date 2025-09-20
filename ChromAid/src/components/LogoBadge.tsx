import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '@/theme/tokens';

import { LogoMark } from './LogoMark';

export const LogoBadge = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <LogoMark size={200} />
      </View>
      <Text style={styles.title}>ChromAid</Text>
      <Text style={styles.subtitle}>Your Color Assistant</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md
  },
  logoWrapper: {
    width: 224,
    height: 224,
    borderRadius: 112,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.12,
    shadowRadius: 40,
    elevation: 8
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    letterSpacing: 0.2
  }
});
