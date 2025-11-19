import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Globe, User as UserIcon, LogOut } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES, LANGUAGES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../Auth/AuthModal';
import { SearchOverlay } from '../UI/SearchOverlay';

export const Header: React.FC = () => {
  const { language, setLanguage, t, cartCount, toggleCart } = useShop();
  const { user, signOut } = useAuth();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const currentFlag = LANGUAGES.find(l => l.code === language)?.flag;

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-black/10 backdrop-blur-md py-4 text-white'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Mobile Menu Button */}
          <button className={`lg:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <Link to="/" className={`text-2xl font-serif font-bold tracking-[0.2em] ${isScrolled ? 'text-black' : 'text-white'}`}>
            EZCENTIALS
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex gap-8 text-xs uppercase tracking-[0.15em] font-medium ${isScrolled ? 'text-black' : 'text-white'}`}>
            {CATEGORIES.slice(0, 5).map(cat => (
              <Link key={cat.id} to={cat.path} className="hover:text-brand-gold transition-colors relative group">
                {cat.label[language]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={`flex items-center gap-6 ${isScrolled ? 'text-black' : 'text-white'}`}>
            
            {/* Language Switcher */}
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 hover:opacity-70">
                <span className="text-xl shadow-sm rounded-full">{currentFlag}</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black border shadow-lg p-2 flex flex-col gap-2 min-w-[140px] animate-fade-in rounded-sm">
                  {LANGUAGES.map(lang => (
                    <button 
                      key={lang.code} 
                      onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                      className={`text-left px-2 py-1 hover:bg-gray-100 flex items-center gap-2 text-sm ${language === lang.code ? 'font-bold text-brand-gold' : ''}`}
                    >
                      <span>{lang.flag}</span> {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <button onClick={() => setIsSearchOpen(true)}>
               <Search className="w-5 h-5 cursor-pointer hover:text-brand-gold transition-colors" />
            </button>

            {/* User Auth */}
            {user ? (
              <div className="relative group">
                <UserIcon className="w-5 h-5 cursor-pointer text-brand-gold" />
                <div className="absolute right-0 mt-2 w-32 bg-white text-black shadow-lg rounded-sm p-2 hidden group-hover:block animate-fade-in">
                  <div className="text-xs px-2 py-1 border-b mb-1 truncate font-bold">{user.email}</div>
                  <button onClick={() => signOut()} className="w-full text-left flex items-center gap-2 px-2 py-1 hover:bg-gray-100 text-sm">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsAuthOpen(true)}>
                <UserIcon className="w-5 h-5 cursor-pointer hover:text-brand-gold transition-colors" />
              </button>
            )}

            {/* Cart */}
            <button onClick={toggleCart} className="relative hover:text-brand-gold transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white text-black border-t h-screen p-6 overflow-y-auto animate-slide-up">
            <nav className="flex flex-col gap-6 text-lg uppercase tracking-widest">
              <Link to="/" className="font-bold" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              {CATEGORIES.map(cat => (
                <Link key={cat.id} to={cat.path} onClick={() => setIsMobileMenuOpen(false)}>
                  {cat.label[language]}
                </Link>
              ))}
              <hr />
              {user ? (
                <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-left">Logout</button>
              ) : (
                <button onClick={() => { setIsAuthOpen(true); setIsMobileMenuOpen(false); }} className="text-left">Login / Register</button>
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};