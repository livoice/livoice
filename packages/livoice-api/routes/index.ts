import type { Context } from '.keystone/types';
import type { Application } from 'express';
import express from 'express';
import path from 'path';
// import ratehawk from './ratehawk';
import { registerQueueDashboard } from './admin/queues';
import example from './example';

const publicDir = path.resolve(__dirname, '..', 'public');

const extendExpressApp = async (app: Application, context: Context) => {
  app.use('/public', express.static(publicDir));

  app.use('/example', example(context));
  registerQueueDashboard(app, context);
};

export default extendExpressApp;
