import { Provider } from 'next-auth/providers';

export const detectIsAdmin = (provider: Provider['id'], email?: string | null) =>
  provider === 'google' && /@(webiya\.co\.il|webiya\.com)$/.test(email || '');
