import React, { useState } from 'react';
import { X, Copy, Check, FileCode2, Terminal, ExternalLink } from 'lucide-react';
import { VANILLA_JS_CODE, VANILLA_HTML_CODE, VANILLA_CSS_CODE } from '../utils/vanillaCode';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'js' | 'html' | 'css'>('js');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode =
    activeTab === 'js'
      ? VANILLA_JS_CODE
      : activeTab === 'html'
      ? VANILLA_HTML_CODE
      : VANILLA_CSS_CODE;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Ödev Kaynak Kodları (Vanilla JS & HTML)</span>
                <span className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Enes Öztürk İmzalı
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Kodluyoruz ödev teslimi veya GitHub deposu için hazır saf JavaScript dosyaları
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection & Copy Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('js')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'js'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              todolist.js (Temel Ödev)
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'html'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                activeTab === 'css'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              style.css
            </button>
          </div>

          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20'
                : 'bg-white hover:bg-slate-100 text-slate-900'
            }`}
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-6 bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
          <pre className="whitespace-pre-wrap">{currentCode}</pre>
        </div>

        {/* Modal Footer Notes */}
        <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-orange-400" />
            <span>
              Bu kodları ayrı bir klasörde <code className="text-amber-300">index.html</code>,{' '}
              <code className="text-amber-300">todolist.js</code> ve{' '}
              <code className="text-amber-300">style.css</code> olarak kaydedip açabilirsiniz.
            </span>
          </div>
          <span className="font-semibold text-slate-300">Enes Öztürk • Kodluyoruz Ödevi</span>
        </div>
      </div>
    </div>
  );
};
