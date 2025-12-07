import type { User } from '@/gql/generated';
import type { ExtendedSession } from '@/providers/auth/authContext';

interface AvatarProps {
  user?: Pick<User | ExtendedSession, 'displayName' | 'avatarUrl'> | null | undefined;
  src?: string | null;
  alt?: string | null;
  name?: string | null;
  size?: number;
}

export default function Avatar({
  user = undefined,
  src = undefined,
  alt = undefined,
  name = undefined,
  size = 64
}: AvatarProps) {
  const avatarUrl = src || user?.avatarUrl || undefined;
  const displayName = name || user?.displayName || '';
  const initials = (displayName || alt || 'U')
    .split(' ')
    .map(part => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (avatarUrl)
    return (
      <img
        src={avatarUrl}
        alt={alt || displayName}
        style={{ width: size, height: size }}
        className="rounded-full object-cover shadow-sm"
      />
    );

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary shadow-inner"
    >
      {initials}
    </div>
  );
}
