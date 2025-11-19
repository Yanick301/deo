import { CategoryConfig, Language, TranslatedString, CustomerReview } from './types';

// Reordered to have German first
export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

export const CATEGORIES: CategoryConfig[] = [
  { id: 'men-clothing', path: '/category/men-clothing', label: { fr: 'Homme Vêtements', en: 'Men Clothing', es: 'Ropa Hombre', pt: 'Roupas Masculinas', de: 'Herrenbekleidung' } },
  { id: 'men-accessories', path: '/category/men-accessories', label: { fr: 'Homme Accessoires', en: 'Men Accessories', es: 'Accesorios Hombre', pt: 'Acessórios Masculinos', de: 'Herrenaccessoires' } },
  { id: 'women-clothing', path: '/category/women-clothing', label: { fr: 'Femme Vêtements', en: 'Women Clothing', es: 'Ropa Mujer', pt: 'Roupas Femininas', de: 'Damenbekleidung' } },
  { id: 'women-accessories', path: '/category/women-accessories', label: { fr: 'Femme Accessoires', en: 'Women Accessories', es: 'Accesorios Mujer', pt: 'Acessórios Femininos', de: 'Damenaccessoires' } },
  { id: 'winterwear', path: '/category/winterwear', label: { fr: 'Hiver', en: 'Winterwear', es: 'Invierno', pt: 'Inverno', de: 'Wintermode' } },
  { id: 'christmas', path: '/category/christmas', label: { fr: 'Noël', en: 'Christmas', es: 'Navidad', pt: 'Natal', de: 'Weihnachten' } },
  { id: 'brand-collections', path: '/category/brand-collections', label: { fr: 'Collections', en: 'Collections', es: 'Colecciones', pt: 'Coleções', de: 'Kollektionen' } },
];

export const LUXURY_BRANDS = [
  "Aurum & Silk", "Velvet Noir", "Lumina Paris", "Etoile", "Obsidian",
  "Ciel", "Argento", "Vogue Line", "Imperium", "Sanctuary",
  "Opulence", "Majesty", "Regalia", "Sovereign", "Noble Thread",
  "Crown & Dagger", "Eclipse", "Solaris", "Aether", "Quintessence",
  "Vertex", "Zenith", "Apex Fashion", "Summit", "Pinnacle",
  "Heritage", "Legacy", "Dynasty", "Empire", "Monarch",
  "Valerius", "Seraphim", "Elysium", "Vanguard", "Onyx",
  "Ivory & Gold", "Sapphire", "Emerald Court", "Ruby Lane", "Diamond Stitch"
];

export const UI_TRANSLATIONS: Record<string, TranslatedString> = {
  nav_home: { fr: 'Accueil', en: 'Home', es: 'Inicio', pt: 'Início', de: 'Startseite' },
  nav_about: { fr: 'À propos', en: 'About', es: 'Nosotros', pt: 'Sobre', de: 'Über uns' },
  nav_contact: { fr: 'Contact', en: 'Contact', es: 'Contacto', pt: 'Contato', de: 'Kontakt' },
  nav_cart: { fr: 'Panier', en: 'Cart', es: 'Carrito', pt: 'Carrinho', de: 'Warenkorb' },
  hero_title: { fr: "L'Élégance Redéfinie", en: "Elegance Redefined", es: "Elegancia Redefinida", pt: "Elegância Redefinida", de: "Eleganz neu definiert" },
  hero_subtitle: { fr: "Découvrez la collection hiver 2025", en: "Discover the Winter 2025 Collection", es: "Descubre la colección Invierno 2025", pt: "Descubra a coleção Inverno 2025", de: "Entdecken Sie die Winterkollektion 2025" },
  cta_shop_now: { fr: "Acheter Maintenant", en: "Shop Now", es: "Comprar Ahora", pt: "Comprar Agora", de: "Jetzt Einkaufen" },
  cta_discover_more: { fr: "Découvrir Plus", en: "Discover More", es: "Descubrir Más", pt: "Descobrir Mais", de: "Mehr Entdecken" },
  reviews_title: { fr: "Avis Clients", en: "Customer Reviews", es: "Opiniones", pt: "Avaliações", de: "Kundenbewertungen" },
  footer_rights: { fr: "Tous droits réservés.", en: "All rights reserved.", es: "Todos los derechos reservados.", pt: "Todos os direitos reservados.", de: "Alle Rechte vorbehalten." },
  add_to_cart: { fr: "Ajouter au panier", en: "Add to Cart", es: "Añadir al carrito", pt: "Adicionar ao carrinho", de: "In den Warenkorb" },
  select_size: { fr: "Sélectionner la taille", en: "Select Size", es: "Seleccionar talla", pt: "Selecionar tamanho", de: "Größe wählen" },
  select_color: { fr: "Sélectionner la couleur", en: "Select Color", es: "Seleccionar color", pt: "Selecionar cor", de: "Farbe wählen" },
  price: { fr: "Prix", en: "Price", es: "Precio", pt: "Preço", de: "Preis" },
  description: { fr: "Description", en: "Description", es: "Descripción", pt: "Descrição", de: "Beschreibung" },
  details: { fr: "Détails", en: "Details", es: "Detalles", pt: "Detalhes", de: "Details" },
  related: { fr: "Vous aimerez aussi", en: "You may also like", es: "También te puede gustar", pt: "Você também pode gostar", de: "Das könnte Ihnen auch gefallen" },
  cart_empty: { fr: "Votre panier est vide", en: "Your cart is empty", es: "Tu carrito está vacío", pt: "Seu carrinho está vazio", de: "Ihr Warenkorb ist leer" },
  cart_total: { fr: "Total", en: "Total", es: "Total", pt: "Total", de: "Gesamt" },
  checkout: { fr: "Payer", en: "Checkout", es: "Pagar", pt: "Finalizar Compra", de: "Zur Kasse" },
  men_collection: { fr: "L'Homme", en: "Men", es: "Hombre", pt: "Homens", de: "Herren" },
  women_collection: { fr: "La Femme", en: "Women", es: "Mujer", pt: "Mulheres", de: "Damen" },
  new_arrivals: { fr: "Nouveautés", en: "New Arrivals", es: "Novedades", pt: "Novidades", de: "Neuheiten" },
  view_all: { fr: "Voir Tout", en: "View All", es: "Ver Todo", pt: "Ver Tudo", de: "Alles Ansehen" },
  join_circle: { fr: "Rejoignez le Cercle", en: "Join the Inner Circle", es: "Únete al Círculo", pt: "Junte-se ao Círculo", de: "Werden Sie Mitglied" },
  subscribe_text: { fr: "Débloquez un accès exclusif.", en: "Unlock exclusive access.", es: "Desbloquea acceso exclusivo.", pt: "Desbloqueie acesso exclusivo.", de: "Erhalten Sie exklusiven Zugang." },
  subscribe_btn: { fr: "S'abonner", en: "Subscribe", es: "Suscribirse", pt: "Inscrever-se", de: "Abonnieren" },
};

export const REVIEWS_DATA: CustomerReview[] = [
  { id: '1', author: 'Isabelle Dubois', rating: 5, text: { fr: "Absolument magnifique. La qualité est incomparable.", en: "Absolutely stunning. The quality is unmatched.", es: "Absolutamente impresionante.", pt: "Absolutamente deslumbrante.", de: "Absolut atemberaubend. Die Qualität ist unübertroffen." } },
  { id: '2', author: 'Marc Lefevre', rating: 5, text: { fr: "Service client exceptionnel et emballage luxueux.", en: "Exceptional customer service and luxury packaging.", es: "Servicio al cliente excepcional.", pt: "Atendimento ao cliente excepcional.", de: "Außergewöhnlicher Kundenservice und luxuriöse Verpackung." } },
  { id: '3', author: 'Sophia Loren', rating: 4, text: { fr: "Très belle pièce, livraison rapide.", en: "Very beautiful piece, fast delivery.", es: "Pieza muy hermosa, entrega rápida.", pt: "Peça muito bonita, entrega rápida.", de: "Sehr schönes Stück, schnelle Lieferung." } },
];