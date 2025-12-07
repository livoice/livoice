import { pick } from 'lodash';
import { DefaultUser, Profile } from 'next-auth';
import { Provider } from 'next-auth/providers';
import { GoogleProfile } from 'next-auth/providers/google';
import { Session } from '../../auth';
import { getInformationFromProfile } from '../../domains/auth/google';

const extractUserData = (provider: Provider['id'], { user, profile }: { user?: DefaultUser; profile?: Profile }) => {
  const handler = {
    google: () => getInformationFromProfile({ profile: profile as GoogleProfile }),
    credentials: () => pick(user, ['email', 'firstName', 'lastName'])
  }[provider];

  if (!handler) throw new Error(`Unknown provider: ${provider}`);

  const userData = handler();
  return { ...userData } as Session;
};

export default extractUserData;
