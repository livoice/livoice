import type { Application } from 'express';
import type { Context } from '.keystone/types';
import express from 'express';
import path from 'path';
// import ratehawk from './ratehawk';
import example from './example';

const publicDir = path.resolve(__dirname, '..', 'public');

const extendExpressApp = async (app: Application, context: Context) => {

  app.use('/public', express.static(publicDir));


  app.use('/example', example(context));
};

export default extendExpressApp;
