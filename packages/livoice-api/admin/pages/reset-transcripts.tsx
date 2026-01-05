import { gql, useMutation, useQuery } from '@apollo/client';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { useState } from 'react';

const GET_TRANSCRIPTS_TO_RESET = gql`
  query GetTranscriptsToReset($take: Int, $skip: Int) {
    transcripts(
      where: {
        OR: [
          { importStatus: { equals: failed } }
          { importStatus: { equals: skipped } }
          { embeddingStatus: { equals: failed } }
          { analysisStatus: { equals: failed } }
        ]
      }
      take: $take
      skip: $skip
      orderBy: { updatedAt: desc }
    ) {
      id
      title
      importStatus
      analysisStatus
      embeddingStatus
      importAttempts
      analysisAttempts
      embeddingAttempts
      importError
      analysisError
      embeddingError
      updatedAt
      createdAt
      source {
        id
        name
        type
      }
    }
    transcriptsCount(
      where: {
        OR: [
          { importStatus: { equals: failed } }
          { importStatus: { equals: skipped } }
          { embeddingStatus: { equals: failed } }
          { analysisStatus: { equals: failed } }
        ]
      }
    )
  }
`;

// Reset data for retrying transcripts
const RESET_TRANSCRIPT_DATA = {
  importStatus: 'pending' as const,
  importAttempts: 0,
  importError: '',
  analysisStatus: 'pending' as const,
  analysisAttempts: 0,
  analysisError: '',
  embeddingStatus: 'pending' as const,
  embeddingAttempts: 0,
  embeddingError: ''
};

const BULK_RESET_TRANSCRIPTS = gql`
  mutation BulkResetTranscripts($data: [TranscriptUpdateArgs!]!) {
    updateTranscripts(data: $data) {
      id
      importStatus
      embeddingStatus
      importAttempts
      embeddingAttempts
      importError
      embeddingError
    }
  }
`;

interface Transcript {
  id: string;
  title: string;
  importStatus: string;
  analysisStatus: string;
  embeddingStatus: string;
  importAttempts: number;
  analysisAttempts: number;
  embeddingAttempts: number;
  importError: string;
  analysisError: string;
  embeddingError: string;
  updatedAt: string;
  createdAt: string;
  source?: {
    id: string;
    name: string;
    type: string;
  } | null;
}

function BulkResetButton({ transcripts, onReset }: { transcripts: Transcript[]; onReset: () => void }) {
  const [bulkResetTranscripts, { loading }] = useMutation(BULK_RESET_TRANSCRIPTS);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleBulkReset = async () => {
    setError(null);
    setSuccess(null);

    try {
      await bulkResetTranscripts({
        variables: {
          data: transcripts.map(transcript => ({
            where: { id: transcript.id },
            data: RESET_TRANSCRIPT_DATA
          }))
        }
      });

      setSuccess(`Successfully reset ${transcripts.length} transcripts`);
      onReset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reset some transcripts';
      setError(message);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button
        onClick={handleBulkReset}
        disabled={loading}
        style={{
          padding: '8px 16px',
          backgroundColor: loading ? '#6c757d' : '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Resetting...' : `Reset All ${transcripts.length}`}
      </button>
      {error && <span style={{ color: '#dc3545', fontSize: '12px' }}>{error}</span>}
      {success && <span style={{ color: '#28a745', fontSize: '12px' }}>{success}</span>}
    </div>
  );
}

export default function ResetTranscriptsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const skip = (currentPage - 1) * pageSize;

  const { data, loading, error, refetch } = useQuery(GET_TRANSCRIPTS_TO_RESET, {
    variables: { take: pageSize, skip },
    pollInterval: 30000 // Refresh every 30 seconds
  });

  if (loading)
    return (
      <PageContainer header="Reset Transcripts">
        <div>Loading...</div>
      </PageContainer>
    );
  if (error)
    return (
      <PageContainer header="Reset Transcripts">
        <div>Error: {error.message}</div>
      </PageContainer>
    );

  const transcripts = data?.transcripts || [];
  const totalCount = data?.transcriptsCount || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <PageContainer header="Reset Transcripts">
      <div style={{ padding: '20px' }}>
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Showing {transcripts.length} of {totalCount} transcripts to reset
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <label htmlFor="pageSize" style={{ fontSize: '14px', color: '#666' }}>
                Show:
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when changing page size
                }}
                style={{
                  padding: '4px 8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
              <span style={{ fontSize: '14px', color: '#666' }}>per page</span>
            </div>
          </div>
          {transcripts.length > 0 && <BulkResetButton transcripts={transcripts} onReset={refetch} />}
        </div>

        {!transcripts.length ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>No transcripts to reset</div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e1e5e9' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'left',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Title
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Source
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Import Status
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Analysis Status
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Embedding Status
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Import Attempts
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Analysis Attempts
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Embedding Attempts
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Last Updated
                    </th>
                    <th
                      style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                        border: '1px solid #e1e5e9',
                        fontWeight: 'bold'
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transcripts.map((transcript: Transcript) => (
                    <TranscriptRow key={transcript.id} transcript={transcript} onReset={refetch} />
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: currentPage === 1 ? '#f8f9fa' : '#007bff',
                    color: currentPage === 1 ? '#6c757d' : 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Previous
                </button>

                <span style={{ padding: '6px 12px', alignSelf: 'center' }}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: currentPage === totalPages ? '#f8f9fa' : '#007bff',
                    color: currentPage === totalPages ? '#6c757d' : 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}

function TranscriptRow({ transcript, onReset }: { transcript: Transcript; onReset: () => void }) {
  const [resetTranscript, { loading }] = useMutation(BULK_RESET_TRANSCRIPTS);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReset = async () => {
    setError(null);
    setSuccess(null);
    try {
      await resetTranscript({
        variables: {
          data: [
            {
              where: { id: transcript.id },
              data: RESET_TRANSCRIPT_DATA
            }
          ]
        }
      });
      setSuccess('Reset successfully');
      onReset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reset';
      setError(message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'failed':
        return '#dc3545';
      case 'skipped':
        return '#dc3545';
      case 'completed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'processing':
      case 'fetching':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  return (
    <tr style={{ borderBottom: '1px solid #e1e5e9' }}>
      <td
        style={{
          padding: '12px 8px',
          border: '1px solid #e1e5e9',
          maxWidth: '300px',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        <a
          href={`/transcripts/${transcript.id}`}
          style={{ color: '#007bff', textDecoration: 'none' }}
          onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
        >
          {transcript.title}
        </a>
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9', fontSize: '12px' }}>
        {transcript.source ? (
          <div>
            <a
              href={`/sources/${transcript.source.id}`}
              style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
              onMouseOver={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseOut={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              {transcript.source.name}
            </a>
            <div style={{ color: '#666', fontSize: '11px' }}>{transcript.source.type}</div>
          </div>
        ) : (
          <span style={{ color: '#999' }}>—</span>
        )}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9' }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: getStatusColor(transcript.importStatus),
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {transcript.importStatus}
        </span>
        {transcript.importError && (
          <div style={{ marginTop: '4px', color: '#dc3545', fontSize: '11px' }}>{transcript.importError}</div>
        )}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9' }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: getStatusColor(transcript.analysisStatus),
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {transcript.analysisStatus}
        </span>
        {transcript.analysisError && (
          <div style={{ marginTop: '4px', color: '#dc3545', fontSize: '11px' }}>{transcript.analysisError}</div>
        )}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9' }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '12px',
            backgroundColor: getStatusColor(transcript.embeddingStatus),
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {transcript.embeddingStatus}
        </span>
        {transcript.embeddingError && (
          <div style={{ marginTop: '4px', color: '#dc3545', fontSize: '11px' }}>{transcript.embeddingError}</div>
        )}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9' }}>
        {transcript.importAttempts}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9' }}>
        {transcript.analysisAttempts}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9' }}>
        {transcript.embeddingAttempts}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9', fontSize: '12px' }}>
        {new Date(transcript.updatedAt).toLocaleDateString()}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'center', border: '1px solid #e1e5e9' }}>
        <button
          onClick={handleReset}
          disabled={loading}
          style={{
            padding: '6px 12px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '12px'
          }}
        >
          {loading ? 'Resetting...' : 'Reset'}
        </button>
        {error && <div style={{ color: '#dc3545', fontSize: '11px', marginTop: '4px' }}>{error}</div>}
        {success && <div style={{ color: '#28a745', fontSize: '11px', marginTop: '4px' }}>{success}</div>}
      </td>
    </tr>
  );
}
