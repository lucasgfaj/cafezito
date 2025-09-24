import { Stack } from "expo-router";

export default function CoffeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      <Stack.Screen name="[delivery]" />
    </Stack>
  );
}
