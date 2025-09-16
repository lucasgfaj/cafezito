import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#C67C4E",
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: insets.bottom + (Platform.OS === 'android' ? 10 : 0), 
          height: 60,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 30,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000", 
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingBottom: Platform.OS === 'android' ? 10 : 15,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(coffe)"
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
        name="cart"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="add-shopping-cart" color={color} />
          ),
        }}
      />

        <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="view-list" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person-outline" color={color} />
          ),
        }}
      />

       
    </Tabs>
  );
}
