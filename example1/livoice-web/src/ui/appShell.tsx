import type { ReactNode } from 'react';

interface AppShellProps {
  sidebar?: ReactNode;
  children: ReactNode;
}

export const AppShell = ({ sidebar, children }: AppShellProps) => (
  <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 right-6 h-64 w-64 rounded-full bg-violet-500/30 blur-[180px]" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/40 blur-[220px]" />
    </div>
    <div className="relative z-10 flex min-h-screen">
      {sidebar}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
      </main>
    </div>
  </div>
);
