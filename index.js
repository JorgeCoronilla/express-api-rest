import express, { json } from 'express';

import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.disable('x-powered-by');

app.use(json());
app.use(corsMiddleware());

app.get('/', (req, res) => {
  res.json({ message: 'hola' });
});

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
