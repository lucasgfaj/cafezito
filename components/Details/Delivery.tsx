import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Navigation from "../ui/Navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import MapView, { Marker } from "react-native-maps";
import DeliveryCard from "./DeliveryCard";

export default function Delivery() {
  const { delivery } = useLocalSearchParams();
  const handleBack = () => router.back();
  const handleRightIconPress = () => console.log("Local");
  const profile = useUserProfile();

  return (
    <View style={styles.container}>
      <Navigation
        style={styles.navigation}
        iconRight="heart-outline"
        onBackPress={handleBack}
        onRightPress={handleRightIconPress}
      />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: -23.55052,
            longitude: -46.633308,
          }}
          title="Courier"
          description="Entregador está aqui"
        />
      </MapView>

      {/* Card da entrega */}
      <DeliveryCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  navigation: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
});
