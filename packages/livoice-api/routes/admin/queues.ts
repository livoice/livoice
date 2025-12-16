import { Context } from '.keystone/types';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Application, Request, Response } from 'express';
import { importSourceQueue } from '../../jobs/queues';

const canAccess = async (req: Request, res: Response, context: Context) => {
  // Use Keystone session strategy to extract session from cookies (same as admin UI)
  const session = await context.sessionStrategy?.get({ req, res, context });
  if (session?.data?.id) return true;
  // In development, fall back to allowing access to avoid local auth issues
  if ((process.env.NODE_ENV ?? 'development') === 'development') return true;
  return false;
};

export const registerQueueDashboard = (app: Application, context: Context) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/api/admin/queues');

  createBullBoard({
    queues: [new BullMQAdapter(importSourceQueue)],
    serverAdapter
  });

  app.use('/api/admin/queues', async (req: Request, res: Response, next) => {
    const allowed = await canAccess(req, res, context);
    if (!allowed) return res.status(401).send('Unauthorized');
    return next();
  });

  app.use('/api/admin/queues', serverAdapter.getRouter());
};




