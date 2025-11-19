import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../constants';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t, language } = useShop();

  return (
    <footer className="bg-brand-black text-white pt-20 pb-10 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold tracking-[0.2em]">EZCENTIALS</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {language === 'fr' ? 
              "La destination ultime pour la mode de luxe. Nous redéfinissons l'élégance moderne." : 
              "The ultimate destination for luxury fashion. Redefining modern elegance."}
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-serif text-lg mb-6">{t('nav_home')}</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {CATEGORIES.slice(0,4).map(cat => (
              <li key={cat.id}>
                <Link to={cat.path} className="hover:text-white transition-colors">{cat.label[language]}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-serif text-lg mb-6">Service</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-white">{t('nav_contact')}</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
           <h4 className="font-serif text-lg mb-6">Newsletter</h4>
           <p className="text-gray-400 text-sm mb-4">
             {language === 'fr' ? "Inscrivez-vous pour les dernières nouveautés." : "Subscribe for the latest updates."}
           </p>
           <div className="flex border-b border-gray-600 pb-2">
             <input type="email" placeholder="Email" className="bg-transparent w-full outline-none text-white placeholder-gray-600" />
             <button className="text-brand-gold uppercase text-xs font-bold tracking-widest">OK</button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2025 EZCENTIALS. {t('footer_rights')}</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};