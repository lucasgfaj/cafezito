import { Stack } from "expo-router";

export default function CartLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[delivery]"
        options={{
          headerShown: false,
          presentation: "modal", // opcional, se quiser modal
          // tabBarVisible será escondida automaticamente
        }}
      />
    </Stack>
  );
}
