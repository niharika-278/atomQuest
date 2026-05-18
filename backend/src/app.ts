import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { requestLogger } from './middleware/logging';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', routes);

app.use(errorHandler);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
