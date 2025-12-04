import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { NAV_ITEMS } from '@/routes/navItems';
import { AppShell } from '@/ui/appShell';
import type { SidebarNavItem } from '@/ui/sidebar';
import { Sidebar } from '@/ui/sidebar';

const Root = () => {
  const { t } = useTranslation('common');

  const navItems = useMemo<SidebarNavItem[]>(
    () =>
      NAV_ITEMS.map(item => ({
        key: item.key,
        label: t(item.labelKey),
        to: item.path,
        icon: item.icon
      })),
    [t]
  );

  return (
    <AppShell sidebar={<Sidebar navItems={navItems} />}>
      <Outlet />
    </AppShell>
  );
};

export default Root;
