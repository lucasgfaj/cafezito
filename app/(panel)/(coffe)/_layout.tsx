import { Stack } from "expo-router";

export default function CoffeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Tela principal da aba */}
      <Stack.Screen name="index" />

      {/* Tela de detalhes, fora da TabBar */}
      <Stack.Screen name="[details]" />
    </Stack>
  );
}
