import { Ionicons } from "@expo/vector-icons"; // ou qualquer lib de ícones
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../ui/Button";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={18} color="#9A9A9D" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search coffee"
          placeholderTextColor="#9A9A9D"
        />
      </View>
      <Button
        width={40}
        height={40}
        backgroundColor="#C67C4E"
        borderRadius={12}
        icon="options-outline" // se você customizar o Button para aceitar ícones
        textColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F2D2C",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
});
