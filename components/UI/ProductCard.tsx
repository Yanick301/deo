'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, currency } = useShop();
  const MotionDiv = motion.div as any;

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 mb-4">
          {/* Using standard img tag for local assets to ensure compatibility with current image paths */}
          <img 
            src={product.imageUrls[0]} 
            alt={product.title[language]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {product.salePrice && (
            <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs uppercase tracking-wide">
              Sale
            </div>
          )}
        </div>
        <div className="space-y-1 text-center group-hover:opacity-75 transition-opacity">
          <h3 className="font-serif text-lg text-brand-black">{product.title[language]}</h3>
          <div className="flex justify-center gap-2 text-sm font-light">
            {product.salePrice ? (
              <>
                <span className="line-through text-gray-400">{product.price.toFixed(2)} {currency}</span>
                <span className="text-red-700">{product.salePrice.toFixed(2)} {currency}</span>
              </>
            ) : (
              <span>{product.price.toFixed(2)} {currency}</span>
            )}
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
};