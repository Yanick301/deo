'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { Button } from '@/components/UI/Button';
import { ProductCard } from '@/components/UI/ProductCard';
import { LUXURY_BRANDS, REVIEWS_DATA } from '@/constants';
import { ALL_PRODUCTS } from '@/services/productService';
import Link from 'next/link';
import { Star, Play } from 'lucide-react';

// Updated to local paths
const HERO_IMAGES = [
  "/images/hero_couple_winter_walk.jpg",
  "/images/hero_couple_city_suit.jpg",
  "/images/hero_couple_evening_wear.jpg"
];

export default function Home() {
  const { t, language } = useShop();
  const featuredProducts = ALL_PRODUCTS.slice(0, 4);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const MotionH1 = motion.h1 as any;
  const MotionP = motion.p as any;
  const MotionDiv = motion.div as any;
  const MotionImg = motion.img as any;

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Image Slideshow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode='wait'>
          <MotionImg
            key={currentImageIndex}
            src={HERO_IMAGES[currentImageIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Luxury Winter Fashion"
          />
        </AnimatePresence>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-base tracking-[0.4em] uppercase mb-6 text-brand-gold"
          >
            Maison Ezcentials
          </MotionP>
          <MotionH1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-serif text-6xl md:text-9xl mb-8 leading-none italic"
          >
            {t('hero_title')}
          </MotionH1>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link href="/category/women-clothing">
              <Button variant="primary" className="bg-white text-black hover:bg-brand-gold hover:text-white border-none min-w-[200px]">
                {t('cta_shop_now')}
              </Button>
            </Link>
             <Link href="/about">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black min-w-[200px]">
                {t('cta_discover_more')}
              </Button>
            </Link>
          </MotionDiv>
        </div>
      </section>

      {/* Infinite Brand Marquee */}
      <section className="bg-white py-12 border-b border-gray-100 overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="flex animate-marquee whitespace-nowrap">
          {[...LUXURY_BRANDS, ...LUXURY_BRANDS].map((brand, idx) => (
            <span key={idx} className="text-black/80 font-serif text-3xl md:text-4xl mx-16 uppercase tracking-widest hover:text-brand-gold transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Editorial Grid */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
           <div className="relative group h-[800px] overflow-hidden">
              {/* Local Image Path */}
              <img 
                src="/images/category_preview_men.jpg" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Men" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center text-white p-12 text-center">
                <h2 className="font-serif text-6xl mb-4 italic">{t('men_collection')}</h2>
                <p className="uppercase tracking-widest text-sm mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {language === 'de' ? 'Macht & Raffinesse' : 'Sophistication & Power'}
                </p>
                <Link href="/category/men-clothing" className="border-b border-white pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
                  {t('cta_discover_more')}
                </Link>
              </div>
           </div>
           <div className="relative group h-[800px] overflow-hidden">
              {/* Local Image Path */}
              <img 
                src="/images/category_preview_women.jpg" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Women" 
              />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center text-white p-12 text-center">
                <h2 className="font-serif text-6xl mb-4 italic">{t('women_collection')}</h2>
                <p className="uppercase tracking-widest text-sm mb-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {language === 'de' ? 'Anmut & Schönheit' : 'Grace & Beauty'}
                </p>
                <Link href="/category/women-clothing" className="border-b border-white pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
                  {t('cta_discover_more')}
                </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Video Campaign Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <h4 className="text-brand-gold uppercase tracking-[0.3em] text-sm">Campaign 2025</h4>
            <h2 className="font-serif text-5xl md:text-7xl leading-tight">
              Shadows of <br/> <span className="italic">Gold</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-md">
              {language === 'de' 
                ? "Erleben Sie die Schnittstelle zwischen moderner Kunst und zeitloser Schneiderei. Unsere neue Kollektion erforscht die Dualität von Licht und Schatten."
                : "Experience the intersection of modern art and timeless tailoring. Our new collection explores the duality of light and shadow."}
            </p>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black mt-8">
              {language === 'de' ? "Film Ansehen" : "Watch Full Film"}
            </Button>
          </div>
          <div className="md:w-1/2 relative">
             <div className="aspect-video bg-gray-800 relative group cursor-pointer overflow-hidden rounded-sm">
                {/* Using a static poster image for the video container */}
                <img 
                  src="/images/campaign_poster.jpg" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play fill="white" className="ml-1" />
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="font-serif text-4xl md:text-5xl mb-2">{t('new_arrivals')}</h3>
            <p className="text-gray-500 italic font-serif">
              {language === 'de' ? "Für die Saison kuratiert" : "Curated for the season"}
            </p>
          </div>
          <Link href="/category/brand-collections" className="hidden md:block uppercase tracking-widest text-xs border-b border-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
            {t('view_all')}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-12 md:hidden">
           <Link href="/category/brand-collections" className="uppercase tracking-widest text-xs border-b border-black pb-1">
            {t('view_all')}
          </Link>
        </div>
      </section>

      {/* Reviews Parallax */}
      <section className="py-32 bg-fixed bg-center bg-cover relative" style={{ backgroundImage: 'url(/images/reviews_background.jpg)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
             <h3 className="font-serif text-4xl mb-16 italic">{t('reviews_title')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS_DATA.map(review => (
                <div key={review.id} className="bg-white/10 backdrop-blur-md p-10 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex justify-center mb-6 text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg font-serif mb-6 italic leading-relaxed">"{review.text[language]}"</p>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold">{review.author}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

       {/* Newsletter */}
       <section className="py-24 bg-brand-gray">
          <div className="container mx-auto px-6 text-center max-w-2xl">
             <h3 className="font-serif text-4xl mb-4">{t('join_circle')}</h3>
             <p className="text-gray-500 mb-8">{t('subscribe_text')}</p>
             <div className="flex flex-col md:flex-row gap-4">
                <input type="email" placeholder="E-Mail" className="flex-1 bg-transparent border-b border-black py-3 outline-none placeholder-gray-500 focus:border-brand-gold" />
                <Button>{t('subscribe_btn')}</Button>
             </div>
          </div>
       </section>
    </div>
  );
}