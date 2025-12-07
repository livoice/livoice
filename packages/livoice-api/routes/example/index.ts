import type { Context } from '.keystone/types';
import express from 'express';

export default (context: Context) => {
  const router = express.Router({ mergeParams: true, caseSensitive: false });

  router.get('/', async (req, res) => {

    return res.redirect(301, "https://google.com");
  });

  return router;
};
