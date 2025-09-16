import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function CoffeeDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Coffee Details for ID: {id}</Text>
    </View>
  );
}
