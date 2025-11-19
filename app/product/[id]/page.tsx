'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/productService';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/UI/Button';
import { Star, Info, Truck, Shield } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { language, currency, t, addToCart } = useShop();
  const product = getProductById(id || '');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (product) {
      setMainImage(product.imageUrls[0]);
    }
  }, [product]);

  if (!product) return <div className="pt-32 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img src={mainImage} alt={product.title[language]} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.imageUrls.map((url, i) => (
              <div 
                key={i} 
                className={`aspect-[4/5] cursor-pointer border ${mainImage === url ? 'border-brand-black' : 'border-transparent'}`}
                onClick={() => setMainImage(url)}
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col h-full">
          <div className="mb-1">
             <span className="text-gray-400 text-xs uppercase tracking-widest">{product.sku}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.title[language]}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl font-light">
              {product.salePrice ? (
                <>
                  <span className="line-through text-gray-400 text-lg mr-2">{product.price} {currency}</span>
                  <span className="text-red-700">{product.salePrice} {currency}</span>
                </>
              ) : (
                 <span>{product.price} {currency}</span>
              )}
            </p>
            <div className="flex items-center text-brand-gold text-sm">
               <Star size={14} fill="currentColor" className="mr-1" />
               <span>{product.rating.toFixed(1)} ({product.reviewCount})</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 font-light">
            {product.shortDescription[language]}
          </p>

          {/* Variants */}
          <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">{t('select_color')}</h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                      ${selectedColor === color ? 'border-brand-black' : 'border-gray-200 hover:border-gray-400'}`}
                    title={color}
                  >
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}></div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3">{t('select_size')}</h3>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 flex items-center justify-center border transition-all text-sm
                      ${selectedSize === size ? 'bg-brand-black text-white border-brand-black' : 'bg-white text-black border-gray-200 hover:border-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-12">
            <Button fullWidth onClick={handleAddToCart} disabled={!selectedSize || !selectedColor}>
               {t('add_to_cart')}
            </Button>
          </div>

          {/* Tabs / Additional Info */}
          <div className="space-y-4 text-sm text-gray-600">
            <details className="border-b border-gray-200 pb-4 cursor-pointer group">
              <summary className="font-bold uppercase tracking-widest flex items-center justify-between list-none group-hover:text-brand-black">
                {t('description')} <Info size={16} />
              </summary>
              <p className="pt-4 font-light leading-relaxed">{product.longDescription[language]}</p>
            </details>
             <details className="border-b border-gray-200 pb-4 cursor-pointer group">
              <summary className="font-bold uppercase tracking-widest flex items-center justify-between list-none group-hover:text-brand-black">
                Material <Shield size={16} />
              </summary>
              <p className="pt-4 font-light leading-relaxed">{product.material[language]}. {product.careInstructions[language]}</p>
            </details>
             <details className="border-b border-gray-200 pb-4 cursor-pointer group">
              <summary className="font-bold uppercase tracking-widest flex items-center justify-between list-none group-hover:text-brand-black">
                Delivery <Truck size={16} />
              </summary>
              <p className="pt-4 font-light leading-relaxed">Free standard shipping on orders over 500 EUR. Estimated delivery 3-5 business days.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}