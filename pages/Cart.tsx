'use client';

import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2 } from 'lucide-react';
import { Button } from '../components/UI/Button';
import Link from 'next/link';

export const Cart: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, cartTotal, currency, t, language } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleCart}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-serif text-xl">{t('nav_cart')}</h2>
          <button onClick={toggleCart}><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p>{t('cart_empty')}</p>
              <button onClick={toggleCart} className="mt-4 underline">Start Shopping</button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4">
                <img src={item.imageUrls[0]} alt="" className="w-20 h-24 object-cover" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif text-sm">{item.title[language]}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  <div className="flex justify-between items-end mt-4">
                     <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                     <span className="font-medium">{(item.salePrice || item.price).toFixed(2)} {currency}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex justify-between mb-4 text-lg font-bold font-serif">
              <span>{t('cart_total')}</span>
              <span>{cartTotal.toFixed(2)} {currency}</span>
            </div>
            <Link href="/checkout" onClick={toggleCart}>
                <Button fullWidth>{t('checkout')}</Button>
            </Link>
            <p className="text-xs text-center text-gray-400 mt-4">Tax included. Shipping calculated at checkout.</p>
          </div>
        )}
      </div>
    </div>
  );
};