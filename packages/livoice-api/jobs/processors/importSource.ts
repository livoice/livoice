import { Job } from 'bullmq';
import PQueue from 'p-queue';
import { getKeystoneContext } from '../../context/keystoneContext';
import { getSourceAdapter } from '../../lib/sources';
import type { SourceItem } from '../../lib/sources/types';

const MAX_IMPORT_HISTORY_ENTRIES = 100;
const IMPORT_CONCURRENCY = 1;

type ImportSourceJob = { sourceId: string };

type HistoryEntry = {
  startedAt: Date;
  completedAt: Date;
  itemsFound: number;
  itemsImported: number;
  itemsSkipped: number;
  itemsFailed: number;
  error: string | null;
};

export const processImportSource = async (job: Job<ImportSourceJob>) => {
  const context = await getKeystoneContext();
  const prisma = context.sudo().prisma;
  const startedAt = new Date();

  const source = await prisma.source.findUnique({ where: { id: job.data.sourceId } });
  if (!source) throw new Error('Source not found');

  const adapter = getSourceAdapter(source.type);
  if (!adapter) throw new Error(`No adapter found for source type: ${source.type}`);

  const appendHistoryAndUpdate = async (status: 'completed' | 'failed', entry: HistoryEntry) => {
    const history = Array.isArray(source.importHistory) ? source.importHistory : [];
    const nextHistory = [...history.slice(-(MAX_IMPORT_HISTORY_ENTRIES - 1)), entry];

    await prisma.source.update({
      where: { id: source.id },
      data: {
        importStatus: status,
        importStartedAt: startedAt,
        importCompletedAt: entry.completedAt,
        importHistory: nextHistory
      }
    });
  };

  const queue = new PQueue({ concurrency: IMPORT_CONCURRENCY });

  const processItem = async (item: SourceItem) => {
    const existing = await prisma.transcript.findFirst({
      where: { sourceId: source.id, externalId: item.externalId }
    });
    if (existing) return { imported: 0, skipped: 1, failed: 0 };

    try {
      await prisma.transcript.create({
        data: {
          title: item.title,
          sourceUrl: item.url,
          externalId: item.externalId,
          publishedAt: item.publishedAt,
          duration: item.duration ? item.duration * 1000 : undefined,
          thumbnailUrl: item.thumbnailUrl ?? '',
          source: { connect: { id: source.id } },
          org: source.orgId ? { connect: { id: source.orgId } } : undefined,
          embeddingStatus: 'pending',
          importStatus: 'pending'
        }
      });

      return { imported: 1, skipped: 0, failed: 0 };
    } catch (error) {
      console.error(`Failed to import item ${item.externalId}`, error);
      return { imported: 0, skipped: 0, failed: 1 };
    }
  };

  try {
    const items = await adapter.listItems(source.externalId);
    const itemsFound = items.length;

    const results = await Promise.all(items.map(item => queue.add(() => processItem(item), { throwOnTimeout: true })));

    const {
      imported: itemsImported,
      skipped: itemsSkipped,
      failed: itemsFailed
    } = results.reduce(
      (acc, cur) => ({
        imported: acc.imported + cur.imported,
        skipped: acc.skipped + cur.skipped,
        failed: acc.failed + cur.failed
      }),
      { imported: 0, skipped: 0, failed: 0 }
    );

    await appendHistoryAndUpdate('completed', {
      startedAt,
      completedAt: new Date(),
      itemsFound,
      itemsImported,
      itemsSkipped,
      itemsFailed,
      error: null
    });
  } catch (error: unknown) {
    await appendHistoryAndUpdate('failed', {
      startedAt,
      completedAt: new Date(),
      itemsFound: 0,
      itemsImported: 0,
      itemsSkipped: 0,
      itemsFailed: 0,
      error: error instanceof Error ? error.message : 'Import failed'
    });

    throw error;
  }
};
