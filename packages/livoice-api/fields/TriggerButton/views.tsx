import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

const TRIGGER_IMPORT = gql`
  mutation TriggerSourceImport($sourceId: ID!) {
    triggerSourceImport(sourceId: $sourceId) {
      id
      importStatus
    }
  }
`;

export const Field = ({ itemId }: { itemId?: string }) => {
  const router = useRouter();
  const routeId = router.query.id;
  const sourceId = itemId ?? (Array.isArray(routeId) ? routeId[0] : routeId) ?? '';

  const [triggerImport, { loading }] = useMutation(TRIGGER_IMPORT);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onClick = async () => {
    setError(null);
    setSuccess(null);
    if (!sourceId) {
      setError('Missing source id');
      return;
    }
    try {
      const result = await triggerImport({ variables: { sourceId } });
      setSuccess(`Import status: ${result.data.triggerSourceImport.importStatus}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to start import';
      setError(message);
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <button style={{ padding: '6px 12px' }} onClick={onClick} disabled={loading}>
        {loading ? 'Starting...' : 'Import Now'}
      </button>
      {error ? <span style={{ color: 'red', marginLeft: '6px' }}>{error}</span> : null}
      {success ? <span style={{ color: 'green', marginLeft: '6px' }}>{success}</span> : null}
    </div>
  );
};

export const CardValue = () => null;
