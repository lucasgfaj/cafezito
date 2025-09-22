import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

const OrderBar = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Orders</Text>
      </View>

      {/* Lista de pedidos rolável */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Card de exemplo #1 */}
        <View style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.orderNumber}>#1</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.orderName}>Caffe Mocha +1</Text>
            <Text style={styles.orderDate}>01/01/2026</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.orderPrice}>$4.53</Text>
          </View>
        </View>

        {/* Card de exemplo #2 */}
        <View style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.orderNumber}>#2</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.orderName}>Latte</Text>
            <Text style={styles.orderDate}>02/01/2026</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.orderPrice}>$3.80</Text>
          </View>
        </View>

        {/* Você pode adicionar mais cards aqui */}
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
