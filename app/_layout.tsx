// app/_layout.tsx
import '../app/src/polyfills'; // Buffer polyfill (necessário p/ jpeg-js)
import 'react-native-reanimated';
import { Image, Text, View } from "react-native";

import { ThemeProvider, DarkTheme as RNDark, DefaultTheme as RNLight } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, useColorScheme } from 'react-native';

// Paleta pastel alinhada ao app
const colors = {
  bgLight: '#F6F7FA',
  cardLight: '#FFFFFF',
  textLight: '#1C1C1E',
  borderLight: '#E5E7EB',
  primaryLight: '#A7D8F0', // azul pastel

  bgDark: '#0E0F12',
  cardDark: '#1C1C1E',
  textDark: '#F2F2F7',
  borderDark: '#2C2C2E',
  primaryDark: '#64B5E6',
};

// Temas do React Navigation com nossa paleta
const LightTheme = {
  ...RNLight,
  colors: {
    ...RNLight.colors,
    primary: colors.primaryLight,
    background: colors.bgLight,
    card: colors.cardLight,
    text: colors.textLight,
    border: colors.borderLight,
  },
};

const DarkTheme = {
  ...RNDark,
  colors: {
    ...RNDark.colors,
    primary: colors.primaryDark,
    background: colors.bgDark,
    card: colors.cardDark,
    text: colors.textDark,
    border: colors.borderDark,
  },
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#5689" },
        headerShadowVisible: false, // remove linha do header, estilo iOS
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Image
                source={require("../app/src/assets/images/logo.png")}
                style={{ width: 28, height: 28, borderRadius: 6, }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: "#1C1C1E", // preto suave estilo iOS
                }}
              >
                ChromAid
              </Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="camera"
        options={{ title: "Nova Foto" }}
      />
      <Stack.Screen
        name="camera-live"
        options={{ title: "Câmera" }}
      />
      <Stack.Screen
        name="analyze"
        options={{ title: "Analisar Cor" }}
      />
      <Stack.Screen
        name="info"
        options={{ title: "Sobre o Projeto" }}
      />
    </Stack>
  );
}