import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import * as ImageManipulator from 'expo-image-manipulator';

const ROI_RATIO = 0.18; // ~18% do menor lado da imagem

export default function CameraLive() {
    const [permission, requestPermission] = useCameraPermissions();
    const [ready, setReady] = useState(false);
    const [taking, setTaking] = useState(false);
    const cameraRef = useRef<CameraView>(null);
    const router = useRouter();

    const onCapture = async () => {
        if (!cameraRef.current || taking) return;
        try {
            setTaking(true);
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => { });
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
                quality: 0.8,       // menos pesado
                skipProcessing: false,
            });

            // --- CROP CENTRAL NATIVO (rápido) ---
            const w = photo.width ?? 0;
            const h = photo.height ?? 0;
            const side = Math.round(Math.min(w, h) * ROI_RATIO);
            const cx = Math.round(w / 2);
            const cy = Math.round(h / 2);
            const crop = {
                originX: Math.max(0, cx - side),
                originY: Math.max(0, cy - side),
                width: Math.min(w, side * 2),
                height: Math.min(h, side * 2),
            };

            const cropped = await ImageManipulator.manipulateAsync(
                photo.uri!,
                [
                    { crop },
                    // reduz pra pouquíssimos pixels -> análise instantânea
                    { resize: { width: 128, height: 128 } },
                ],
                { base64: true, compress: 1, format: ImageManipulator.SaveFormat.JPEG }
            );

            // Envia só a ROI reduzida
            router.push({
                pathname: '/analyze',
                params: {
                    uri: cropped.uri,
                    base64: cropped.base64 ?? '',
                    width: String(cropped.width ?? 0),
                    height: String(cropped.height ?? 0),
                    auto: '1',
                },
            });
        } catch (e) {
            console.error(e);
            Alert.alert('Erro', 'Não foi possível capturar a foto.');
        } finally {
            setTaking(false);
        }
    };

    useEffect(() => {
        (async () => {
            if (!permission || !permission.granted) {
                const res = await requestPermission();
                if (!res.granted) {
                    Alert.alert('Permissão negada', 'Ative a câmera nas configurações para continuar.');
                }
            }
        })();
    }, [permission]);

    if (!permission) {
        return (
            <View style={styles.center}>
                <ActivityIndicator />
                <Text style={styles.hint}>Verificando permissões…</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>Precisamos da câmera</Text>
                <Text style={styles.hint}>Conceda acesso para continuar</Text>
                <Pressable onPress={() => requestPermission()} style={[styles.button, styles.buttonPrimary]}>
                    <Text style={[styles.buttonText, styles.buttonPrimaryText]}>Permitir câmera</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                ref={cameraRef}
                style={{ flex: 1 }}
                facing="back" // agora é só uma string
                onCameraReady={() => setReady(true)}
            />
            <View pointerEvents="none" style={styles.overlayContainer}>
                <View style={styles.roiBox} />
                <Text style={styles.roiHint}>Centralize a área de interesse</Text>
            </View>

            <View style={styles.bottomBar}>
                <Pressable onPress={onCapture} style={({ pressed }) => [styles.shutterOuter, pressed && { opacity: 0.8 }]}>
                    <View style={styles.shutterInner} />
                </Pressable>
            </View>

            {!ready && (
                <View style={styles.loadingCover}>
                    <ActivityIndicator />
                    <Text style={styles.hint}>Iniciando câmera…</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
    title: { fontSize: 22, fontWeight: '700' },
    hint: { color: '#6b7280' },

    overlayContainer: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
    roiBox: {
        width: 180, height: 180, borderRadius: 16,
        borderWidth: 2, borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.08)',
    },
    roiHint: { position: 'absolute', bottom: '25%', color: 'white', fontWeight: '600' },

    bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 24, alignItems: 'center' },
    shutterOuter: {
        width: 74, height: 74, borderRadius: 37,
        backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: 'white',
    },
    shutterInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#ffffff' },

    loadingCover: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },

    button: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center' },
    buttonPrimary: { backgroundColor: '#0a84ff' },
    buttonPrimaryText: { color: 'white', fontWeight: '600' },
    buttonText: { fontSize: 16 },
});
