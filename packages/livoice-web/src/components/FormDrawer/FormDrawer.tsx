import type { FormEventHandler, ReactNode } from 'react';

import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/ui';

interface FormDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function FormDrawer({ open, onClose, title, children, actions = null, onSubmit }: FormDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={value => (!value ? onClose() : null)}>
      <SheetContent side="right" className="w-full sm:max-w-lg h-full overflow-y-auto p-0">
        <form onSubmit={onSubmit} className="flex min-h-full flex-col">
          <SheetHeader className="sticky top-0 z-20 w-full bg-white/20 backdrop-blur-lg px-6 py-5 mb-0">
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 px-6 py-4">{children}</div>
          {actions ? (
            <SheetFooter className="sticky bottom-0 z-20 mt-auto w-full border-t border-white/30 bg-white/20 backdrop-blur-lg px-6 py-4">
              {actions}
            </SheetFooter>
          ) : null}
        </form>
      </SheetContent>
    </Sheet>
  );
}
