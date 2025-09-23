import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { getOrdersByUser, Order } from "@/services/orderService";
import { currentUser } from "@/services/auth";

const OrderBar = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function loadOrders() {
      const user = await currentUser();
      if (!user) return;

      const data = await getOrdersByUser(user.id);
      if (data) setOrders(data);
    }

    loadOrders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.map((order) => (
          <View style={styles.card} key={order.id}>
            <View style={styles.left}>
              <Text style={styles.orderNumber}>#{order.id.slice(0, 4)}</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.orderName}>
                {order.order_coffee
                  .map(
                    (oc) =>
                      `${oc.coffees?.name ?? "Coffee"} x${oc.quantity}`
                  )
                  .join(", ")}
              </Text>
              <Text style={styles.orderDate}>
                {new Date(order.order_date).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.orderPrice}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#313131",
    paddingVertical: 16,
    alignItems: "center",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
  },
  scrollContainer: {
    paddingVertical: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  left: {
    flex: 1,
  },
  center: {
    flex: 3,
    paddingHorizontal: 8,
  },
  right: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 14,
  },
  orderNumber: {
    fontWeight: "700",
    fontSize: 26,
    color: "#000",
  },
  orderDate: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 2,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  orderPrice: {
    fontWeight: "700",
    fontSize: 18,
    color: "#000",
  },
});

export default OrderBar;
