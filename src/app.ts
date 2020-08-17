import express, { Application, Request, Response } from 'express';
import middleware from './middlewares';
import routes from './routes';

const app: Application = express();

// Use Middleware
middleware(app);

// Use routes
routes(app);

/**
 * Health Check
 * @route GET /health
 * @group Base - API of base routes
 * @returns {string} 200 - healthy
 */
app.get('/health', (req: Request, res: Response) => {
  return res.status(200).send('healthy');
});

export default app;
