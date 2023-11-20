import express, { json } from 'express';
import { swaggerDocs } from './v1/swagger.js';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { createMovieRouter } from './routes/movies.js';
import passportSetup from './middlewares/passport.js';
import authRouter from './routes/auth.js';
import { corsMiddleware } from './middlewares/cors.js';
import logger from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
export const createApp = ({ movieModel }) => {
  const app = express();

  app.disable('x-powered-by');

  app.use(json());
  app.use(corsMiddleware());
  app.use(
    cookieSession({
      name: 'session',
      keys: ['Mykey'],
      maxAge: 24 * 60 * 60 * 100,
    })
  );
  app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
      request.session.regenerate = (cb) => {
        cb();
      };
    }
    if (request.session && !request.session.save) {
      request.session.save = (cb) => {
        cb();
      };
    }
    next();
  });

  // app.use(
  //   session({
  //     secret: 'your_secret_here',
  //     resave: false,
  //     saveUninitialized: false,
  //   })
  // );
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => {
    res.json({ message: 'hola' });
  });

  app.use('/movies', createMovieRouter({ movieModel }));
  app.use('/auth', authRouter);
  app.use(logger('dev'));
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    swaggerDocs(app, PORT);
  });
};
