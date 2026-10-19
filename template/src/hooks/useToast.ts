import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

type ToastVariant = 'info' | 'success' | 'warning' | 'error';

type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
  durationMs: number;
};

type ToastState = {
  toasts: Toast[];
  show: (message: string, opts?: Partial<Omit<Toast, 'id' | 'message'>>) => string;
  dismiss: (id: string) => void;
  clear: () => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (message, opts = {}) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const toast: Toast = {
      id,
      message,
      variant: opts.variant ?? 'info',
      durationMs: opts.durationMs ?? 3500,
    };
    set(state => ({ toasts: [...state.toasts, toast] }));
    if (toast.durationMs > 0) {
      setTimeout(() => {
        if (get().toasts.find(t => t.id === id)) {
          get().dismiss(id);
        }
      }, toast.durationMs);
    }
    return id;
  },
  dismiss: id => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
  clear: () => set({ toasts: [] }),
}));

/** Imperative API for non-component call sites. */
export const toast = {
  show: (message: string, opts?: Partial<Omit<Toast, 'id' | 'message'>>) =>
    useToastStore.getState().show(message, opts),
  success: (message: string) => useToastStore.getState().show(message, { variant: 'success' }),
  error: (message: string) => useToastStore.getState().show(message, { variant: 'error' }),
  warning: (message: string) => useToastStore.getState().show(message, { variant: 'warning' }),
  info: (message: string) => useToastStore.getState().show(message, { variant: 'info' }),
  dismiss: (id: string) => useToastStore.getState().dismiss(id),
  clear: () => useToastStore.getState().clear(),
};

/** Hook for components. */
export function useToasts() {
  return useToastStore(
    useShallow(state => ({
      toasts: state.toasts,
      dismiss: state.dismiss,
      clear: state.clear,
    })),
  );
}
