import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../ui/Button";
import Navigation from "../ui/Navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useCart } from "@/context/useCartContext";

export default function Order() {
  const router = useRouter();
  const { profile } = useUserProfile();

  const { cart, increaseQuantity, decreaseQuantity, clearCart, total } =
    useCart();

  const clearCartHandler = () => {
    Alert.alert("Confirm", "Deseja esvaziar o carrinho?", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: async () => {
          await clearCart();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Navigation
        style={styles.navigation}
        text="Order"
        onBackPress={() => router.back()}
        iconLeft="arrow-back-circle"
        iconRight="trash"
        onRightPress={clearCartHandler}
      />

      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
          <Text style={styles.toggleTextActive}>Deliver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Pick Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressDetail}>{profile.address}</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/(panel)/account")}
          >
            <Ionicons name="create-outline" size={16} color="#C67C4E" />
            <Text style={styles.actionText}>Edit Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert("This note is not possible")}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={16}
              color="#C67C4E"
            />
            <Text style={styles.actionText}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>
      {cart.length > 0 ? (
        cart.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image_url }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productSubtitle}>
                {product.description || "No description"}
              </Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => decreaseQuantity(product.id)}>
                <Text style={{ fontSize: 18, paddingHorizontal: 8 }}>-</Text>
              </TouchableOpacity>

              <Text style={{ marginHorizontal: 8 }}>{product.quantity}</Text>

              <TouchableOpacity onPress={() => increaseQuantity(product.id)}>
                <Text style={{ fontSize: 18, paddingHorizontal: 8 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.notFoundText}>No coffees available</Text>
      )}

      <TouchableOpacity style={styles.discountCard}>
        <Ionicons name="pricetags-outline" size={16} color="#C67C4E" />
        <Text style={styles.discountText}>1 Discount is Applied</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.rowBetween}>
          <Text>Subtotal</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text>Delivery Fee</Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Text style={styles.oldPrice}>$2.00</Text>
            <Text>$1.00</Text>
          </View>
        </View>
      </View>

      <View style={styles.walletCard}>
        <Ionicons name="wallet-outline" size={20} color="#C67C4E" />
        <Text style={styles.walletText}>Cash/Wallet</Text>
        <Text style={styles.walletAmount}>${(total + 1).toFixed(2)}</Text>
      </View>

      <Button
        text="Confirm Order"
        onPress={() => console.log("Pedido confirmado")}
        style={{ marginBottom: 160, marginTop: 24, width: "100%" }}
        disabled={cart.length === 0}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  navigation: { marginTop: 40, marginBottom: 16 },
  notFoundText: { textAlign: "center", padding: 12, color: "red" },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  activeToggle: { backgroundColor: "#C67C4E" },
  toggleText: { color: "#333" },
  toggleTextActive: { color: "#fff", fontWeight: "bold" },
  section: { marginBottom: 24 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  addressDetail: { color: "#888", marginBottom: 12 },
  row: { flexDirection: "row", gap: 12 },
  actionButton: { flexDirection: "row", alignItems: "center", gap: 4 },
  actionText: { color: "#C67C4E", fontWeight: "500" },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  productImage: { width: 48, height: 48, borderRadius: 8 },
  productInfo: { flex: 1 },
  productName: { fontWeight: "bold" },
  productSubtitle: { color: "#888" },
  counter: { flexDirection: "row", gap: 8 },
  discountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3ea",
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  discountText: { color: "#C67C4E", fontWeight: "500" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  oldPrice: { textDecorationLine: "line-through", color: "#aaa" },
  walletCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff3ea",
    borderRadius: 12,
    marginBottom: 24,
  },
  walletText: { flex: 1, marginLeft: 8, color: "#C67C4E", fontWeight: "500" },
  walletAmount: { fontWeight: "bold", color: "#C67C4E" },
});
