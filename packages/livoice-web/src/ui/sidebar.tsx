import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { cn } from '@/lib/cn';

const sidebarOpenKeysCache: Record<string, boolean> = {};

export interface SidebarNavItem {
  key: string;
  label: string;
  to?: string;
  icon?: ReactNode;
  children?: SidebarNavItem[];
}

export interface SidebarUserAction {
  key: string;
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
  variant?: 'default' | 'danger';
}

export interface SidebarUser {
  name: string;
  email: string;
  avatarUrl?: string | null;
  status?: 'online' | 'offline';
}

interface SidebarProps {
  navItems: SidebarNavItem[];
  user?: SidebarUser | null;
  userActions?: SidebarUserAction[];
}

export function Sidebar({ navItems, user, userActions = [] }: SidebarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>(() => ({ ...sidebarOpenKeysCache }));
  const location = useLocation();

  const isPathActive = useMemo(
    () => (target: string) => !!location.pathname.match(new RegExp(`^${target}(\\/|$)`)),
    [location.pathname]
  );

  const onToggle = (key: string) =>
    setOpenKeys(prev => {
      const next = { ...prev, [key]: !prev[key] };
      sidebarOpenKeysCache[key] = next[key];
      return next;
    });

  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div className="mb-6 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-xl">
            <span className="text-sm font-bold tracking-[0.3em] uppercase">LV</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-900">Livoice</p>
            <p className="text-xs text-slate-500">Call intelligence</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {navItems.map(item => {
          const children = item.children ?? [];
          const childActive = children.some(child => child.to && isPathActive(child.to));
          const hasChildren = children.length > 0;
          const isOpen = hasChildren && (childActive || openKeys[item.key]);
          const selfActive = item.to ? isPathActive(item.to) : false;

          return (
            <div key={item.key} className="flex flex-col gap-1">
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => onToggle(item.key)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/80',
                    selfActive || childActive
                      ? 'border-violet-100 bg-white text-slate-900 shadow-[0_20px_45px_rgba(15,23,42,0.08)]'
                      : 'text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                  <span
                    className={cn(
                      'material-symbols-outlined ml-auto transition-transform duration-200',
                      isOpen ? 'rotate-180' : ''
                    )}
                  >
                    expand_more
                  </span>
                </button>
              ) : item.to ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/80',
                      isActive
                        ? 'border-violet-100 bg-white text-slate-900 shadow-[0_20px_45px_rgba(15,23,42,0.08)]'
                        : 'text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    )
                  }
                >
                  <span className="text-lg text-slate-400 group-hover:text-slate-700">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold text-slate-500">
                  <span className="text-lg text-slate-400">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>
              )}

              {hasChildren && isOpen ? (
                <div className="flex flex-col gap-1 pl-6">
                  {children.map(child => (
                    <NavLink
                      key={child.key}
                      to={child.to ?? '#'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-semibold transition duration-200',
                          isActive
                            ? 'bg-slate-100 text-slate-900'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        )
                      }
                    >
                      <span className="text-base text-slate-400">{child.icon}</span>
                      <span className="truncate">{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      {user ? (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/70 p-3 shadow-[0_15px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
              {user.name?.slice(0, 1) ?? 'U'}
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-900">{user.name ?? 'Unknown user'}</p>
            <p className="text-xs text-slate-500">{user.email ?? 'No email'}</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
      ) : null}

      {userActions.length ? (
        <div className="mt-4 space-y-2">
          {userActions.map(action => (
            <button
              key={action.key}
              type="button"
              onClick={action.onSelect}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:bg-slate-50',
                action.variant === 'danger' ? 'text-rose-600 hover:bg-rose-50' : 'text-slate-600'
              )}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
