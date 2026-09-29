CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image TEXT
)

CREATE TABLE watchlist(
    user_id INTEGER NOT NULL,
    tmdb_movie_id INTEGER NOT NULL,

    PRIMARY KEY (user_id , tmdb_movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE liked_movies(
    user_id INTEGER NOT NULL,
    tmdb_movie_id INTEGER NOT NULL,

    PRIMARY KEY (user_id , tmdb_movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE watched_movies(
    user_id INTEGER NOT NULL,
    tmdb_movie_id INTEGER NOT NULL,

    PRIMARY KEY (user_id , tmdb_movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE ratings (
	user_id INTEGER NOT NULL,
	tmdb_movie_id INTEGER NOT NULL,
	rating NUMERIC(2,1) NOT NULL CHECK(rating>=0.5 AND rating <=5.0),
	PRIMARY KEY (user_id , tmdb_movie_id),
	FOREIGN KEY (user_id)
	REFERENCES users(id)
	ON DELETE CASCADE
)

CREATE TABLE diary_entries (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	tmdb_movie_id INTEGER NOT NULL,
	watched_on DATE NOT NULL DEFAULT CURRENT_DATE,
	review TEXT,
	rating NUMERIC(2,1),
	liked BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (user_id)
	REFERENCES users(id)
	ON DELETE CASCADE,
	CHECK (rating >=0.5 AND rating <=5.0)
)

CREATE TABLE movies (
    tmdb_movie_id INTEGER PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    poster_path TEXT,
    release_date DATE
);