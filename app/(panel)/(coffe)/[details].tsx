import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function CoffeeDetailsScreen() {
  const { details } = useLocalSearchParams();

  return (
    <View>
      <Text>Coffee Details for ID: {details}</Text>
    </View>
  );
}
