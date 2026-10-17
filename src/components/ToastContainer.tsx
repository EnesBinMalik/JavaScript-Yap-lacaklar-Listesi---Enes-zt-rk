import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types/todo';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto rounded-xl p-4 shadow-xl border backdrop-blur-md flex items-start gap-3 transition-all ${
                isSuccess
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-50'
                  : isError
                  ? 'bg-rose-950/90 border-rose-500/40 text-rose-50'
                  : 'bg-slate-900/90 border-slate-700/60 text-slate-100'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isSuccess
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : isError
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}
              >
                {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                {isError && <AlertTriangle className="w-5 h-5" />}
                {!isSuccess && !isError && <Info className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold tracking-wide">
                    {toast.title}
                  </h4>
                  <span className="text-[10px] opacity-60 font-mono">şimdi</span>
                </div>
                <p className="text-xs mt-0.5 opacity-90 leading-relaxed break-words">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => onRemoveToast(toast.id)}
                className="shrink-0 p-1 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Bildirimi Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
