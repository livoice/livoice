import type { ReactNode } from 'react';

import { Button } from '@/ui';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  variant?: 'default' | 'delete';
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant = 'default',
  isLoading = false,
  onClose,
  onConfirm,
  children
}: ConfirmDialogProps) {
  if (!open) return null;

  const handleOverlayClick = () => {
    if (!isLoading) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/60 bg-white/95 p-6 shadow-elevated"
        onClick={event => event.stopPropagation()}
      >
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          {children}
        </div>
        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" className="flex-1" disabled={isLoading} onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            className="flex-1"
            variant={variant === 'delete' ? 'destructive' : 'default'}
            disabled={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
