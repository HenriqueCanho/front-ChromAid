import { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';

export default function CameraScreen() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const requestAndOpenCamera = useCallback(async () => {
    setBusy(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão da câmera negada.');
        setBusy(false);
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        base64: true,        // importante: precisamos dos pixels
        quality: 1,          // máxima qualidade
        exif: false,
      });

      if (!result.canceled && result.assets?.length) {
        const asset = result.assets[0];
        // enviamos para a tela de análise
        Haptics.selectionAsync().catch(() => { });
        router.push({
          pathname: '/analyze',
          params: {
            uri: asset.uri,
            base64: asset.base64 ?? '',
            width: String(asset.width ?? 0),
            height: String(asset.height ?? 0),
          },
        });
      }
    } catch (e: any) {
      console.error(e);
      alert('Erro ao abrir a câmera.');
    } finally {
      setBusy(false);
    }
  }, [router]);

  if (!busy) requestAndOpenCamera(); // abre assim que entra na tela

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Abrindo câmera…</Text>
      <Image
        source={require('./src/assets/images/camera-placeholder.png')}
        style={{ width: 80, height: 80, opacity: 0.2 }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  text: { color: '#6b7280' },
});
