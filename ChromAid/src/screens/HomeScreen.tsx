import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { ChromAidButton } from '@/components/ChromAidButton';
import { LogoBadge } from '@/components/LogoBadge';
import { CameraIcon } from '@/components/icons/CameraIcon';
import { SparkleIcon } from '@/components/icons/SparkleIcon';
import { colors, spacing } from '@/theme/tokens';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <LogoBadge />
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>Descubra as cores ao seu redor</Text>
            <Text style={styles.heroSubtitle}>
              A ChromAid te ajuda a capturar uma imagem e traduzir a cor da região de interesse com precisão.
            </Text>
          </View>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.cardTitle}>Escolha como começar</Text>
          <Text style={styles.cardSubtitle}>
            Você pode capturar uma nova imagem agora ou explorar ideias de uso no app.
          </Text>

          <ChromAidButton
            label="Identificar cor agora"
            caption="Abre a câmera para analisar a região de interesse"
            icon={<CameraIcon />}
            onPress={() => {}}
            accessibilityHint="Abre a câmera para tirar uma foto e descobrir a cor"
          />

          <ChromAidButton
            label="Explorar experiências"
            caption="Em breve você verá sugestões e histórias de uso"
            variant="secondary"
            icon={<SparkleIcon />}
            disabled
            onPress={() => {}}
            accessibilityHint="Seção em desenvolvimento"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
    gap: spacing.xl
  },
  hero: {
    gap: spacing.xl,
    alignItems: 'center'
  },
  heroTextBlock: {
    gap: spacing.sm,
    maxWidth: 340
  },
  heroTitle: {
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.4
  },
  heroSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    color: colors.textSecondary
  },
  actionCard: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: 36,
    gap: spacing.lg,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 6
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary
  },
  cardSubtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary
  }
});
