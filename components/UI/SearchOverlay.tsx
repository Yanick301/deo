import React, { useState, useEffect } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_PRODUCTS } from '../../services/productService';
import { ProductCard } from './ProductCard';
import { useShop } from '../../context/ShopContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { language } = useShop();
  
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const results = query.length > 1 
    ? ALL_PRODUCTS.filter(p => 
        p.title[language].toLowerCase().includes(query.toLowerCase()) || 
        p.title['en'].toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  const MotionDiv = motion.div as any;

  return (
    <AnimatePresence>
      <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-md"
      >
        <div className="container mx-auto px-6 pt-24 h-full flex flex-col">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:rotate-90 transition-transform duration-300">
            <X size={32} />
          </button>

          <div className="relative mb-12">
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full text-4xl md:text-6xl font-serif border-b-2 border-gray-200 py-4 bg-transparent outline-none placeholder-gray-300 focus:border-brand-gold transition-colors"
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={40} />
          </div>

          <div className="flex-1 overflow-y-auto pb-20">
            {query.length > 1 && (
              <>
                 <p className="text-gray-500 uppercase tracking-widest mb-8 text-sm">
                   {results.length} Result{results.length !== 1 && 's'}
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                   {results.map(product => (
                     <ProductCard key={product.id} product={product} />
                   ))}
                 </div>
                 {results.length === 0 && (
                   <div className="text-center text-gray-400 mt-20">
                     <p>No results found for "{query}"</p>
                   </div>
                 )}
              </>
            )}
          </div>
        </div>
      </MotionDiv>
    </AnimatePresence>
  );
};