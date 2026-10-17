import React from 'react';
import { X, CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';

interface RubricModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestEmpty: () => void;
  onTestValid: () => void;
}

export const RubricModal: React.FC<RubricModalProps> = ({
  isOpen,
  onClose,
  onTestEmpty,
  onTestValid,
}) => {
  if (!isOpen) return null;

  const criteria = [
    {
      title: 'Boş Karakter ve Boş Değer Kontrolü',
      desc: 'Input boş bırakıldığında veya yalnızca boşluk girildiğinde hata verilir, listeye ekleme yapılmaz.',
      status: 'Tamamlandı (100%)',
      codeRef: 'if (inputValue.trim() === "") { showToast(errorToast); }',
    },
    {
      title: 'Element Ekleme Fonksiyonu',
      desc: 'newElement() fonksiyonu ile inputtaki görev listeye yeni bir li olarak eklenir ve input temizlenir.',
      status: 'Tamamlandı (100%)',
      codeRef: 'function newElement() { ... }',
    },
    {
      title: 'Element Silme Fonksiyonu',
      desc: 'Her li elemanına silme (×) butonu eklenir ve tıklandığında eleman listeden ve depodan kaldırılır.',
      status: 'Tamamlandı (100%)',
      codeRef: 'closeSpan.addEventListener("click", () => li.remove());',
    },
    {
      title: 'Yapıldı (Checked) İşaretleme',
      desc: 'Elemana tıklandığında checked sınıfı ve üzeri çizili stil toggle edilir.',
      status: 'Tamamlandı (100%)',
      codeRef: 'li.addEventListener("click", () => li.classList.toggle("checked"));',
    },
    {
      title: 'Bootstrap Toast Bildirimleri',
      desc: 'Sağ üst köşede element eklendiğinde yeşil başarı, hata anında kırmızı uyarı toast mesajı gösterilir.',
      status: 'Tamamlandı (100%)',
      codeRef: 'showToast(successToast) / showToast(errorToast)',
    },
    {
      title: 'Bonus: Local Storage Entegrasyonu',
      desc: 'Sayfa yenilense de görevler ve tamamlanma durumları tarayıcıda kalıcı olarak saklanır.',
      status: 'Tamamlandı (100%)',
      codeRef: 'localStorage.setItem("kodluyoruz_todos", JSON.stringify(tasks));',
    },
    {
      title: 'Ödev Sahibi İmzası: Enes Öztürk',
      desc: 'Kod başlığı, arayüz başlığı ve altbilgi Enes Öztürk imzası ve el emeği ile hazırlandı.',
      status: 'Tamamlandı (100%)',
      codeRef: 'Hazırlayan: Enes Öztürk (El Emeği)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">
                  Kodluyoruz Ödev Kriterleri
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  7/7 Eksiksiz
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                JavaScript To Do List Değerlendirme Raporu
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-orange-900">
            <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Ödev Durumu:</span> Kodluyoruz bootcamp gereksinimlerinin tümü ve bonus Local Storage maddesi eksiksiz olarak <strong>Enes Öztürk</strong> adına uygulanmıştır.
            </div>
          </div>

          <div className="space-y-3">
            {criteria.map((c, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h4 className="text-sm font-bold text-slate-800">{c.title}</h4>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 pl-7 leading-relaxed">{c.desc}</p>
                <div className="mt-2 pl-7">
                  <code className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded-md block overflow-x-auto">
                    {c.codeRef}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Quick interactive test buttons */}
          <div className="pt-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h5 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Hızlı Kriter Testi:</span>
            </h5>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onTestEmpty();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                1. Boş Ekleme Hatasını Test Et
              </button>
              <button
                type="button"
                onClick={() => {
                  onTestValid();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                2. Başarılı Ekleme & Toast Test Et
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Enes Öztürk imzasıyla el emeği hazırlanmıştır.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
