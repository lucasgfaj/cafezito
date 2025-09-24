import { getFavorites, removeFavorite } from "@/services/favoriteService";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Coffe } from "@/types/coffeType";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { currentUser } from "@/services/auth";
import { getCoffeeById } from "@/services/coffeService";

export default function Favorite() {
  const [data, setData] = useState<Coffe[]>([]);
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const u = await currentUser();
      setUser(u);
    }
    loadUser();
  }, []);

useFocusEffect(
  useCallback(() => {
    if (!user) return;

    async function loadFavorites() {
      const favs = await getFavorites(user.id);
      const favsWithCoffee = await Promise.all(
        favs.map(async (f) => {
          const coffee = await getCoffeeById(f.coffee_id);
          return coffee;
        })
      );
      setData(favsWithCoffee.filter((c): c is Coffe => !!c)); 
    }

    loadFavorites();
  }, [user])
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
            await removeFavorite(user.id, id);
            setData((await getFavorites(user.id)).filter((f) => !!f.id));
            break;
          case 1:
            router.push(`/(panel)/(coffe)/${id}`);
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
            onPress={() => {
              console.log("Navigating via card press to id:", item.id);
              router.push(`/(panel)/(coffe)/${item.id}`);
            }}
            style={styles.card}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.cardDetails}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.type}</Text>
            </View>
            <TouchableOpacity
              style={styles.favorite}
              onPress={(e) => {
                e.stopPropagation();
                console.log("Favorite pressed for id:", item.id);
                onPress(item.id);
              }}
            >
              <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id!} // garante que não é undefined
        nestedScrollEnabled // se estiver dentro de ScrollView
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
