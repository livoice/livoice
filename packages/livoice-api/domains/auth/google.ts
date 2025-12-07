import { GoogleProfile } from 'next-auth/providers/google';

export const getInformationFromProfile = ({ profile }: { profile: GoogleProfile }) => ({
  email: profile.email,
  firstName: profile.given_name,
  lastName: profile.family_name,
  pictureUrl: profile.picture
});
