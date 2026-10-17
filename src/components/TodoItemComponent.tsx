import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Trash2, Edit3, X, CheckCheck } from 'lucide-react';
import { TodoItem } from '../types/todo';

interface TodoItemProps {
  item: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateText: (id: string, newText: string) => void;
}

export const TodoItemComponent: React.FC<TodoItemProps> = ({
  item,
  onToggle,
  onDelete,
  onUpdateText,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== item.text) {
      onUpdateText(item.id, trimmed);
    } else {
      setEditText(item.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditText(item.text);
      setIsEditing(false);
    }
  };

  const categoryBadge = {
    kodlama: { label: 'Kodlama', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    saglik: { label: 'Sağlık', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    calisma: { label: 'Çalışma', bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    genel: { label: 'Genel', bg: 'bg-slate-100 text-slate-600 border-slate-200' },
  }[item.category || 'genel'];

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 select-none ${
        item.completed
          ? 'bg-slate-50/90 border-slate-200 text-slate-400'
          : 'bg-white border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-md hover:shadow-orange-500/5 text-slate-800'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-2">
        {/* Checkbox button */}
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
            item.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs shadow-emerald-500/30'
              : 'border-slate-300 hover:border-orange-500 group-hover:scale-105 bg-white'
          }`}
          title={item.completed ? 'Tamamlandı olarak işaretlendi (Geri al)' : 'Görevi tamamla'}
        >
          {item.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Text content or edit input */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full px-2.5 py-1 text-sm rounded-lg border-2 border-orange-500 focus:outline-hidden font-medium text-slate-800"
              />
              <button
                type="button"
                onClick={handleSaveEdit}
                className="p-1 rounded-md bg-emerald-500 text-white hover:bg-emerald-600"
                title="Kaydet"
              >
                <CheckCheck className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditText(item.text);
                  setIsEditing(false);
                }}
                className="p-1 rounded-md bg-slate-200 text-slate-600 hover:bg-slate-300"
                title="İptal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => onToggle(item.id)}
              className="cursor-pointer"
            >
              <p
                className={`text-sm sm:text-base font-medium break-words transition-all ${
                  item.completed
                    ? 'line-through text-slate-400 italic'
                    : 'text-slate-800'
                }`}
              >
                {item.text}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {item.category && item.category !== 'genel' && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryBadge.bg}`}
                  >
                    {categoryBadge.label}
                  </span>
                )}
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(item.createdAt).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                {item.completed && (
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                    ✓ Tamamlandı
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons (Close / Edit / Delete) */}
      <div className="flex items-center gap-1 shrink-0">
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
            title="Görevi Düzenle"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        )}

        {/* Sil Butonu (Kodluyoruz Classic Close Span '×' style) */}
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center justify-center cursor-pointer"
          title="Görevi Sil (removeElement)"
        >
          <Trash2 className="w-4 h-4 sm:hidden" />
          <span className="hidden sm:inline font-bold text-xl leading-none text-slate-400 hover:text-rose-600 px-1">
            ×
          </span>
        </button>
      </div>
    </motion.li>
  );
};
