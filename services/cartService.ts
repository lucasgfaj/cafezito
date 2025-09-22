// services/cartService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coffe } from "@/types/coffeType";

const CART_KEY = "cart";

export async function getCart(): Promise<Coffe[]> {
  const json = await AsyncStorage.getItem(CART_KEY);
  return json ? JSON.parse(json) : [];
}

export async function addToCart(item: Coffe) {
  const cart = await getCart();
  const exists = cart.find((c) => c.id === item.id);

  if (!exists) {
    cart.push({ ...item, quantity: 1 });
  } else {
    exists.quantity = (exists.quantity || 1) + 1;
  }

  await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export async function removeFromCart(id: string) {
  const cart = await getCart();
  const newCart = cart.filter((c) => c.id !== id);
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(newCart));
}

export async function clearCart() {
  await AsyncStorage.removeItem(CART_KEY);
}
