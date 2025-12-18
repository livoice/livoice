import type { Context } from '.keystone/types';
import type { Application } from 'express';
import express from 'express';
import path from 'path';
import { registerQueueDashboard } from './admin/queues';
import example from './example';

const publicDir = path.resolve(__dirname, '..', 'public');

const extendExpressApp = async (app: Application, context: Context) => {
  app.use('/public', express.static(publicDir));

  // Health check endpoint for readiness probes
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/example', example(context));
  registerQueueDashboard(app, context);
};

export default extendExpressApp;
