import env from '../../config/env';
import Google from 'next-auth/providers/google';

const providers = [
  Google({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET
  })
];

export default providers;
