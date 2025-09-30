import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getOrdersByUser} from "@/services/orderService";
import { currentUser } from "@/services/auth";
import { Order } from "@/types/ordersType";

const OrderBar = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const router = useRouter(); 

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

  const handlePress = (orderId: string) => {
    router.push({
      pathname: "/(panel)/(cart)/[delivery]",
      params: { delivery: orderId },
    });
  };

  const renderItem = ({ item }: { item: Order }) => {
    const firstCoffee = item.order_coffee[0]?.coffees?.name || "Coffee";
    const hasMore = item.order_coffee.length > 1;

    return (
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <View style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.orderNumber}>#{item.id.slice(0, 4)}</Text>
          </View>

          <View style={styles.center}>
            <Text style={styles.orderName}>
              {firstCoffee}
              {hasMore ? "..." : ""}
            </Text>
            <Text style={styles.orderDate}>
              {new Date(item.order_date).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.orderPrice}>${item.total.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Nenhum pedido encontrado ☕</Text>
            </View>
          )}
          scrollEnabled
          alwaysBounceVertical
          contentContainerStyle={[
            styles.scrollContainer,
            { flexGrow: 1, paddingTop: 12, paddingBottom: 140 },
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
    paddingHorizontal: 8,
    marginTop: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
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
    marginRight: 8,
  },
  orderNumber: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  orderDate: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  orderPrice: {
    fontWeight: "700",
    fontSize: 15,
    color: "#000",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});

export default OrderBar;
