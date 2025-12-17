import { format, formatDistanceToNow } from 'date-fns';
import { parseAsString, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router';

import { useGetAllUsersQuery, useProjectsQuery, UserRoleType, type GetAllUsersQuery } from '@/gql/generated';
import { useAuth } from '@/hooks/auth/useAuth';
import { canEditUserByRole } from '@/hooks/auth/userRole';
import { toUserCreate, toUserEdit } from '@/services/linker';
import {
  Badge,
  Button,
  Card,
  CardContent,
  PageHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextField
} from '@/ui';

type UserListItem = NonNullable<NonNullable<GetAllUsersQuery['users']>[number]>;
type ViewMode = 'grid' | 'list';

const Spinner = () => (
  <div className="flex min-h-[200px] items-center justify-center">
    <span className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
  </div>
);

const iconButtonClass = (active: boolean) =>
  [
    'rounded-full px-3 py-2 text-sm transition-all duration-200',
    active ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:bg-white'
  ].join(' ');

export default function Users() {
  const { t } = useTranslation('common');
  const { isAnyAdmin, isSelf, user: authUser } = useAuth();
  const navigate = useNavigate();
  const { data, loading } = useGetAllUsersQuery();
  const { data: projectsData } = useProjectsQuery();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [roleFilter, setRoleFilter] = useQueryState('role', parseAsString.withDefault('ALL'));
  const [projectFilter, setProjectFilter] = useQueryState('project', parseAsString.withDefault('ALL'));
  const [isActiveFilter, setIsActiveFilter] = useQueryState('status', parseAsString.withDefault('ALL'));

  const users: UserListItem[] = useMemo(() => {
    const list = (data?.users ?? []).filter((candidate): candidate is UserListItem => Boolean(candidate));
    const term = search?.trim().toLowerCase() ?? '';

    return list.filter(user => {
      if (term) {
        const fullName = (user?.displayName || '').toLowerCase();
        const email = (user?.email ?? '').toLowerCase();
        if (!fullName.includes(term) && !email.includes(term)) return false;
      }

      if (roleFilter && roleFilter !== 'ALL' && user?.role !== roleFilter) return false;
      if (projectFilter && projectFilter !== 'ALL' && user?.project?.id !== projectFilter) return false;
      if (isActiveFilter === 'ACTIVE' && user?.isActive !== true) return false;
      if (isActiveFilter === 'DEACTIVATED' && user?.isActive !== false) return false;

      return true;
    });
  }, [data?.users, search, roleFilter, projectFilter, isActiveFilter]);

  const formatRole = (role: UserRoleType | null | undefined) => {
    if (!role) return t('users.unknown');
    const roleMap: Record<UserRoleType, string> = {
      [UserRoleType.User]: t('users.roles.user'),
      [UserRoleType.LocationAdmin]: t('users.roles.locationAdmin'),
      [UserRoleType.OrgAdmin]: t('users.roles.orgAdmin'),
      [UserRoleType.OrgOwner]: t('users.roles.orgOwner'),
      [UserRoleType.God]: t('users.roles.god')
    };
    return roleMap[role] ?? role;
  };

  const formatSeenAt = (seenAt: string | null | undefined) => {
    if (!seenAt) return t('users.never');
    try {
      return formatDistanceToNow(new Date(seenAt), { addSuffix: true });
    } catch {
      return t('users.unknown');
    }
  };

  const formatProvisionedAt = (provisionedAt: string | null | undefined) => {
    if (!provisionedAt) return t('users.unknown');
    try {
      return format(new Date(provisionedAt), 'MMM yyyy');
    } catch {
      return t('users.unknown');
    }
  };

  const canEditUser = (user: UserListItem) => {
    if (!isAnyAdmin() || isSelf(user)) return false;
    return canEditUserByRole(authUser, user);
  };

  const renderAvatar = (user: UserListItem) => {
    const fallback = (user?.displayName || user?.email || '?')
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
    if (user?.avatarUrl)
      return (
        <img
          src={user.avatarUrl}
          alt={user.displayName ?? ''}
          className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-md"
        />
      );
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary shadow-inner">
        {fallback}
      </div>
    );
  };

  const renderGrid = () => (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {users.map(user => {
        const isDeactivated = user?.isActive === false;
        const fullName = user?.displayName || t('users.unknown');
        return (
          <Card key={user?.id} className="group flex flex-col overflow-hidden border-white/60 bg-white/70 text-center">
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative">
                {renderAvatar(user)}
                <span
                  className={[
                    'absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white',
                    isDeactivated ? 'bg-gray-400' : 'bg-success'
                  ].join(' ')}
                />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-foreground">{fullName}</p>
                <p className="text-xs font-medium text-muted-foreground">{user?.email}</p>
              </div>
              <Badge variant={isDeactivated ? 'neutral' : 'success'}>
                {isDeactivated ? t('users.deactivated') : t('users.active')}
              </Badge>
              <div className="w-full space-y-2 rounded-2xl border border-white/60 bg-white/80 p-4 text-sm text-left shadow-inner">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t('users.role')}</span>
                  <span className="font-medium text-foreground">{formatRole(user?.role)}</span>
                </div>
                {user?.project?.name ? (
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('users.project')}</span>
                    <span className="font-medium text-foreground">{user.project.name}</span>
                  </div>
                ) : null}
                {user?.provisionedAt ? (
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('users.memberSince')}</span>
                    <span className="font-medium text-foreground">{formatProvisionedAt(user.provisionedAt)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between text-muted-foreground">
                  <span>{t('users.lastSeen')}</span>
                  <span className="font-medium text-foreground">{formatSeenAt(user?.seenAt)}</span>
                </div>
              </div>
              {canEditUser(user) ? (
                <Button variant="outline" className="w-full" onClick={() => navigate(toUserEdit({ userId: user.id }))}>
                  {t('buttons.edit')}
                </Button>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderTable = () => (
    <div className="rounded-2xl border border-white/60 bg-white/70 p-0 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">{t('users.columns.user')}</TableHead>
            <TableHead>{t('users.role')}</TableHead>
            <TableHead>{t('users.project')}</TableHead>
            <TableHead>{t('users.status')}</TableHead>
            <TableHead>{t('users.lastSeen')}</TableHead>
            <TableHead className="text-right pr-6">{t('users.columns.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => {
            const isDeactivated = user?.isActive === false;
            return (
              <TableRow key={user?.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user?.displayName ?? ''}
                        className="h-10 w-10 rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {(user?.displayName || '?').slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{user?.displayName || t('users.unknown')}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatRole(user?.role)}</TableCell>
                <TableCell>{user?.project?.name || '—'}</TableCell>
                <TableCell>
                  <Badge variant={isDeactivated ? 'neutral' : 'success'}>
                    {isDeactivated ? t('users.deactivated') : t('users.active')}
                  </Badge>
                </TableCell>
                <TableCell>{formatSeenAt(user?.seenAt)}</TableCell>
                <TableCell className="pr-6 text-right">
                  {canEditUser(user) ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(toUserEdit({ userId: user.id }))}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );

  const toolbar = (
    <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          search
        </span>
        <TextField
          value={search}
          onChange={event => setSearch(event.target.value || null)}
          placeholder={t('users.searchPlaceholder')}
          className="w-full pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <select
          className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          value={roleFilter}
          onChange={event => {
            const value = event.target.value as UserRoleType | 'ALL';
            setRoleFilter(value === 'ALL' ? null : value);
          }}
        >
          <option value="ALL">{t('users.filters.all')}</option>
          <option value={UserRoleType.User}>{formatRole(UserRoleType.User)}</option>
          <option value={UserRoleType.LocationAdmin}>{formatRole(UserRoleType.LocationAdmin)}</option>
          <option value={UserRoleType.OrgAdmin}>{formatRole(UserRoleType.OrgAdmin)}</option>
          <option value={UserRoleType.OrgOwner}>{formatRole(UserRoleType.OrgOwner)}</option>
          <option value={UserRoleType.God}>{formatRole(UserRoleType.God)}</option>
        </select>
        <select
          className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          value={projectFilter}
          onChange={event => {
            const value = event.target.value;
            setProjectFilter(value === 'ALL' ? null : value);
          }}
        >
          <option value="ALL">{t('users.filters.all')}</option>
          {(projectsData?.projects ?? []).map(project => (
            <option key={project?.id} value={project?.id ?? ''}>
              {project?.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          value={isActiveFilter}
          onChange={event => {
            const value = event.target.value as 'ALL' | 'ACTIVE' | 'DEACTIVATED';
            setIsActiveFilter(value === 'ALL' ? null : value);
          }}
        >
          <option value="ALL">{t('users.filters.all')}</option>
          <option value="ACTIVE">{t('users.filters.active')}</option>
          <option value="DEACTIVATED">{t('users.filters.deactivated')}</option>
        </select>
      </div>
    </div>
  );

  const actions = (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-full border border-white/60 bg-white/70 p-1 shadow-sm">
        <button type="button" className={iconButtonClass(viewMode === 'grid')} onClick={() => setViewMode('grid')}>
          <span className="material-symbols-outlined text-base">grid_view</span>
        </button>
        <button type="button" className={iconButtonClass(viewMode === 'list')} onClick={() => setViewMode('list')}>
          <span className="material-symbols-outlined text-base">table_rows</span>
        </button>
      </div>
      {isAnyAdmin() ? (
        <Button onClick={() => navigate(toUserCreate())} className="shadow-lg shadow-primary/25">
          <span className="material-symbols-outlined mr-2 text-lg">add</span>
          {t('buttons.create')}
        </Button>
      ) : null}
    </div>
  );

  return (
    <>
      <PageHeader title={t('sidebar.users')} toolbar={toolbar} actions={actions} />
      <>
        {loading ? (
          <Spinner />
        ) : users.length ? (
          viewMode === 'grid' ? (
            renderGrid()
          ) : (
            renderTable()
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white/70 p-8 text-center text-sm text-muted-foreground">
            {t('users.noUsersFound')}
          </div>
        )}
      </>
      <Outlet />
    </>
  );
}
