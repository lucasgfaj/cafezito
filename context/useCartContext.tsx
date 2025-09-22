import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coffe } from "@/types/coffeType";

interface CartItem extends Coffe {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Coffe, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  increaseQuantity: (id: string) => Promise<void>;
  decreaseQuantity: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carrega o carrinho do AsyncStorage
  useEffect(() => {
    async function loadCart() {
      const data = await AsyncStorage.getItem("cart");
      setCart(data ? JSON.parse(data) : []);
    }
    loadCart();
  }, []);

  // Salva o carrinho no AsyncStorage
  const saveCart = async (newCart: CartItem[]) => {
    setCart(newCart);
    await AsyncStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = async (item: Coffe, quantity = 1) => {
    const existing = cart.find((p) => p.id === item.id);
    if (existing) {
      await saveCart(
        cart.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      );
    } else {
      await saveCart([...cart, { ...item, quantity }]);
    }
  };

  const removeFromCart = async (id: string) => {
    await saveCart(cart.filter((p) => p.id !== id));
  };

  const increaseQuantity = async (id: string) => {
    await saveCart(
      cart.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQuantity = async (id: string) => {
    const product = cart.find((p) => p.id === id);
    if (!product) return;
    if (product.quantity === 1) {
      await removeFromCart(id);
    } else {
      await saveCart(
        cart.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    }
  };

  const clearCart = async () => {
    await saveCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
