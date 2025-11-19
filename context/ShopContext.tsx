import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, CartItem, Product } from '../types';
import { UI_TRANSLATIONS, LANGUAGES } from '../constants';

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: string; // Default EUR
  t: (key: string) => string; // Translation helper
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
  cartCount: number;
  toggleCart: () => void;
  isCartOpen: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [currency] = useState('EUR');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = (key: string): string => {
    if (!UI_TRANSLATIONS[key]) return key;
    return UI_TRANSLATIONS[key][language] || UI_TRANSLATIONS[key]['en'];
  };

  const addToCart = (product: Product, selectedSize: string, selectedColor: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...prev, { ...product, selectedSize, selectedColor, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Ensure default language is DE
  useEffect(() => {
    setLanguage('de');
  }, []);

  return (
    <ShopContext.Provider value={{ 
      language, 
      setLanguage, 
      currency, 
      t, 
      cart, 
      addToCart, 
      removeFromCart,
      cartTotal,
      cartCount,
      toggleCart,
      isCartOpen
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};