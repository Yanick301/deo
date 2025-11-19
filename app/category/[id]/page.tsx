'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/services/productService';
import { ProductCard } from '@/components/UI/ProductCard';
import { CATEGORIES } from '@/constants';
import { useShop } from '@/context/ShopContext';

export default function CategoryPage() {
  const params = useParams();
  const id = params?.id as string;
  const { language } = useShop();
  
  const category = CATEGORIES.find(c => c.id === id);
  const products = useMemo(() => getProductsByCategory(id || ''), [id]);

  if (!category) return <div className="pt-32 text-center">Category not found</div>;

  return (
    <div className="pt-32 min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-black mb-4">{category.label[language]}</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">{products.length} Products</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Filters (Mock) */}
        <aside className="w-full md:w-1/5 space-y-8">
          <div>
            <h3 className="font-bold text-sm uppercase mb-4 tracking-widest">Sort By</h3>
            <select className="w-full p-2 border text-sm bg-white">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase mb-4 tracking-widest">Price</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2"><input type="checkbox" /> €0 - €200</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> €200 - €500</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> €500+</label>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="w-full md:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Pagination Mock */}
          <div className="mt-16 flex justify-center gap-2">
            <button className="w-10 h-10 border border-brand-black bg-brand-black text-white">1</button>
            <button className="w-10 h-10 border border-gray-200 hover:border-brand-black">2</button>
            <button className="w-10 h-10 border border-gray-200 hover:border-brand-black">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}