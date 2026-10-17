import React, { useState, useRef, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (text: string, category?: 'genel' | 'kodlama' | 'saglik' | 'calisma') => void;
  onErrorToast: (title: string, message: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo, onErrorToast }) => {
  const [text, setText] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [category, setCategory] = useState<'genel' | 'kodlama' | 'saglik' | 'calisma'>('genel');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = text.trim();

    // Kodluyoruz Şartı: Boş karakter eklenemez, hiçbir şey yazılmadığında da aynı hatayı verir
    if (!trimmed || trimmed.length === 0) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      onErrorToast('Hata!', 'Listeye boş ekleme yapamazsınız!');
      inputRef.current?.focus();
      return;
    }

    onAddTodo(trimmed, category);
    setText('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`relative flex flex-col sm:flex-row items-stretch gap-2.5 transition-transform duration-200 ${
          isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            id="task"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Bugün ne yapacaksın?"
            className="w-full h-13 pl-4 pr-12 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 placeholder-slate-400 font-medium text-base focus:outline-hidden focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 shadow-sm transition-all"
          />
          {text.length > 0 && (
            <button
              type="button"
              onClick={() => setText('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              title="Temizle"
            >
              ✕
            </button>
          )}
        </div>

        {/* Ekle Butonu */}
        <button
          type="submit"
          id="liveToastBtn"
          className="h-13 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Ekle</span>
        </button>
      </form>

      {/* Quick category selectors & helpful hint */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <span className="font-semibold text-slate-600">Kategori:</span>
          {(
            [
              { id: 'genel', label: 'Genel', color: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
              { id: 'kodlama', label: '💻 Kodlama', color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
              { id: 'saglik', label: '🏃 Sağlık', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
              { id: 'calisma', label: '📚 Çalışma', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                category === cat.id
                  ? 'bg-slate-900 text-white shadow-xs font-semibold ring-2 ring-slate-900/20'
                  : cat.color
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Enter tuşu ile hızlı ekleyin</span>
        </div>
      </div>
    </div>
  );
};
