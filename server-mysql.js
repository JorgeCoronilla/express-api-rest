import { MovieModel } from './models/mysql/movie.js';
import { createApp } from './index.js';

createApp({ movieModel: MovieModel });
