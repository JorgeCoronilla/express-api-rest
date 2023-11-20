import mysql from 'mysql2/promise';

const defaultConfig = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '%Meraclis59$',
  database: 'moviesdb',
};

const connectionString =
  process.env.DATABASE_URL ??
  'mysql://vooqz1ntb2bw5rmmioea:pscale_pw_DP92NLJwXtwpfLhuC1OYQM3HJHpvlK739jfLjCbF0gE@aws.connect.psdb.cloud/moviesdb?ssl={"rejectUnauthorized":true}';
const connection = await mysql.createConnection(connectionString);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      );

      if (genres.length === 0) return [];

      const [{ id }] = genres;
      //FALTA LA QUERY
      const [movies] = await connection.query('SELECT * FROM movie_genres;');
      return [];
    }
    const [movies] = await connection.query('SELECT * FROM movie;');
    console.log(movies);
    return movies;
  }
  static async getById({ id }) {
    const [movie] = await connection.query(
      'SELECT * FROM movie WHERE id = ?;',
      [id]
    );
    if (movie.length === 0) return null;
    return movie[0];
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;
    try {
      const [movies] = await connection.query(
        'INSERT INTO movie (title, year, director, duration, poster, rate) VALUES ( ?, ?, ?, ?, ?, 8.8);',
        [title, year, director, duration, poster, rate]
      );
    } catch (e) {
      throw new Error('Error creating movie');
      //Send to log service sendLog(e)
    }
    console.log(movies);
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
