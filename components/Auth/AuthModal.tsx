import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { X } from 'lucide-react';
import { Button } from '../UI/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md p-8 relative shadow-2xl animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X />
        </button>
        
        <h2 className="font-serif text-2xl text-center mb-6">
          {isLogin ? 'Bienvenue' : 'Créer un compte'}
        </h2>

        {error && <div className="bg-red-50 text-red-600 p-3 text-sm mb-4">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-1 text-gray-500">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest mb-1 text-gray-500">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <Button fullWidth type="submit" disabled={loading}>
            {loading ? 'Loading...' : (isLogin ? 'Se Connecter' : "S'inscrire")}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "Pas encore de compte ?" : "Déjà membre ?"}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="ml-2 underline text-brand-black hover:text-brand-gold"
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};