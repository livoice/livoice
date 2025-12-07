import StandalonePageLayout from '@/layouts/StandalonePageLayout/StandalonePageLayout';
import { Spinner } from '@/ui';

export default function Loading() {
  return (
    <StandalonePageLayout className="items-center justify-center">
      <Spinner size={2} />
    </StandalonePageLayout>
  );
}
