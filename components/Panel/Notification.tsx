import { notifications } from "@/mocks/notifications";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../ui/Button";

export default function Notification() {
  const router = useRouter();

  const handleClaim = (id: string) => {
    // Navega para a rota detail passando o id
    router.push(`/detail?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Notifications</Text>
      <View style={styles.containerCard}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            <Image source={item.image} style={styles.image} />

            <View style={styles.notificationDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>

            <Button
              width={100}
              height={40}
              backgroundColor="#C67C4E"
              borderRadius={12}
              text="Claim Now"
              textColor="#fff"
              onPress={() => handleClaim(item.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerCard: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#313131",
    paddingVertical: 15,
    borderRadius: 12,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  notificationDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#6F4F37",
    marginVertical: 5,
  },
  message: {
    fontSize: 14,
    color: "#777",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
