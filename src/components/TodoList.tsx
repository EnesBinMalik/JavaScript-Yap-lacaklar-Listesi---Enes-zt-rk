import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  Search,
  RotateCcw,
  Trash2,
  CheckCheck,
  Inbox,
  Filter,
} from 'lucide-react';
import { TodoItem, FilterType } from '../types/todo';
import { TodoItemComponent } from './TodoItemComponent';

interface TodoListProps {
  todos: TodoItem[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateText: (id: string, text: string) => void;
  onClearCompleted: () => void;
  onToggleAll: () => void;
  onResetDefaults: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onUpdateText,
  onClearCompleted,
  onToggleAll,
  onResetDefaults,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  // Filtered and searched list
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase().trim());
    if (!matchesSearch) return false;

    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tümü ({todos.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'active'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Yapılacaklar ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'completed'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tamamlananlar ({completedCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Görev ara..."
            className="w-full h-9 pl-9 pr-8 text-xs font-medium rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-orange-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main List Element (Uses Kodluyoruz #list id for exact compatibility) */}
      <ul id="list" className="space-y-2.5 list-none p-0 m-0">
        <AnimatePresence mode="popLayout">
          {filteredTodos.map((item) => (
            <TodoItemComponent
              key={item.id}
              item={item}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
              onUpdateText={onUpdateText}
            />
          ))}
        </AnimatePresence>
      </ul>

      {/* Empty State */}
      {filteredTodos.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center my-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-3">
            {searchQuery ? <Filter className="w-6 h-6" /> : <Inbox className="w-6 h-6" />}
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {searchQuery
              ? `"${searchQuery}" ile eşleşen görev bulunamadı`
              : filter === 'completed'
              ? 'Henüz tamamlanan bir görev yok'
              : filter === 'active'
              ? 'Harika! Yapılacak aktif görev kalmadı'
              : 'Listeniz şu anda boş'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'Arama teriminizi değiştirebilir veya arama filtresini temizleyebilirsiniz.'
              : 'Yeni bir görev ekleyerek veya başlangıç listesini yükleyerek hemen başlayın.'}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Aramayı Temizle
              </button>
            ) : (
              <button
                type="button"
                onClick={onResetDefaults}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Kodluyoruz Varsayılanlarını Yükle</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bulk Action Buttons */}
      {todos.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 px-1 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleAll}
              className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded-lg hover:bg-slate-200/70 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{activeCount > 0 ? 'Tümünü Tamamla' : 'Tümünü Geri Al'}</span>
            </button>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={onClearCompleted}
                className="text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tamamlananları Sil ({completedCount})</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onResetDefaults}
            className="text-slate-500 hover:text-slate-800 font-medium px-2 py-1 rounded-lg hover:bg-slate-200/70 transition-colors flex items-center gap-1 cursor-pointer"
            title="Kodluyoruz örnek listesini geri yükler"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Sıfırla</span>
          </button>
        </div>
      )}
    </div>
  );
};
