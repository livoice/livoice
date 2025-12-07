import type { AdminConfig } from '@keystone-6/core/types';
import { CustomNavigation } from './components/CustomNavigation';

const PTOLogo = () => <h2 style={{ fontWeight: 'bold', color: 'black' }}>PTO Admin</h2>;

export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation,
  Logo: PTOLogo
};
