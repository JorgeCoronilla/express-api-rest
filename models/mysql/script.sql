SHOW DATABASES;
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;
USE moviesdb;

CREATE TABLE movie (
     id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

DELIMITER //
CREATE TRIGGER before_insert_movie
BEFORE INSERT ON movie
FOR EACH ROW
SET NEW.id = IFNULL(NEW.id, UNHEX(REPLACE(UUID(), '-', '')));
//
DELIMITER ;

CREATE TABLE genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

CREATE TABLE movie_genres (
    movie_id INT REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUES 
    ('Drama'),
    ('Action'),
    ('Crime'),
    ('Adventure'),
    ('Sci-Fi'),
    ('Romance'),
    ('Fantasy');

INSERT INTO movie (title, year, director, duration, poster, rate) VALUES
    ( "Interstellar", 1994, "Christopher Nolan", 169, "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg", 8.8),
    ( "The Matrix", 1999, "Lana Wachowski", 136, "https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg", 8.7),
    ( "Pulp Fiction", 1994, "Quentin Tarantino", 154, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 8.9);

INSERT INTO movie_genres (movie_id, genre_id)
VALUES
    ((SELECT id FROM movie WHERE title = "Interstellar"), (SELECT id FROM genre WHERE name = "Drama")),
    ((SELECT id FROM movie WHERE title = "Interstellar"), (SELECT id FROM genre WHERE name = "Adventure")),
    ((SELECT id FROM movie WHERE title = "Interstellar"), (SELECT id FROM genre WHERE name = "Sci-Fi")),
    ((SELECT id FROM movie WHERE title = "The Matrix"), (SELECT id FROM genre WHERE name = "Action")),
    ((SELECT id FROM movie WHERE title = "The Matrix"), (SELECT id FROM genre WHERE name = "Sci-Fi")),
    ((SELECT id FROM movie WHERE title = "Pulp Fiction"), (SELECT id FROM genre WHERE name = "Drama")),
    ((SELECT id FROM movie WHERE title = "Pulp Fiction"), (SELECT id FROM genre WHERE name = "Crime"));

SELECT * FROM movie;

