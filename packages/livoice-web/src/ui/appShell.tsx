import type { ReactNode } from 'react';

interface AppShellProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <>
      {/* Background blobs - fixed to viewport */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-[#f1dcff] opacity-70 blur-[120px]" />
        <div className="absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-[#ffe5f3] opacity-60 blur-[120px]" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[#c9f5ff] opacity-70 blur-[130px]" />
      </div>

      <div className="relative flex h-screen w-full font-display text-foreground">
        <aside className="w-64 flex-shrink-0 self-stretch p-3 sm:p-4">
          <div className="sticky top-4 h-full w-full">{sidebar}</div>
        </aside>

        <main className="min-h-screen min-w-0 flex-1 flex-col gap-4 p-2 sm:p-3 lg:p-4">
          <div className="relative flex min-h-full flex-col rounded-[32px] border border-white/40 bg-white/60 p-4 shadow-surface backdrop-blur-xl">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
