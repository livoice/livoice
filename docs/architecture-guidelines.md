# Livoice architecture & coding conventions

## Overview

- Keep this guide as the source of truth for the seed code that already exists in `packages/livoice-web` and `packages/livoice-api`.
- Treat the existing folder layout, modal-driven upsert flows, and Keystone list + hook patterns as the blueprint for every new feature.
- Never touch the `example1` tree; nothing there is in scope.

## Frontend (React, Apollo, GraphQL)

### Folder structure

- Domain pages live inside `packages/livoice-web/src/containers`, with nested `containers` folders for drawer/upsert screens (e.g., `Users/containers/UserUpsert.tsx` and `Locations/containers/LocationUpsert.tsx`).
- Shared UI lives under `src/components` (drawers, dialogs, forms, loaders, avatars, etc.), the design-system primitives in `src/ui`, routing helpers and nav metadata in `src/routes`, reusable hooks in `src/hooks`, and supporting utilities/services in `src/services`, `src/lib`, and `src/utils`.
- GraphQL documents belong in `src/gql/*.graphql` and rely on the generated `src/gql/generated.ts`; never edit generated outputs by hand.

### List pages pattern

- List screens fetch data via generated Apollo hooks (`useGetAllUsersQuery`, `useLocationsQuery`, etc.), narrow results with `useMemo`, and define type-safe helpers such as `type UserListItem = NonNullable<...>`.
- Page headers receive `toolbar` and `actions` props for search inputs, filter selects, and action buttons.
- Use role-aware helpers from `src/hooks/auth` (like `useAuth`/`canEditUserByRole`) to control buttons, filter options, and navigation.
- Render cards or tables with components from `src/ui` (`PageHeader`, `Card`, `Badge`, `Table`, `Input`, etc.) and include in-file `Spinner` helpers for loading states.
- Always place an `<Outlet />` at the bottom of list screens so nested modal routes can render their drawers.
- Navigate with helpers from `src/services/linker` (`toUserCreate`, `toLocationEdit`, etc.) rather than hardcoding route strings.
- Prefer link-based navigation (`<a>`/`Link`) when possible instead of attaching navigation to buttons.
- Favor concise inline conditionals (`if (condition) return value;`) and optional chaining everywhere appropriate.

### Modal upsert screens (FormDrawer pattern)

- Upsert screens mount under nested routes, read params via `useParams`, and compute `isEditMode = Boolean(id)`.
- Wrap the form in the `FormDrawer` component so modals slide in from the right with sticky headers/footers.
- The form inside the drawer must be a real `<form>` element with `onSubmit={handleSubmit(onSubmit)}` wired to React Hook Form.
- Use `react-hook-form` + `zod` via `zodResolver`, with validation schema memoized (`useMemo`) and dependent on `isEditMode`/translations.
- Control form fields with `Controller` or `ControlledField` from `components/forms`, always passing `useId` ids so labels and controls stay linked.
- Keep `onClose` functions routing back to the list (`toUsers()`, `toLocations()`) and resetting state.
- Use a shared `onCompleted` callback for both create and update mutations to refetch queries (via `apolloClient.refetchQueries`) and then close the drawer.
- Prefer the single-handler mutation pattern: `const mutation = isEditMode ? update : create; mutation({ variables: { id, data } })`; it is acceptable to pass `id` even on create since the backend ignores it.
- Show destructive actions (`deactivate`, `delete`) inside the drawer footer using `ConfirmDialog` or destructive variant `<Button>`s with tooltips when needed.
- Special cases (e.g., activating a deactivated user) should render a dedicated confirmation drawer instead of the main form.

### UI and state conventions

- Use function components with `export default function ComponentName() { ... }`.
- Define small helper components/consts locally within the file (e.g., inline `Spinner` or `FormField`).
- Prefer `useMemo`/`useCallback` for derived values (filtered lists, role options, permission checks).
- Store static option lists (roles, timezones, weekdays) at module scope; derive user-dependent variations via memoized callbacks.
- Avoid unnecessary `await` when returning async calls directly.
- Use Tailwind utility classes consistently (`rounded-2xl`, `border-white/60`, `bg-white/70`, etc.).
- Keep behavior declarative: strip unnecessary state wiring, and let hooks compute derived values.

## Backend (Keystone lists, access, hooks)

### Keystone structure

- Define each list under `packages/livoice-api/schemas/*.ts`, exporting `default list({...}) satisfies Lists['Name'];` and wired into `keystone.ts`.
- Keystone config (`keystone.ts`) imports `lists`, configures DB/session/UI, wires `extendGraphqlSchema`, enables CORS, and attaches custom express routes (`extendExpressApp`).
- Never edit `schema.prisma` or `schema.graphql` manually—Keystone regenerates them from the list definitions automatically.
- If you ever need custom GraphQL extensions, they must be explicitly approved before touching `schemas/graphqlExtensions.ts`; the builder-style extension hook already exists but currently remains empty.

### Access control patterns

- Lean on the helpers exported from `domains/auth/userRole` (`isAuthenticated`, `isAnyAdmin`, `isOrgAdmin`, `isLocationAdmin`, `isOrgAdminOrAbove`, `isGod`, `canEditUserByRole`, `filterByUserOrg`, `filterByUserLocation`, `isSelf`, etc.).
- Gate list operations (`query`, `create`, `update`, `delete`) via `access.operation`.
- Use `access.item.update` and `access.item.delete` for per-item permission checks that load the full context via `context.sudo()` and compare org/location/role relationships.
- Restrict queries with `access.filter.query` to ensure admins only see their org/location and regular users only see themselves.

### Hooks and validation

- Use `hooks.resolveInput` for normalization: lowercase emails, ensure `providerAccountId` defaults, attach `org` from the session when creating a location, etc.
- `hooks.validateInput` should enforce multi-field and cross-entity rules (role hierarchies, provisioned org+location, matching location-org, prohibiting self role/isActive edits, etc.).
- Helper functions to resolve relationship IDs from `{ connect, set, disconnect }` payloads should stay next to the schema logic.
- Use `addValidationError` with clear human-friendly messages for violations.
- Use `hooks.validateDelete` when a delete depends on counts (`location` cannot be removed with users or if it is the last location for the org).

## GraphQL and codegen

- Keep GraphQL documents inside `packages/livoice-web/src/gql` and rely on the existing codegen pipeline (`codegen.yml`) to refresh `generated.ts`.
- Never edit generated files manually—update the `.graphql` documents or the backend schema and rerun `npm run codegen` instead.
- Backend schema changes must go through Keystone lists. Only use `extendGraphqlSchema`/`graphqlExtensions.ts` after special approval.

## Scope and future work

- `example1/` is out of scope: do not read, depend on, or modify those files.
- New features should:
  1. Extend Keystone lists/hooks in `packages/livoice-api/schemas`.
  2. Expose data via GraphQL docs and regenerate `packages/livoice-web/src/gql/generated.ts` (run codegen instead of editing generated files).
  3. Implement frontend list pages and modal upsert flows (use `FormDrawer`, `react-hook-form`, `zod`, `ConfirmDialog`) following this guide.
