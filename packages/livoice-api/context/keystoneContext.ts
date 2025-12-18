import { Context } from '.keystone/types';
import { getContext } from '@keystone-6/core/context';

let _keystoneContext: Context = (globalThis as any)._keystoneContext;
export const getKeystoneContext = async () => {
  _keystoneContext =
    _keystoneContext || getContext((await import('../keystone')).default, await import('@prisma/client'));
  if (process.env.NODE_ENV !== 'production') {
    (globalThis as any)._keystoneContext = _keystoneContext;
  }
  return _keystoneContext;
};
