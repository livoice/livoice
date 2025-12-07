import { useEffect, useMemo, useRef, useState } from 'react';
import type { CloudinaryImage_File } from '@/gql/generated';

interface UseAvatarProps {
  avatar: CloudinaryImage_File | null;
}
export default function useAvatar({ avatar }: UseAvatarProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<File | null>(null);

  const avatarUrl = useMemo(() => {
    if (avatarPreview) {
      return URL.createObjectURL(avatarPreview);
    }
    return avatar?.publicUrl || null;
  }, [avatarPreview, avatar]);

  useEffect(
    () => () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    },
    [avatarUrl]
  );

  useEffect(() => {
    if (avatarInputRef.current) {
      avatarInputRef.current.addEventListener('change', e => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          setAvatarPreview(file);
        }
      });
    }
  }, [avatarInputRef]);

  const handleOpenAvatarFilePicker = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleOnClear = () => {
    setAvatarPreview(null);
    if (avatarUrl) {
      URL.revokeObjectURL(avatarUrl);
    }
  };

  return {
    avatarInputRef,
    avatarUrl,
    handleOpenAvatarFilePicker,
    onClear: handleOnClear
  };
}
