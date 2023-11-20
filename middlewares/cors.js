import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://127.0.0.1:5500', 'http://localhost:5173'];

export const corsMiddleware = ({ accepted_origins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (accepted_origins.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
