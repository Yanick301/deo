import { Product, TranslatedString } from '../types';
import { CATEGORIES } from '../constants';

// Helper to generate deterministic random numbers
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const MATERIALS = [
  { fr: "Soie Italienne", en: "Italian Silk", es: "Seda Italiana", pt: "Seda Italiana", de: "Italienische Seide" },
  { fr: "Cachemire", en: "Cashmere", es: "Cachemira", pt: "Caxemira", de: "Kaschmir" },
  { fr: "Coton Égyptien", en: "Egyptian Cotton", es: "Algodón Egipcio", pt: "Algodão Egípcio", de: "Ägyptische Baumwolle" },
  { fr: "Cuir Véritable", en: "Genuine Leather", es: "Cuero Genuino", pt: "Couro Genuíno", de: "Echtes Leder" },
];

const COLORS = ["Noir", "Blanc", "Or", "Rouge", "Bleu", "Vert", "Beige", "Argent"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ADJECTIVES = {
  fr: ["Élégant", "Luxueux", "Intemporel", "Moderne", "Classique", "Raffiné", "Exquis", "Urbain", "Minimaliste"],
  en: ["Elegant", "Luxurious", "Timeless", "Modern", "Classic", "Refined", "Exquisite", "Urban", "Minimalist"],
  es: ["Elegante", "Lujoso", "Atemporal", "Moderno", "Clásico", "Refinado", "Exquisito", "Urbano", "Minimalista"],
  pt: ["Elegante", "Luxuoso", "Atemporal", "Moderno", "Clássico", "Refinado", "Requintado", "Urbano", "Minimalista"],
  de: ["Elegant", "Luxuriös", "Zeitlos", "Modern", "Klassisch", "Raffiniert", "Exquisit", "Urban", "Minimalistisch"],
};

const NOUNS = {
  fr: ["Manteau", "Robe", "Sac", "Costume", "Écharpe", "Chemise", "Pantalon", "Veste", "Blouson", "Jupe"],
  en: ["Coat", "Dress", "Bag", "Suit", "Scarf", "Shirt", "Trousers", "Jacket", "Blazer", "Skirt"],
  es: ["Abrigo", "Vestido", "Bolso", "Traje", "Bufanda", "Camisa", "Pantalones", "Chaqueta", "Americana", "Falda"],
  pt: ["Casaco", "Vestido", "Bolsa", "Terno", "Cachecol", "Camisa", "Calças", "Jaqueta", "Blazer", "Saia"],
  de: ["Mantel", "Kleid", "Tasche", "Anzug", "Schal", "Hemd", "Hose", "Jacke", "Blazer", "Rock"],
};

const COLORS_EN = ["Black", "White", "Gold", "Red", "Blue", "Green", "Beige", "Silver"];

export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  let globalIdCounter = 1;

  CATEGORIES.forEach((cat) => {
    // Generate products per category
    for (let i = 0; i < 60; i++) {
      const id = `${cat.id}-${globalIdCounter++}`;
      const seed = globalIdCounter * 17; // Deterministic seed
      
      const adjIndex = Math.floor(seededRandom(seed) * ADJECTIVES.fr.length);
      const nounIndex = Math.floor(seededRandom(seed + 1) * NOUNS.fr.length);
      const materialIndex = Math.floor(seededRandom(seed + 2) * MATERIALS.length);
      const colorIndex = Math.floor(seededRandom(seed + 3) * COLORS.length);
      
      // Lower prices: 50 to 450 range
      const priceBase = 50 + Math.floor(seededRandom(seed + 4) * 400);
      
      const title: TranslatedString = {
        fr: `${NOUNS.fr[nounIndex]} ${ADJECTIVES.fr[adjIndex]}`,
        en: `${ADJECTIVES.en[adjIndex]} ${NOUNS.en[nounIndex]}`,
        es: `${NOUNS.es[nounIndex]} ${ADJECTIVES.es[adjIndex]}`,
        pt: `${NOUNS.pt[nounIndex]} ${ADJECTIVES.pt[adjIndex]}`,
        de: `${ADJECTIVES.de[adjIndex]} ${NOUNS.de[nounIndex]}`,
      };

      const nounEn = NOUNS.en[nounIndex].toLowerCase().replace(/\s+/g, '-');
      const colorEn = COLORS_EN[colorIndex].toLowerCase();
      const categoryId = cat.id; // e.g., 'men-clothing'

      // Local Image Naming Convention
      // Format: /images/products/{category}_{noun}_{color}_{view}.jpg
      // Example: /images/products/men-clothing_coat_black_1.jpg
      
      const baseFilename = `${categoryId}_${nounEn}_${colorEn}`;
      
      const mainImage = `/images/products/${baseFilename}_1.jpg`;
      const alt1 = `/images/products/${baseFilename}_2.jpg`;
      const alt2 = `/images/products/${baseFilename}_3.jpg`;

      products.push({
        id,
        sku: `EZ-${id.toUpperCase()}`,
        categoryId: cat.id,
        title,
        price: priceBase,
        salePrice: seededRandom(seed + 5) > 0.85 ? Math.floor(priceBase * 0.8) : undefined,
        inventoryCount: 10 + Math.floor(seededRandom(seed + 6) * 50),
        sizes: SIZES,
        colors: [COLORS[colorIndex], COLORS[(colorIndex + 1) % COLORS.length]],
        material: MATERIALS[materialIndex],
        careInstructions: {
          fr: "Nettoyage à sec uniquement.",
          en: "Dry clean only.",
          es: "Solo limpieza en seco.",
          pt: "Apenas lavagem a seco.",
          de: "Nur chemische Reinigung."
        },
        shortDescription: {
          fr: "L'élégance ultime pour votre garde-robe.",
          en: "The ultimate elegance for your wardrobe.",
          es: "La máxima elegancia para tu guardarropa.",
          pt: "A elegância suprema para o seu guarda-roupa.",
          de: "Die ultimative Eleganz für Ihre Garderobe."
        },
        longDescription: {
          fr: "Confectionné avec une attention méticuleuse aux détails, cet article incarne l'essence du luxe moderne.",
          en: "Crafted with meticulous attention to detail, this item embodies the essence of modern luxury.",
          es: "Elaborado con meticulosa atención al detalle, este artículo encarna la esencia del lujo moderno.",
          pt: "Criado com atenção meticulosa aos detalhes, este item incorpora a essência do luxo moderno.",
          de: "Mit Liebe zum Detail gefertigt, verkörpert dieser Artikel die Essenz des modernen Luxus."
        },
        imageUrls: [mainImage, alt1, alt2],
        rating: 3.5 + seededRandom(seed + 7) * 1.5,
        reviewCount: Math.floor(seededRandom(seed + 8) * 200),
      });
    }
  });

  return products;
};

export const ALL_PRODUCTS = generateProducts();

export const getProductsByCategory = (categoryId: string) => {
  return ALL_PRODUCTS.filter(p => p.categoryId === categoryId);
};

export const getProductById = (id: string) => {
  return ALL_PRODUCTS.find(p => p.id === id);
};