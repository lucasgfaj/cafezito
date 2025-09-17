import { products } from '@/mocks/products';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../ui/Button';
import Navigation from '../ui/Navigation';

export default function Order() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

    const handleBack = () => router.back();
      const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFoundText}>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
            <Navigation
              style={styles.navigation}
              text="Order"
              onBackPress={handleBack}
              iconLeft="arrow-back-circle" 
              iconRight="flower"
            />

      {/* Toggle Deliver / Pick Up */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
          <Text style={styles.toggleTextActive}>Deliver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Pick Up</Text>
        </TouchableOpacity>
      </View>

      {/* Delivery Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressName}>Jl. Kpg Sutoyo</Text>
        <Text style={styles.addressDetail}>
          Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
        </Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create-outline" size={16} color="#C67C4E" />
            <Text style={styles.actionText}>Edit Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-ellipses-outline" size={16} color="#C67C4E" />
            <Text style={styles.actionText}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Summary */}
      <View style={styles.productCard}>
        <Image source={product.image} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.productSubtitle}>Deep Foam</Text>
        </View>
        <View style={styles.counter}>
          <Text>-</Text>
          <Text> 1 </Text>
          <Text>+</Text>
        </View>
      </View>

      {/* Discount */}
      <TouchableOpacity style={styles.discountCard}>
        <Ionicons name="pricetags-outline" size={16} color="#C67C4E" />
        <Text style={styles.discountText}>1 Discount is Applies</Text>
      </TouchableOpacity>

      {/* Payment Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.rowBetween}>
          <Text>Price</Text>
          <Text>${Number(product.price).toFixed(2)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text>Delivery Fee</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            <Text style={styles.oldPrice}>$2.00</Text>
            <Text>${(1.0).toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Wallet */}
      <View style={styles.walletCard}>
        <Ionicons name="wallet-outline" size={20} color="#C67C4E" />
        <Text style={styles.walletText}>Cash/Wallet</Text>
        <Text style={styles.walletAmount}>${(Number(product.price) + 1.0).toFixed(2)}</Text>
      </View>

      {/* Order Button com navegação */}
       <Button
        text="Order"
        onPress={() => router.push(`/delivery?id=${product.id}`)} 
        style={{ marginTop: 24, width: '100%' }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
   navigation: {
    marginTop: 40,
    marginBottom: 16,
  },
  notFoundText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  activeToggle: {
    backgroundColor: '#C67C4E',
  },
  toggleText: {
    color: '#333',
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  addressName: {
    fontWeight: 'bold',
  },
  addressDetail: {
    color: '#888',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: '#C67C4E',
    fontWeight: '500',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
  },
  productSubtitle: {
    color: '#888',
  },
  counter: {
    flexDirection: 'row',
    gap: 8,
  },
  discountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3ea',
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
  },
  discountText: {
    color: '#C67C4E',
    fontWeight: '500',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff3ea',
    borderRadius: 12,
    marginBottom: 24,
  },
  walletText: {
    flex: 1,
    marginLeft: 8,
    color: '#C67C4E',
    fontWeight: '500',
  },
  walletAmount: {
    fontWeight: 'bold',
    color: '#C67C4E',
  },
});
