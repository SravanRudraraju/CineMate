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

