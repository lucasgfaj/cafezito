import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import TokenContextProvider, { useTokenContext } from "@/context/useContext";
import "expo-router/entry"
SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { token, isLoading } = useTokenContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Sora: require("@/assets/fonts/Sora-VariableFont_wght.ttf"),
      });

      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }

    loadFonts();
  }, []);

  useEffect(() => {
    if (!fontsLoaded || isLoading) return;

    const inPublicRoute = segments[0] !== "(panel)";

    if (token && inPublicRoute) {
      router.replace("/(panel)/(coffe)");
    } else if (!token && !inPublicRoute) {
      router.replace("/");
    }
  }, [segments, token, isLoading, fontsLoaded]);

  if (isLoading || !fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
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
    >
      <Stack.Screen name="(panel)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <TokenContextProvider>
      <RootLayoutInner />
    </TokenContextProvider>
  );
}
