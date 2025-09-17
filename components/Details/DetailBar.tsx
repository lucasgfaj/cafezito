import { products } from "@/mocks/products";
import { addFavorite, isFavorite, removeFavorite } from "@/storage/favorites";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../ui/Button";
import CardImg from "../ui/CardImg";
import Navigation from "../ui/Navigation";
import Rating from "../ui/Rating";

export default function Detail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = products.find((item) => item.id === id);

  const handleBack = () => router.back();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (product) {
      isFavorite(product.id).then(setFavorite);
    }
  }, [product]);

  const handleRightIconPress = async () => {
    if (!product) return;
    if (favorite) {
      await removeFavorite(product.id);
    } else {
      await addFavorite({ ...product, votes: product.votes ?? 0 });
    }
    setFavorite(!favorite);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product is not found</Text>
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
        image={product.image}
        width={355}
        height={250}
        borderRadius={16}
      />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.subtitle}>{product.subtitle}</Text>
        </View>
      </View>
      <Text style={styles.rating}>
        <Rating value={product.rating} votes={product.votes} />
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {product.description} <Text style={styles.readMore}>Read More</Text>
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
        <Text style={styles.price}>${product.price}</Text>
        <Button
          text="Buy Now"
          backgroundColor="#C67C4E"
          onPress={() => router.push(`/order?id=${product.id}`)}
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
