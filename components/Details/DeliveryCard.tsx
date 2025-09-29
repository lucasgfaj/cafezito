import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  DimensionValue,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type DeliveryCardProps = {
  status_order: number;
};

export default function DeliveryCard({ status_order }: DeliveryCardProps) {
  const tabBarHeight = useBottomTabBarHeight();

  let barWidth: DimensionValue = 0;
  let barColor = "#32B768";
  let statusTitle = "";
  let statusSubtitle = "";
  let iconName = "time-outline";
  let iconColor = "#32B768";

  switch (status_order) {
    case 1: 
      barWidth = "100%";
      barColor = "#32B768";
      statusTitle = "Delivered your order";
      statusSubtitle =
        "We have delivered your goods to you in the shortest possible time.";
      iconName = "checkmark-circle";
      iconColor = "#32B768";
      break;
    case 2: 
      barWidth = "50%";
      barColor = "#32B768";
      statusTitle = "Order in transit";
      statusSubtitle = "Your order is on the way.";
      iconName = "bicycle";
      iconColor = "#32B768";
      break;
    case 3: 
      barWidth = "100%";
      barColor = "#E03E3E";
      statusTitle = "Order cancelled";
      statusSubtitle = "Your order was cancelled.";
      iconName = "close-circle";
      iconColor = "#E03E3E";
      break;
    case 4: 
      barWidth = "100%";
      barColor = "#F2994A";
      statusTitle = "Order lost";
      statusSubtitle = "We lost your order. Sorry!";
      iconName = "alert-circle";
      iconColor = "#F2994A";
      break;
    default:
      barWidth = "0%";
      statusTitle = "Status unknown";
      statusSubtitle = "";
      iconName = "help-circle";
      iconColor = "#999";
  }

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

        <View style={styles.progress}>
          <View
            style={[
              styles.bar,
              {
                width: barWidth,
                backgroundColor: barColor,
              },
            ]}
          />
        </View>

        <View style={styles.statusRow}>
          <Ionicons name={iconName as any} size={24} color={iconColor} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.statusTitle}>{statusTitle}</Text>
            <Text style={styles.statusSubtitle}>{statusSubtitle}</Text>
          </View>
        </View>

        <View style={styles.courierRow}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.courierName}>Andres Simmons</Text>
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
    maxHeight: "55%",
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
    height: "100%",
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
