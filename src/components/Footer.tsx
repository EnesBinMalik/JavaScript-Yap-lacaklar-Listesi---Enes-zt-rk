import React from 'react';
import { Heart, Database, CheckCircle, Sparkles } from 'lucide-react';

interface FooterProps {
  todoCount: number;
  completedCount: number;
}

export const Footer: React.FC<FooterProps> = ({ todoCount, completedCount }) => {
  return (
    <footer className="w-full mt-12 pt-8 pb-10 border-t border-slate-200 text-center">
      <div className="max-w-md mx-auto space-y-3">
        {/* Signature Box */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200/90 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs text-slate-600">
            Bu ödev{' '}
            <strong className="text-orange-600 font-bold">Enes Öztürk</strong>{' '}
            imzasıyla el emeği hazırlanmıştır
          </span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
        </div>

        {/* Local Storage Indicator */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Database className="w-3.5 h-3.5 text-indigo-500" />
            LocalStorage Aktif
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            {completedCount} / {todoCount} Görev Tamamlandı
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          Kodluyoruz JavaScript To Do List Ödevi • Patika.dev & Web Geliştirme Eğitimi
        </p>
      </div>
    </footer>
  );
};
