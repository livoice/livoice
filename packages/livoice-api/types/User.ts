import { UserRole } from '../domains/auth/userRole';

interface DefaultUser {
  id: string;
  email: string;
  name: string;
  image: string;
}

interface Account {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token?: string;
  expires_at?: number;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

interface Profile {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  // OAuth provider-specific fields can be added here
  // For example, GitHub-specific fields:
  login?: string;
  avatar_url?: string;
  // Other provider fields...
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  providerAccountId: string;
  rawAuth: { user: DefaultUser; account: Account; profile: Profile };
  role: UserRole;
}
