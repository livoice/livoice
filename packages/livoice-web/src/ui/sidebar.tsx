import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { cn } from '../lib/cn';

export interface SidebarNavItem {
  key: string;
  label: string;
  to: string;
  icon?: ReactNode;
  children?: SidebarNavItem[];
}

export interface SidebarUserAction {
  key: string;
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'danger';
  onSelect: () => void;
}

interface SidebarProps {
  navItems: SidebarNavItem[];
  userActions?: SidebarUserAction[];
}

export const Sidebar = ({ navItems, userActions = [] }: SidebarProps) => (
  <aside className="flex w-72 min-h-screen flex-col border-r-2 border-white/80 bg-white/95 px-6 py-8 text-slate-600 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur">
    <div className="mb-8 border-b border-slate-100 pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-sm">
          <span className="text-sm font-bold tracking-[0.3em] uppercase">LV</span>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900">Livoice</p>
          <p className="text-xs text-slate-500">Call intelligence</p>
        </div>
      </div>
    </div>

    <nav className="flex-1 space-y-2">
      {navItems.map(navItem => (
        <NavItem key={navItem.key} navItem={navItem} />
      ))}
    </nav>

    {userActions.length ? (
      <div className="mt-auto space-y-2 pt-6">
        {userActions.map(action => (
          <button
            key={action.key}
            type="button"
            onClick={action.onSelect}
            className={cn(
              'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition',
              action.variant === 'danger'
                ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            )}
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    ) : null}
  </aside>
);

const NavItem = ({ navItem }: { navItem: SidebarNavItem }) => (
  <NavLink
    to={navItem.to}
    className={({ isActive }) =>
      cn(
        'flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/80',
        isActive
          ? 'border-violet-200 bg-slate-900/5 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.18)]'
          : 'text-slate-600 hover:border-violet-100 hover:bg-slate-100 hover:text-slate-900'
      )
    }
  >
    {navItem.icon}
    <span>{navItem.label}</span>
  </NavLink>
);
