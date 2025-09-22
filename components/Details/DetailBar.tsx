import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { addToCart } from "@/services/cartService";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../ui/Button";
import CardImg from "../ui/CardImg";
import Navigation from "../ui/Navigation";
import Rating from "../ui/Rating";
import { Coffe } from "@/types/coffeType";
import { getCoffeeById } from "@/services/coffeService";
import { currentUser } from "@/services/auth";
import {
  addFavorite,
  getFavorite,
  removeFavorite,
} from "@/services/favoriteService";

export default function DetailBar() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [coffee, setCoffe] = useState<Coffe | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [user, setUser] = useState<any>();
  useEffect(() => {
    async function loadUser() {
      const u = await currentUser();
      setUser(u);
    }

    loadUser();
  }, []);

  useEffect(() => {
    async function fetchCoffee() {
      if (!id || !user) return;

      setLoading(true);

      const data = await getCoffeeById(id as string);
      setCoffe(data);

      if (data) {
        const fav = await getFavorite(user.id, data.id);
        setFavorite(!!fav);
      }

      setLoading(false);
    }

    fetchCoffee();
  }, [id, user]);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleRightIconPress = async () => {
    if (!coffee || !user) return;

    if (favorite) {
      await removeFavorite(user.id, coffee.id);
      setFavorite(false);
    } else {
      await addFavorite(user.id, coffee.id);
      setFavorite(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text>Coffe not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Navigation
        style={styles.navigation}
        text="Detail"
        iconRight={favorite ? "heart" : "heart-outline"}
        onBackPress={handleBack}
        onRightPress={handleRightIconPress}
      />

      <CardImg
        image={{ uri: coffee.image_url }}
        width={320}
        height={250}
        borderRadius={16}
      />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{coffee.name}</Text>
          <Text style={styles.subtitle}>{coffee.description}</Text>
        </View>
      </View>
      <Text style={styles.rating}>
        <Rating value={coffee.rating} votes={coffee.votes} />
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {coffee.description} <Text style={styles.readMore}>Read More</Text>
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizes}>
          {["S", "M", "L"].map((size) => (
            <Pressable
              key={size} 
              style={size === "M" ? styles.sizeActive : styles.size}
            >
              <Text
                style={size === "M" ? styles.sizeTextActive : styles.sizeText}
              >
                {size}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${coffee.price}</Text>

        <Button
          text="Buy Now"
          backgroundColor="#C67C4E"
          onPress={async () => {
            if (coffee) {
              await addToCart(coffee);
              router.push(`/cart?id=${coffee.id}`);
            }
          }}
          style={styles.buyButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  navigation: {
    marginTop: 40,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 16,
  },
  rating: {
    marginTop: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  subtitle: {
    color: "#A2A2A2",
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
  },
  readMore: {
    color: "#C67C4E",
    fontWeight: "bold",
  },
  sizes: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  size: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  sizeActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#C67C4E",
  },
  sizeText: {
    fontSize: 14,
    color: "#333",
  },
  sizeTextActive: {
    fontSize: 14,
    color: "#fff",
  },
  priceContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 80,
  },
  price: {
    color: "#C67C4E",
    fontWeight: "bold",
    fontSize: 22,
  },
  buyButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
});
