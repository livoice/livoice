import { signOut } from 'next-auth/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';

import useAuth from '@/providers/auth/useAuth';
import { NAV_ITEMS, type NavItemConfig } from '@/routes/navItems';
import { rootRoute } from '@/routes/routes';
import { toProfile } from '@/services/linker';
import { AppShell, Sidebar, type SidebarNavItem, type SidebarUserAction } from '@/ui';

type NavItemWithLabel = NavItemConfig & { label: string };

const materialIcon = (name: string) => <span className="material-symbols-outlined text-xl">{name}</span>;

export default function Root() {
  const auth = useAuth();
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const accessibleNavItems = useMemo<NavItemWithLabel[]>(
    () =>
      NAV_ITEMS.filter(item => {
        if (!item.routePath) return true;
        const route = rootRoute?.children?.find(routeConfig => routeConfig.path === item.routePath);
        if (!route) return true;
        if (!route.protectedRoute?.permissions) return true;
        return route.protectedRoute.permissions(auth);
      }).map(item => ({
        ...item,
        label: t(item.labelKey)
      })),
    [auth, t]
  );

  const mapToSidebarItem = (item: NavItemWithLabel): SidebarNavItem => ({
    key: item.key,
    label: item.label,
    to: item.path,
    icon: materialIcon(item.icon)
  });

  const primaryItems = accessibleNavItems.filter(item => item.section === 'primary');
  const settingsSection = accessibleNavItems.filter(item => item.section === 'settings');
  const secondaryItems = accessibleNavItems.filter(item => item.section === 'secondary');

  const settingsGroup: SidebarNavItem | null = settingsSection.length
    ? {
        key: 'settings',
        label: t('sidebar.settings'),
        icon: materialIcon('settings'),
        children: settingsSection.map(mapToSidebarItem)
      }
    : null;

  const navItems: SidebarNavItem[] = [
    ...primaryItems.map(mapToSidebarItem),
    ...(settingsGroup ? [settingsGroup] : []),
    ...secondaryItems.map(mapToSidebarItem)
  ];

  const userActions: SidebarUserAction[] = [
    {
      key: 'profile',
      label: t('sidebar.profile'),
      icon: materialIcon('person'),
      onSelect: () => navigate(toProfile())
    },
    {
      key: 'logout',
      label: t('buttons.signOut'),
      icon: materialIcon('logout'),
      variant: 'danger',
      onSelect: signOut
    }
  ];

  return (
    <AppShell
      sidebar={
        <Sidebar
          navItems={navItems}
          user={
            auth.user
              ? {
                  name: auth.user.displayName || auth.user.email || 'User',
                  email: auth.user.email || '',
                  avatarUrl: auth.user.avatarUrl ?? null,
                  status: auth.user.isActive === false ? 'offline' : 'online'
                }
              : null
          }
          userActions={userActions}
        />
      }
    >
      <Outlet />
    </AppShell>
  );
}
