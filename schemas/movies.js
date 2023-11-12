const z = require('zod');

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required',
  }),
  year: z.number().int().min(1900),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z.string().url(),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Horror',
      'Romance',
      'Thriller',
      'Sci-Fi',
    ]),
    {
      invalid_type_error: 'Movie genre must be a string',
      required_error: 'Movie genre is required',
    }
  ),
});

const validateMovie = (object) => {
  return movieSchema.safeParse(object);
};

const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object);
};

module.exports = { validateMovie, validatePartialMovie };
