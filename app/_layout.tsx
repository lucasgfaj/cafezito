import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import TokenContextProvider, { useTokenContext } from '@/context/useContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { token, isLoading } = useTokenContext();
  const segments = useSegments();
  const router = useRouter();

  // Carregar fonte
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Sora': require('@/assets/fonts/Sora-VariableFont_wght.ttf'),
      });

      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  // Redirecionamento baseado em autenticação
  useEffect(() => {
    if (!fontsLoaded || isLoading) return;

    const inPublicRoute = segments[0] !== '(panel)';

    if (token && inPublicRoute) {
      router.replace('/(panel)/home');
    } else if (!token && !inPublicRoute) {
      router.replace('/');
    }
  }, [segments, token, isLoading, fontsLoaded]);

  // Mostrar bolinha girando enquanto carrega
  if (isLoading || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <TokenContextProvider>
      <RootLayoutInner />
    </TokenContextProvider>
  );
}
