import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../ui/Button';
import CardImg from '../ui/CardImg';

interface StoreCardProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  price: string;
  rating: number;
  onPressAdd?: () => void;
  onPress: () => void; 
}

export default function StoreCard({
  image,
  title,
  description,
  price,
  rating,
  onPressAdd,
  onPress
}: StoreCardProps) {
  return (
<TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <CardImg image={image} width={120} height={120} borderRadius={16} />
        <View style={styles.rating}>
          <Ionicons name="star" size={14} color="#FBBE21" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>${price}</Text>
        <Button
          width={32}
          height={32}
          borderRadius={8}
          icon="add"
          backgroundColor="#C67C4E"
          onPress={onPressAdd}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: '#fcfcfc',
    borderRadius: 28,
    padding: 12,
    marginRight: 16,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#000000aa',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  description: {
    color: '#888',
    fontSize: 12,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
