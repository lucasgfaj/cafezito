import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "@/constants/Product";
import { getFavorites, removeFavorite } from "@/storage/favorites";

export default function Favorite() {
  const [data, setData] = useState<Product[]>([]);
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setData);
    }, [])
  );

  const onPress = (id: string) => {
    const options = ["Remove from Favorites", "View Product", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      async (selectedIndex) => {
        if (selectedIndex === undefined) return;

        switch (selectedIndex) {
          case 0:
            await removeFavorite(id);
            setData(await getFavorites());
            break;
          case 1:
            router.push(`/detail?id=${id}`);
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/order?id=${item.id}`)}
            style={styles.card}
            activeOpacity={0.8}
          >
          <Image source={item.image} style={styles.image} />

            <View style={styles.cardDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
            <TouchableOpacity
              style={styles.favorite}
              onPress={(e) => {
                e.stopPropagation(); // evita que a navegação aconteça
                onPress(item.id);
              }}
            >
              <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No favorite products found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#313131",
    padding: 14,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fcfcfc",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
  },
  favorite: {
    padding: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});
