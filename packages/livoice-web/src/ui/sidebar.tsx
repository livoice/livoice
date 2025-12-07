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
    <div className="flex h-full w-full flex-col justify-between rounded-2xl border border-white/40 bg-white/60 p-3 shadow-surface backdrop-blur-xl">
      <div className="sticky top-3 z-10 mb-4 rounded-2xl border border-white/30 bg-white/70 p-3 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-primary">waves</span>
          <div>
            <p className="text-base font-semibold text-foreground leading-none">FlowLeave</p>
            <p className="text-xs text-muted-foreground">Time off workspace</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-1 pb-2">
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
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 text-left',
                    childActive || selfActive
                      ? 'bg-white text-primary shadow-sm font-medium'
                      : 'text-muted-foreground hover:bg-foreground/5'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                  <span
                    className={cn(
                      'material-symbols-outlined ml-auto text-base transition-transform duration-200',
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
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200',
                      isActive
                        ? 'bg-white text-primary shadow-sm font-medium'
                        : 'text-muted-foreground hover:bg-foreground/5'
                    )
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ) : (
                <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground">
                  <span className="text-lg">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </div>
              )}

              {hasChildren && isOpen ? (
                <div className="flex flex-col gap-1 pl-4">
                  {children.map(child => (
                    <NavLink
                      key={child.key}
                      to={child.to ?? '#'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200',
                          isActive
                            ? 'bg-primary/5 text-primary font-medium'
                            : 'hover:bg-foreground/5 hover:text-foreground'
                        )
                      }
                    >
                      <span className="text-base">{child.icon}</span>
                      <span className="truncate">{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="relative mt-4 rounded-2xl border border-white/40 bg-white/60 p-3 shadow-surface">
        <button
          type="button"
          onClick={() => setUserMenuOpen(prev => !prev)}
          className="flex w-full items-center gap-3 rounded-xl text-left transition hover:bg-white"
        >
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">
              {user?.name?.slice(0, 1) ?? 'U'}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{user?.name ?? 'Unknown user'}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email ?? 'No email'}</p>
          </div>
          <span
            className={cn(
              'material-symbols-outlined text-xl text-muted-foreground transition-transform duration-200',
              userMenuOpen ? 'rotate-180' : ''
            )}
          >
            expand_more
          </span>
        </button>

        {userMenuOpen && userActions.length ? (
          <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl border border-white/60 bg-white/90 p-1 shadow-xl backdrop-blur-md">
            {userActions.map(action => (
              <button
                key={action.key}
                type="button"
                onClick={action.onSelect}
                className={cn(
                  'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition',
                  action.variant === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-foreground hover:bg-foreground/5'
                )}
              >
                <span className="text-lg">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
