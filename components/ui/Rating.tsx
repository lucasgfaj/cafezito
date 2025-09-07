import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface RatingProps {
  value: number; 
  votes?: number; 
  style?: ViewStyle;
  testID?: string;
}

export default function Rating({ value, votes, style, testID }: RatingProps) {
  return (
    
    <View style={[styles.rating, style]} testID={testID}>
      <Ionicons name="star" size={22} color="#FBBE21" />
      <Text style={styles.ratingText}>{value.toFixed(1)}</Text>
      {votes !== undefined && (
        <Text style={styles.votesText}>({votes})</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    position: "absolute",
    borderRadius: 10,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "black",
    fontSize: 18,
    marginLeft: 4,
    fontWeight: "600",
  },
  votesText: {
    color: "#A4A4A4",
    fontSize: 14,
    marginLeft: 4,
  },
});
