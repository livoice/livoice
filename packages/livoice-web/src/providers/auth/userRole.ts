export type UserRole = 'admin' | 'member' | 'guest';

export const getDefaultUserRole = (): UserRole => 'admin';
