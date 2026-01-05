import type { NavigationProps } from '@keystone-6/core/admin-ui/components';
import { ListNavItems, NavigationContainer, NavItem } from '@keystone-6/core/admin-ui/components';

export function CustomNavigation({ lists, authenticatedItem }: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <NavItem href="/queues">Queue Monitor</NavItem>
      <NavItem href="/reset-transcripts">Reset Transcripts</NavItem>
      <ListNavItems lists={lists} />
    </NavigationContainer>
  );
}
