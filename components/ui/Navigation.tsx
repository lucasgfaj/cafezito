import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface NavigationProps {
  iconLeft?: keyof typeof Ionicons.glyphMap; // <- novo prop opcional
  iconRight?: keyof typeof Ionicons.glyphMap;
  text?: string;
  onBackPress: () => void;
  onRightPress?: () => void;
  style?: ViewStyle | ViewStyle[];
}

export default function Navigation({
  iconLeft = "chevron-back", // <- valor padrão
  iconRight,
  text,
  onBackPress,
  onRightPress,
  style,
}: NavigationProps) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onBackPress} hitSlop={80}>
        <Ionicons name={iconLeft} size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{text}</Text>

      {iconRight ? (
        <TouchableOpacity onPress={onRightPress} hitSlop={80}>
          <Ionicons name={iconRight} size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
});
