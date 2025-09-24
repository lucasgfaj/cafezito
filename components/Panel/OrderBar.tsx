import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { getOrdersByUser, Order } from "@/services/orderService";
import { currentUser } from "@/services/auth";

const OrderBar = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadOrders = useCallback(async () => {
    try {
      const user = await currentUser();
      if (!user) return;

      const data = await getOrdersByUser(user.id);
      if (data) setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadOrders();
      setLoading(false);
    };

    fetchData();
  }, [loadOrders]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, [loadOrders]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Orders</Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#C67C4E" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orders.map((order) => {
            const firstCoffee = order.order_coffee[0]?.coffees?.name || "Coffee";
            const hasMore = order.order_coffee.length > 1;

            return (
              <View style={styles.card} key={order.id}>
                <View style={styles.left}>
                  <Text style={styles.orderNumber}>#{order.id.slice(0, 4)}</Text>
                </View>

                <View style={styles.center}>
                  <Text style={styles.orderName}>
                    {firstCoffee}
                    {hasMore ? "..." : ""}
                  </Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.order_date).toLocaleDateString()}
                  </Text>
                </View>

                <View style={styles.right}>
                  <Text style={styles.orderPrice}>${order.total.toFixed(2)}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
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
    fontSize: 16,
    marginBottom: 20,
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
    fontSize: 14,
    color: "#000",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
});

export default OrderBar;
