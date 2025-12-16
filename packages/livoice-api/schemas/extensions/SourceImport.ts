import { graphql as g } from '@keystone-6/core';
import type { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { isAuthenticated } from '../../domains/auth/userRole';
import { enqueueSourceImport } from '../../jobs/queues';

export const SourceImportExtension = (base: BaseSchemaMeta) => ({
  mutation: {
    triggerSourceImport: g.field({
      type: g.nonNull(base.object('Source')),
      args: { sourceId: g.arg({ type: g.nonNull(g.ID) }) },
      async resolve(_root, { sourceId }, context) {
        const session = context.session;
        if (!isAuthenticated({ session })) throw new Error('Unauthorized');

        const sudo = context.sudo();
        const source = await sudo.db.Source.findOne({
          where: { id: sourceId }
        });

        if (!source) throw new Error('Source not found');
        if (source.orgId && session?.orgId && source.orgId !== session.orgId) throw new Error('Forbidden');

        await sudo.db.Source.updateOne({
          where: { id: sourceId },
          data: {
            importStatus: 'importing',
            importStartedAt: new Date()
          }
        });

        await enqueueSourceImport(sourceId as string);

        return sudo.db.Source.findOne({ where: { id: sourceId } });
      }
    })
  }
});




