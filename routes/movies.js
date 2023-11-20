import { Router } from 'express';
import { MovieModel } from '../models/mysql/movie.js';
import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();
  const movieController = new MovieController({ movieModel: MovieModel });

  /**
   * @swagger
   * /movies:
   *   get:
   *     summary: Get all movies
   *     description: Retrieve a list of all movies
   *     responses:
   *       '200':
   *         description: A list of movies
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Movie'
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Movie:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: Unique identifier for the movie
   *         title:
   *           type: string
   *           description: Movie title
   *         year:
   *           type: integer
   *           description: Release year of the movie
   *         director:
   *           type: string
   *           description: Director of the movie
   *         duration:
   *           type: integer
   *           description: Duration of the movie in minutes
   *         poster:
   *           type: string
   *           description: URL of the movie poster image
   *         rate:
   *           type: string
   *           description: Movie rating
   *       example:
   *         - id: 1
   *           title: Interstellar
   *           year: 2014
   *           director: Christopher Nolan
   *           duration: 169
   *           poster: https://example.com/interstellar.jpg
   *           rate: 8.8
   *         - id: 2
   *           title: The Matrix
   *           year: 1999
   *           director: Lana Wachowski
   *           duration: 136
   *           poster: https://example.com/matrix.jpg
   *           rate: 8.7
   *         - id: 3
   *           title: Pulp Fiction
   *           year: 1994
   *           director: Quentin Tarantino
   *           duration: 154
   *           poster: https://example.com/pulp-fiction.jpg
   *           rate: 8.9
   */

  moviesRouter.get('/', movieController.getAll);

  /**
   * @swagger
   * /movies:
   *   post:
   *     summary: Create a new movie
   *     description: Create a new movie entry
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/MovieInput'
   *     responses:
   *       '201':
   *         description: Created successfully
   *       '400':
   *         description: Bad request
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     MovieInput:
   *       type: object
   *       properties:
   *         title:
   *           type: string
   *           description: Title of the movie
   *           example: Interstellar
   *         year:
   *           type: integer
   *           description: Release year of the movie
   *           example: 2014
   *         director:
   *           type: string
   *           description: Director of the movie
   *           example: Christopher Nolan
   *         duration:
   *           type: integer
   *           description: Duration of the movie in minutes
   *           example: 169
   *         poster:
   *           type: string
   *           description: URL of the movie poster image
   *           example: https://example.com/interstellar.jpg
   *         rate:
   *           type: string
   *           description: Movie rating
   *           example: 8.8
   *       required:
   *         - title
   *         - year
   *         - director
   *         - duration
   *         - poster
   *         - rate
   */

  moviesRouter.post('/', movieController.create);

  /**
   * @swagger
   * /movies/{id}:
   *   get:
   *     summary: Get a movie by ID
   *     description: Retrieve a movie by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the movie to retrieve
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       '200':
   *         description: Successfully retrieved the movie
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Movie'
   *       '404':
   *         description: Movie not found
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Movie:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: Unique identifier for the movie
   *         title:
   *           type: string
   *           description: Movie title
   *         year:
   *           type: integer
   *           description: Release year of the movie
   *         director:
   *           type: string
   *           description: Director of the movie
   *         duration:
   *           type: integer
   *           description: Duration of the movie in minutes
   *         poster:
   *           type: string
   *           description: URL of the movie poster image
   *         rate:
   *           type: string
   *           description: Movie rating
   *       example:
   *         id: 1
   *         title: Interstellar
   *         year: 2014
   *         director: Christopher Nolan
   *         duration: 169
   *         poster: https://example.com/interstellar.jpg
   *         rate: 8.8
   */

  moviesRouter.get('/:id', movieController.getById);

  /**
   * @swagger
   * /movies/{id}:
   *   delete:
   *     summary: Delete a movie by ID
   *     description: Delete a movie by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the movie to delete
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       '204':
   *         description: Movie deleted successfully
   *       '404':
   *         description: Movie not found
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     Movie:
   *       type: object
   *       properties:
   *         id:
   *           type: integer
   *           description: Unique identifier for the movie
   *         title:
   *           type: string
   *           description: Movie title
   *         year:
   *           type: integer
   *           description: Release year of the movie
   *         director:
   *           type: string
   *           description: Director of the movie
   *         duration:
   *           type: integer
   *           description: Duration of the movie in minutes
   *         poster:
   *           type: string
   *           description: URL of the movie poster image
   *         rate:
   *           type: string
   *           description: Movie rating
   *       example:
   *         id: 1
   *         title: Interstellar
   *         year: 2014
   *         director: Christopher Nolan
   *         duration: 169
   *         poster: https://example.com/interstellar.jpg
   *         rate: 8.8
   */

  moviesRouter.delete('/:id', movieController.delete);

  /**
   * @swagger
   * /movies/{id}:
   *   patch:
   *     summary: Update a movie by ID
   *     description: Update a movie by its ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the movie to update
   *         schema:
   *           type: integer
   *           example: 1
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/MovieUpdate'
   *     responses:
   *       '200':
   *         description: Movie updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Movie'
   *       '404':
   *         description: Movie not found
   */

  /**
   * @swagger
   * components:
   *   schemas:
   *     MovieUpdate:
   *       type: object
   *       properties:
   *         title:
   *           type: string
   *           description: Updated title of the movie
   *           example: New Title
   *         year:
   *           type: integer
   *           description: Updated release year of the movie
   *           example: 2022
   *         director:
   *           type: string
   *           description: Updated director of the movie
   *           example: New Director
   *         duration:
   *           type: integer
   *           description: Updated duration of the movie in minutes
   *           example: 120
   *         poster:
   *           type: string
   *           description: Updated URL of the movie poster image
   *           example: https://example.com/new-poster.jpg
   *         rate:
   *           type: string
   *           description: Updated movie rating
   *           example: 9.0
   */
  moviesRouter.patch('/:id', movieController.update);
  return moviesRouter;
};
