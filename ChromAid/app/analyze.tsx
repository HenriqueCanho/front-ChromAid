// app/analyze.tsx
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { averageColorFromJPEGBase64, rgbToHex, nameColorByHue } from './src/utils/color';

export default function AnalyzeScreen() {
    const { uri, base64, width, height, roiRatio } = useLocalSearchParams<{
        uri: string; base64: string; width: string; height: string; roiRatio?: string;
    }>();

    const imgW = Number(width || 0);
    const imgH = Number(height || 0);
    const ratio = Math.max(0.05, Math.min(0.35, Number(roiRatio ?? 0.18))); // 5%–35%

    const [color, setColor] = useState<{ r: number; g: number; b: number } | null>(null);

    useEffect(() => {
        (async () => {
            if (!base64 || !imgW || !imgH) return;
            try {
                const avg = await averageColorFromJPEGBase64(base64, Math.round(imgW / 2), Math.round(imgH / 2), Math.max(imgW, imgH));
                // radius gigante -> cobre tudo (ROI já é o recorte)
                setColor(avg);
                const hex = rgbToHex(avg.r, avg.g, avg.b);
                const friendly = nameColorByHue(avg.r, avg.g, avg.b); // <- nova função (abaixo)
                Speech.speak(`Cor aproximada: ${friendly} ${hex}`, { language: 'pt-BR' });
            } catch (e) { console.error(e); }
        })();
    }, [base64, imgW, imgH]);


    const hex = useMemo(() => color ? rgbToHex(color.r, color.g, color.b) : '#FFFFFF', [color]);
    const friendly = useMemo(() => color ? nameColorByHue(color.r, color.g, color.b) : 'Calculando…', [color]);

    return (
        <View style={styles.container}>
            <View style={styles.canvas}>
                {!!uri && (
                    <Image source={{ uri }} style={StyleSheet.absoluteFill} contentFit="contain" transition={100} />
                )}
                {/* Mira central fixa (só visual) */}
                <View pointerEvents="none" style={styles.overlayCenter}>
                    <View style={styles.crosshairOuter}>
                        <View style={styles.crosshairInner} />
                    </View>
                </View>

                {/* Etiqueta de cor */}
                {color && (
                    <View style={styles.colorBadge}>
                        <Text style={styles.colorText}>{friendly} • {hex}</Text>
                    </View>
                )}
            </View>

            <Text style={styles.tip}>A cor é obtida automaticamente a partir do quadrado central.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    canvas: { flex: 1, borderRadius: 16, overflow: 'hidden', backgroundColor: '#f2f2f7' },
    overlayCenter: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    crosshairOuter: {
        width: 180, height: 180, borderRadius: 16,
        borderWidth: 2, borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.08)',
    },
    crosshairInner: {
        flex: 1, margin: 4, borderRadius: 12,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)',
    },
    colorBadge: {
        position: 'absolute', left: 12, bottom: 12,
        paddingVertical: 8, paddingHorizontal: 12,
        borderRadius: 12, backgroundColor: '#000000', opacity: 0.9,
    },
    colorText: { color: 'white', fontWeight: '600' },
    tip: { textAlign: 'center', color: '#6b7280' },
});
