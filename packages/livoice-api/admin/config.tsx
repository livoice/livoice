import type { AdminConfig } from '@keystone-6/core/types';
import { CustomNavigation } from './components/CustomNavigation';

const Logo = () => <h2 style={{ fontWeight: 'bold', color: 'black' }}>Livoice Admin</h2>;

export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation,
  Logo
};
