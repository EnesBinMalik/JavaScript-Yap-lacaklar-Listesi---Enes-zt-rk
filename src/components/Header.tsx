import React from 'react';
import { CheckCheck, Code2, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  completedCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCodeModal: () => void;
  onOpenRubricModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  completedCount,
  soundEnabled,
  onToggleSound,
  onOpenCodeModal,
  onOpenRubricModal,
}) => {
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <header className="w-full">
      {/* Top Navbar with Signature & Tools */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 font-extrabold text-xl tracking-tight">
              K
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                Kodluyoruz
              </span>
              <span className="text-xs text-slate-500 font-medium">JavaScript Ödevi</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              To Do List
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border ${
              soundEnabled
                ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-sm'
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-600'
            }`}
            title={soundEnabled ? 'Ses Açık (Kapatmak için tıklayın)' : 'Ses Kapalı (Açmak için tıklayın)'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Ses Açık' : 'Sessiz'}</span>
          </button>

          {/* Rubric Criteria Modal */}
          <button
            onClick={onOpenRubricModal}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-all flex items-center gap-1.5 shadow-sm"
            title="Ödev Kriter Kontrolü (6/6 Tam)"
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Kriterler</span>
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              6/6
            </span>
          </button>

          {/* Pure Vanilla JS Code Modal */}
          <button
            onClick={onOpenCodeModal}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm shadow-slate-900/10"
            title="Saf JavaScript ve HTML Ödev Kodunu Görüntüle"
          >
            <Code2 className="w-4 h-4 text-amber-400" />
            <span>Ödev Kodları</span>
          </button>
        </div>
      </div>

      {/* Main Banner / Author Dedication */}
      <div className="pt-6 pb-2 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-indigo-500/10 border border-orange-200/70 text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Hazırlayan:</span>
          <span className="font-bold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-md">
            Enes Öztürk
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">El Emeği</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Bugün Neler Yapacaksın?
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Günlük hayatta yapacağınız işleri aklınızda tutmak zor oluyorsa listenizi hemen oluşturun.
          Tüm verileriniz otomatik olarak saklanır.
        </p>

        {/* Progress Bar & Stats */}
        {totalCount > 0 && (
          <div className="mt-5 max-w-md mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <CheckCheck className="w-4 h-4 text-emerald-600" />
                İlerleme Durumu
              </span>
              <span className="font-mono text-slate-500">
                <strong className="text-slate-800 font-bold">{completedCount}</strong> / {totalCount} ({percent}%)
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  percent === 100
                    ? 'bg-emerald-500'
                    : percent > 50
                    ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                    : 'bg-gradient-to-r from-indigo-500 to-orange-500'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
            {percent === 100 && (
              <p className="text-[11px] text-emerald-700 font-medium mt-1.5 flex items-center justify-center gap-1 animate-bounce">
                🎉 Harika! Bugünkü tüm görevleri tamamladın!
              </p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
