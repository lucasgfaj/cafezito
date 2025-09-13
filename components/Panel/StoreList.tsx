import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import StoreCard from './StoreCard';
import { Coffe } from '@/types/coffeType';

const { width } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_WIDTH = (width - CARD_GAP * 3) / 2; // 2 cards por linha

interface StoreListProps {
  coffees: Coffe[];
  loading?: boolean;
}


export default function StoreList({ coffees, loading }: StoreListProps) {
  const router = useRouter();

  const handlePress = (coffeeId: string) => {
    // router.push(`/(details)/detail?id=${coffeeId}`);
    console.log('Coffee ID:', coffeeId);
  };

  return (
    <FlatList
      data={coffees}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
          <StoreCard
            image={{ uri: item.image_url }}
            title={item.name}
            description={item.description}
            price={String(item.price)}
            rating={item.rating}
            onPressAdd={() => console.log('Adicionado:', item.name)}
            onPress={() => handlePress(item.id)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 16,
  },
});
