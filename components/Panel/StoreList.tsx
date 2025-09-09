import { Product } from '@/constants/Product';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import StoreCard from './StoreCard';

const { width } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_WIDTH = (width - CARD_GAP * 3) / 2; // 2 cards por linha

interface StoreListProps {
  products: Product[];
}


export default function StoreList({ products }: StoreListProps) {
  const router = useRouter();

  const handlePress = (productId: string) => {
    router.push(`/(details)/detail?id=${productId}`);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
          <StoreCard
            image={item.image}
            title={item.title}
            description={item.description}
            price={String(item.price)}
            rating={item.rating}
            onPressAdd={() => console.log('Adicionado:', item.title)}
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
