import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';

const members = [
  'Henrique Motta Canho',
  'Guilherme Tamelini Bertozzo',
  'Yago da Silva Leme',
  'Victor Hugo de Deus Machado',
];

export default function InfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../app/src/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>ChromAid</Text>
      <Text style={styles.subtitle}>Seu Assistente de Cor</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Projeto</Text>
        <Text style={styles.paragraph}>
          Aplicativo para identificação de cores em regiões de interesse de imagens,
          auxiliando pessoas com daltonismo a reconhecerem cores no dia a dia.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Curso</Text>
        <Text style={styles.paragraph}>Ciência da Computação — 6º semestre</Text>
        <Text style={styles.paragraph}>Unisagrado</Text>
        <Text style={styles.paragraph}>Disciplina: Visão Computacional e IA</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Integrantes</Text>
        {members.map((name) => (
          <View key={name} style={styles.memberRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(name)}</Text>
            </View>
            <Text style={styles.memberName}>{name}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>© {new Date().getFullYear()} ChromAid — Projeto Acadêmico</Text>
    </ScrollView>
  );
}

function getInitials(full: string) {
  const parts = full.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return (first + last).toUpperCase();
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 10, marginBottom: 50, gap: 16, backgroundColor: '#F6F7FA' },
  logo: { width: 96, height: 96, alignSelf: 'center', marginTop: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#1C1C1E', textAlign: 'center', marginTop: 4 },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 8 },

  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#1C1C1E', marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#374151', lineHeight: 20 },

  memberRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 12 },
  avatar: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#B8E3C0', // verde pastel
  },
  avatarText: { color: '#1C1C1E', fontWeight: '700' },
  memberName: { fontSize: 15, color: '#1C1C1E' },

  footer: { textAlign: 'center', color: '#9CA3AF', marginTop: 6, marginBottom: 12 },
});
