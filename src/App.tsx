/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { TodoItem, ToastMessage } from './types/todo';
import { sounds } from './utils/sound';
import { Header } from './components/Header';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { ToastContainer } from './components/ToastContainer';
import { CodeModal } from './components/CodeModal';
import { RubricModal } from './components/RubricModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'kodluyoruz_todos_enes_ozturk';

// Kodluyoruz Resmi Ödev Başlangıç Görevleri
const DEFAULT_TODOS: TodoItem[] = [
  {
    id: 'default-1',
    text: '3 Litre Su İç',
    completed: false,
    createdAt: Date.now() - 3600000 * 4,
    category: 'saglik',
  },
  {
    id: 'default-2',
    text: 'Ödevleri Tamamla',
    completed: true,
    createdAt: Date.now() - 3600000 * 3,
    category: 'calisma',
  },
  {
    id: 'default-3',
    text: 'En Az 3 Saat Kodlama Yap',
    completed: false,
    createdAt: Date.now() - 3600000 * 2,
    category: 'kodlama',
  },
  {
    id: 'default-4',
    text: 'Yemek Yap',
    completed: false,
    createdAt: Date.now() - 3600000 * 1,
    category: 'genel',
  },
  {
    id: 'default-5',
    text: '50 Sayfa Kitap Oku',
    completed: false,
    createdAt: Date.now() - 1800000,
    category: 'calisma',
  },
];

export default function App() {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore parse error and fallback
    }
    return DEFAULT_TODOS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isRubricModalOpen, setIsRubricModalOpen] = useState(false);

  // Sync to LocalStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('LocalStorage error:', e);
    }
  }, [todos]);

  // Audio mute sync
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playSuccess();
  };

  // Toast dispatch helper
  const addToast = useCallback((title: string, message: string, type: 'success' | 'error' | 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, message, type, timestamp: Date.now() };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after 3.5s
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Element Ekleme Fonksiyonu (newElement)
  const handleAddTodo = (text: string, category: 'genel' | 'kodlama' | 'saglik' | 'calisma' = 'genel') => {
    const newTodo: TodoItem = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      text,
      completed: false,
      createdAt: Date.now(),
      category,
    };

    setTodos((prev) => [newTodo, ...prev]);
    sounds.playSuccess();
    addToast('Harika!', 'Listeye eklendi.', 'success');
  };

  // Hata Toast Bildirimi (Listeye boş ekleme yapamazsınız!)
  const handleErrorToast = (title: string, message: string) => {
    sounds.playError();
    addToast(title, message, 'error');
  };

  // 2. Element Silme Fonksiyonu (removeElement)
  const handleDeleteTodo = (id: string) => {
    const itemToDelete = todos.find((t) => t.id === id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
    sounds.playDelete();
    addToast('Bilgi', `"${itemToDelete?.text || 'Görev'}" silindi.`, 'info');
  };

  // 3. Yapıldı İşaretleme Fonksiyonu (toggleChecked)
  const handleToggleTodo = (id: string) => {
    sounds.playCheck();
    setTodos((prev) => {
      const updated = prev.map((t) => {
        if (t.id === id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      });

      // All completed celebration check!
      const allDone = updated.length > 0 && updated.every((t) => t.completed);
      if (allDone) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#eab308', '#10b981', '#6366f1'],
        });
        setTimeout(() => {
          sounds.playSuccess();
          addToast('Tebrikler! 🎉', 'Tüm görevlerini başarıyla tamamladın!', 'success');
        }, 200);
      }

      return updated;
    });
  };

  // Metin Güncelleme
  const handleUpdateText = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
    addToast('Güncellendi', 'Görev metni güncellendi.', 'info');
  };

  // Tamamlananları Temizleme
  const handleClearCompleted = () => {
    const count = todos.filter((t) => t.completed).length;
    if (count === 0) return;
    setTodos((prev) => prev.filter((t) => !t.completed));
    sounds.playDelete();
    addToast('Temizlendi', `${count} tamamlanmış görev listeden kaldırıldı.`, 'info');
  };

  // Tümünü Tamamla / Geri Al
  const handleToggleAll = () => {
    const hasActive = todos.some((t) => !t.completed);
    setTodos((prev) => prev.map((t) => ({ ...t, completed: hasActive })));
    sounds.playCheck();
    if (hasActive) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
      addToast('Tümü Tamamlandı', 'Tüm görevler yapıldı olarak işaretlendi.', 'success');
    } else {
      addToast('Geri Alındı', 'Tüm görevler yapılmadı durumuna getirildi.', 'info');
    }
  };

  // Kodluyoruz Varsayılan Görevlerine Sıfırla
  const handleResetDefaults = () => {
    setTodos(DEFAULT_TODOS);
    sounds.playSuccess();
    addToast('Sıfırlandı', 'Kodluyoruz başlangıç görevleri geri yüklendi.', 'info');
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Bootstrap Toast Bildirim Konteyneri (Sağ Üst Köşe) */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />

      {/* Ana Kart / Konteyner */}
      <main className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-5 sm:p-8 transition-all">
        {/* Başlık, Sayaç & İlerleme */}
        <Header
          totalCount={todos.length}
          completedCount={completedCount}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
          onOpenRubricModal={() => setIsRubricModalOpen(true)}
        />

        {/* Görev Ekleme Alanı (newElement) */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <TodoInput
            onAddTodo={handleAddTodo}
            onErrorToast={handleErrorToast}
          />
        </div>

        {/* Yapılacaklar Listesi */}
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onUpdateText={handleUpdateText}
          onClearCompleted={handleClearCompleted}
          onToggleAll={handleToggleAll}
          onResetDefaults={handleResetDefaults}
        />
      </main>

      {/* Altbilgi ve İmzalar */}
      <Footer
        todoCount={todos.length}
        completedCount={completedCount}
      />

      {/* Ödev Kodları Modalı (Vanilla JS, HTML, CSS) */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* Değerlendirme Kriterleri Modalı */}
      <RubricModal
        isOpen={isRubricModalOpen}
        onClose={() => setIsRubricModalOpen(false)}
        onTestEmpty={() => handleErrorToast('Hata!', 'Listeye boş ekleme yapamazsınız!')}
        onTestValid={() => handleAddTodo('Enes Öztürk Örnek Görevi', 'kodlama')}
      />
    </div>
  );
}
