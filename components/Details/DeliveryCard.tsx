import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function DeliveryCard() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.container, { paddingBottom: tabBarHeight + 50 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.timeText}>10 minutes left</Text>
        <Text style={styles.addressText}>
          Delivery to <Text style={{ fontWeight: "600" }}>Jl. Kpg Sutoyo</Text>
        </Text>

        {/* Linha de progresso */}
        <View style={styles.progress}>
          <View style={styles.bar} />
        </View>

        {/* Status */}
        <View style={styles.statusRow}>
          <Ionicons name="checkmark-circle" size={24} color="#32B768" />
          <View style={{ marginLeft: 10, flex: 1 }}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    maxHeight: "55%", // 👈 limita altura e ativa scroll
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
    marginTop: 10,
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
});
