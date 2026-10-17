export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category?: 'genel' | 'kodlama' | 'saglik' | 'calisma';
}

export type FilterType = 'all' | 'active' | 'completed';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: number;
}
