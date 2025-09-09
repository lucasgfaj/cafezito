import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C67C4E",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: insets.bottom, // ajuste seguro para evitar a barra nativa
          left: 20,
          right: 20,
          height: 50,
          backgroundColor: "rgba(255, 255, 255, 0.9)", // leve opacidade
          borderRadius: 30,
          borderTopWidth: 0,
          elevation: 0, // sombra no Android
          shadowColor: "#000", // sombra no iOS
          shadowOpacity: 0.1,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="favorite" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="supervised-user-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
