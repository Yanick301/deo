export type Language = 'fr' | 'en' | 'es' | 'pt' | 'de';

export interface TranslatedString {
  fr: string;
  en: string;
  es: string;
  pt: string;
  de: string;
}

export interface Product {
  id: string;
  sku: string;
  title: TranslatedString;
  categoryId: string;
  price: number;
  salePrice?: number;
  inventoryCount: number;
  sizes: string[];
  colors: string[];
  material: TranslatedString;
  careInstructions: TranslatedString;
  shortDescription: TranslatedString;
  longDescription: TranslatedString;
  imageUrls: string[]; // Using placeholder logic but structure supports multiple
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CategoryConfig {
  id: string;
  label: TranslatedString;
  path: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  text: TranslatedString;
}