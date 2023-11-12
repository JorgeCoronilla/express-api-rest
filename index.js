// import express from "express";
const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const cors = require('cors');

const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://127.0.0.1:5500',
        'http://localhost:5500',
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

// const ACCEPTED_ORIGINS = ['http://127.0.0.1:5500', 'http://localhost:5500'];

app.get('/', (req, res) => {
  res.json({ message: 'hola' });
});

app.get('/movies', (req, res) => {
  // const origin = req.header('origin');

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      //   movie.genre.includes(genre)
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: 'Movie not found' });
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  // const { title, year, director, duration, poster, genre, rate } = req.body;

  // const newMovie = {
  //   id: crypto.randomUUID(),
  //   title,
  //   year,
  //   director,
  //   duration,
  //   poster,
  //   genre,
  //   rate: rate ?? 0,
  // };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
  // const origin = req.header('origin');

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin);
  // }
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex < 0)
    return res.status(404).json({ message: 'Movie not found' });
  movies.splice(movieIndex, 1);
  return res.json({ message: 'movie deleted' });
});
app.options('/movies/:id', (req, res) => {
  // const origin = req.header('origin');

  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header('Access-Control-Allow-Origin', origin);
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  // }
  res.send(200);
});

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);
  if (!result.success) {
    res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex < 0)
    return res.status(404).json({ message: 'Movie not found' });
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updateMovie;
  return res.json(updateMovie);
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
