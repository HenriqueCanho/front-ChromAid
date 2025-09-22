import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../app/src/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

      {/* Título */}
      <Text style={styles.title}>ChromAid</Text>
      <Text style={styles.subtitle}>Seu Assistente de Cor</Text>

      {/* Botão principal */}
      <Pressable style={[styles.button, styles.cameraButton]} onPress={() => router.push('/camera-live')}>
        <Text style={styles.buttonText}>Abrir Câmera</Text>
      </Pressable>

      {/* Segundo botão (placeholder futuro) */}
      <Pressable style={[styles.button, styles.secondaryButton]} onPress={() => router.push('/info')}>
        <Text style={styles.buttonText}>Sobre o Projeto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cameraButton: {
    backgroundColor: '#A7D8F0', // azul pastel
  },
  secondaryButton: {
    backgroundColor: '#FBC4A4', // laranja pastel
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
  },
});
