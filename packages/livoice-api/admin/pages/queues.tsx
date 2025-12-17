import { PageContainer } from '@keystone-6/core/admin-ui/components';

export default function QueuesPage() {
  return (
    <PageContainer header="Queue Monitor">
      <iframe src="/api/admin/queues" style={{ width: '100%', height: '80vh', border: 'none' }} title="Queue Monitor" />
    </PageContainer>
  );
}




