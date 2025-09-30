import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { router, useLocalSearchParams } from "expo-router";
import Navigation from "../ui/Navigation";
import DeliveryCard from "./DeliveryCard";
import { getOrdersByUser} from "@/services/orderService";
import { currentUser } from "@/services/auth";
import { Order } from "@/types/ordersType";
export default function Delivery() {
  const { delivery } = useLocalSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => router.push("/orders");

  useEffect(() => {
    async function loadOrder() {
      const user = await currentUser();
      if (!user) return;

      const orders = await getOrdersByUser(user.id);
      if (!orders) return;

      const currentOrder = orders.find((o) => o.id === delivery);
      setOrder(currentOrder || null);
      setLoading(false);
    }
    loadOrder();
  }, [delivery]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#C67C4E" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.centered}>
        <Text>Order not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navigation style={styles.navigation} onBackPress={handleBack} />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.55052,
          longitude: -46.633308,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled
        zoomEnabled
        rotateEnabled
        pitchEnabled
      >
        <Marker
          coordinate={{
            latitude: -23.55052,
            longitude: -46.633308,
          }}
          title="Courier"
          description="Delivery is here!"
        />
      </MapView>

      <DeliveryCard status_order={order.status_order} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  map: { flex: 1 },
  navigation: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
