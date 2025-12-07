import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import { openapiDocument } from './openapi/openapi';
import chatRouter from './routes/chat';
import transcriptsRouter from './routes/transcripts';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', transcriptsRouter);
app.use('/api', chatRouter);
app.get('/api/openapi.json', (req, res) => res.json(openapiDocument));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

app.listen(env.PORT, () => {
  console.log(`Livoice API running on http://localhost:${env.PORT}`);
});

export default app;
