import { useContext } from 'react';
import { createContext } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

interface ToastContextType {
  showToast: (message: string, severity?: ToastSeverity) => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {}
});


const severityStyles: Record<ToastSeverity, string> = {
  success: 'border-success/50 bg-success/10 text-success-foreground',
  error: 'border-destructive/50 bg-destructive/10 text-destructive',
  warning: 'border-warning/50 bg-warning/10 text-warning',
  info: 'border-secondary/50 bg-secondary/10 text-secondary-foreground'
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<ToastSeverity>('info');

  const showToast = useCallback((newMessage: string, newSeverity: ToastSeverity = 'info') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => setOpen(false), 6000);
    return () => window.clearTimeout(timer);
  }, [open]);

  const ariaSeverityText = useMemo(() => `${severity} toast`, [severity]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {open ? (
        <div className="fixed bottom-6 right-6 z-50 flex max-w-sm">
          <div
            role="status"
            aria-live="polite"
            aria-label={ariaSeverityText}
            className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md ${severityStyles[severity]}`}
          >
            <p className="flex-1 text-sm leading-relaxed">{message}</p>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-1 text-sm text-muted-foreground transition hover:text-foreground focus-visible:outline-none"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        </div>
      ) : null}
    </ToastContext.Provider>
  );
};


