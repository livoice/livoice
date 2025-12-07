import type { ReactNode } from 'react';

interface AppShellProps {
  sidebar?: ReactNode;
  children: ReactNode;
}

export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-6 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-[180px]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/40 blur-[220px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <div className="w-72 flex-shrink-0 px-4 py-8">{sidebar}</div>
        <main className="flex flex-1 flex-col px-6 py-8">
          <div className="mx-auto w-full max-w-6xl space-y-6 rounded-[32px] border border-white/50 bg-white/80 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
