// Delivery.tsx
import { products } from "@/mocks/products";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Navigation from "../ui/Navigation";
export default function Delivery() {
  const { id } = useLocalSearchParams();
  const product = products.find((item) => item.id === id);

  const handleBack = () => router.back();
  const handleRightIconPress = () => console.log("Local");

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navigation
        style={styles.navigation}
        iconRight="heart-outline"
        onBackPress={handleBack}
        onRightPress={handleRightIconPress}
      />

      {/* Mapa (imagem simulada) */}
      <Image
        source={require("../../assets/images/art/maps.png")} // Substitua com seu mapa ou imagem estática
        style={styles.map}
      />

      {/* Card de entrega */}
      <View style={styles.deliveryCard}>
        <Text style={styles.timeText}>10 minutes left</Text>
        <Text style={styles.addressText}>
          Delivery to <Text style={{ fontWeight: "600" }}>Jl. Kpg Sutoyo</Text>
        </Text>

        {/* Linha de progresso (falsa, estilizada) */}
        <View style={styles.progress}>
          <View style={styles.bar} />
        </View>

        {/* Status da entrega */}
        <View style={styles.statusRow}>
          <Ionicons name="checkmark-circle" size={24} color="#32B768" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.statusTitle}>Delivered your order</Text>
            <Text style={styles.statusSubtitle}>
              We will deliver your goods to you in the shortest possible time.
            </Text>
          </View>
        </View>

        {/* Entregador */}
        <View style={styles.courierRow}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.courierName}>Brooklyn Simmons</Text>
            <Text style={styles.courierLabel}>Personal Courier</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="call-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: 600,
    resizeMode: "cover",
  },
  navigation: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  deliveryCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 12,
  },
  progress: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
    marginBottom: 16,
    overflow: "hidden",
  },
  bar: {
    width: "75%",
    height: "100%",
    backgroundColor: "#32B768",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  courierRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  courierName: {
    fontSize: 16,
    fontWeight: "600",
  },
  courierLabel: {
    fontSize: 14,
    color: "#555",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
