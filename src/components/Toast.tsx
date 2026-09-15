import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Heart, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100 animate-bounce">
      <div 
        id="app-toast-alert"
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md pointer-events-auto max-w-md ${
          toast.type === 'heart'
            ? 'bg-rose-50/95 border-rose-200 text-rose-800 shadow-rose-100'
            : toast.type === 'success'
            ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800 shadow-emerald-100'
            : 'bg-stone-900/90 border-stone-800 text-stone-100 shadow-stone-300'
        }`}
      >
        {toast.type === 'heart' && (
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-500 animate-pulse">
            <Heart className="w-4 h-4 fill-rose-500" />
          </div>
        )}
        {toast.type === 'success' && (
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
        {toast.type === 'info' && (
          <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center shrink-0 text-stone-300">
            <Info className="w-4 h-4" />
          </div>
        )}
        <div className="text-sm font-medium leading-snug">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
